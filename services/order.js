import shopify from "../shopify.js";
import { GraphqlQueryError } from "@shopify/shopify-api";

class OrderService {
  constructor(session) {
    this.session = session;
  }

  async fetchOrders(
    perPage,
    startCursor,
    endCursor,
    searchQuery,
    sortBy,
    searchType
  ) {
    try {
      console.log({ perPage, startCursor, endCursor, searchQuery, sortBy, searchType });
      const client = new shopify.api.clients.Graphql({ session: this.session });
      const ORDERS_QUERY = `
        query {
          orders(
            ${
              searchQuery && searchType
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
              name
              fulfillable
              customer {
                displayName
              }
              totalPriceSet {
                presentmentMoney {
                  amount
                  currencyCode
                }
              }
              unpaid
              createdAt
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
      console.log({ ORDERS_QUERY });
      const response = await client.query({
        data: {
          query: ORDERS_QUERY,
        },
      });
      console.log({ result: response.body.data.orders });

      const orders = response.body.data.orders?.nodes || [];
      const pageInfo = response.body.data.orders?.pageInfo || {};

      return { orders, pageInfo };
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

  async countOrders() {
    try {
      const response = await shopify.api.rest.Order.count({
        session: this.session,
      });
      console.log("countOrders", response);
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
}

export default OrderService;
