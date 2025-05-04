import shopify from "../shopify.js";
import { GraphqlQueryError } from "@shopify/shopify-api";

class ProductService {
  constructor(session) {
    this.session = session;
  }

  async fetchProducts(
    perPage,
    startCursor,
    endCursor,
    searchQuery,
    sortBy,
    searchType,
    status
  ) {
    try {
      console.log({
        perPage,
        endCursor,
        startCursor,
        searchQuery,
        sortBy,
        searchType,
        status,
      });
      const client = new shopify.api.clients.Graphql({ session: this.session });
      const PRODUCTS_QUERY = `
        query {
          products(
            ${
              searchQuery && status
                ? `query: "${searchType}:*${searchQuery}* AND status:${status}", `
                : !searchQuery && status
                ? `query: "status:${status}", `
                : searchQuery && !status
                ? `query: "${searchType}:*${searchQuery}*", `
                : ""
            }
            ${
              endCursor
                ? `first: ${perPage}, after: "${endCursor}", `
                : startCursor
                ? `last: ${perPage}, before: "${startCursor}", `
                : `first: ${perPage}, `
            }
            sortKey: ${sortBy}
          ) {
            nodes {
              id
              title
              description
              productType
              status
              vendor
              totalInventory
              priceRangeV2 {
                maxVariantPrice {
                  amount
                }
                minVariantPrice {
                  amount
                }
              }
              images (first: 1) {
                nodes {
                  originalSrc: url(transform: {maxWidth: 200, maxHeight: 200})
                }
              }
            }
            pageInfo {
              hasPreviousPage
              hasNextPage
              startCursor
              endCursor
            }
          }
        }
      `;
      console.log({ PRODUCTS_QUERY });
      const response = await client.query({
        data: {
          query: PRODUCTS_QUERY,
        },
      });
      console.log({ result: response.body.data.products });

      const products = response.body.data.products?.nodes || [];
      const pageInfo = response.body.data.products?.pageInfo || {};

      return { products, pageInfo };
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new Error(
          `${error.message}\n${JSON.stringify(error.response, null, 2)}`
        );
      } else {
        throw error;
      }
    }
  }

  async countProducts() {
    try {
      const response = await shopify.api.rest.Product.count({
        session: this.session,
      });
      console.log("countProducts", response);
      return response.count;
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new Error(
          `${error.message}\n${JSON.stringify(error.response, null, 2)}`
        );
      } else {
        throw error;
      }
    }
  }

  async deleteProduct(productId) {
    try {
      const client = new shopify.api.clients.Graphql({ session: this.session });
      const response = await client.query({
        data: {
          query: `
            mutation DeleteProduct($input: ProductDeleteInput!) {
              productDelete(input: $input) {
                deletedProductId
                userErrors {
                  field
                  message
                }
              }
            }
          `,
          variables: {
            input: {
              id: `gid://shopify/Product/${productId}`,
            },
          },
        },
      });
      console.dir({ response }, { depth: null });
      const errors = response.body.data.productDelete.userErrors;

      if (errors.length) {
        throw new Error(errors.map((error) => error.message).join("\n"));
      }

      return response.body.data.productDelete.deletedProductId;
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new Error(
          `${error.message}\n${JSON.stringify(error.response, null, 2)}`
        );
      } else {
        throw error;
      }
    }
  }

  async editProduct(product) {
    try {
      const client = new shopify.api.clients.Graphql({ session: this.session });
      const response = await client.query({
        data: {
          query: `
            mutation productUpdate($input: ProductInput!) {
              productUpdate(input: $input) {
                userErrors {
                  field
                  message
                }
                product {
                  id
                  title
                  description
                  productType
                  status
                  vendor
                }
              }
            }
          `,
          variables: {
            input: {
              ...product,
              id: `gid://shopify/Product/${product.id}`,
            },
          },
        },
      });

      const errors = response.body.data.productUpdate.userErrors;

      if (errors.length) {
        throw new Error(errors.map((error) => error.message).join("\n"));
      }

      return response.body.data.productUpdate.product;
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new Error(
          `${error.message}\n${JSON.stringify(error.response, null, 2)}`
        );
      } else {
        throw error;
      }
    }
  }
}

export default ProductService;
