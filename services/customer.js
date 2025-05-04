import shopify from "../shopify.js";
import { GraphqlQueryError } from "@shopify/shopify-api";

class CustomerService {
  constructor(session) {
    this.session = session;
  }

  async fetchCustomers(
    perPage,
    startCursor,
    endCursor,
    searchQuery,
    sortBy,
    searchType
  ) {
    try {
      console.log({
        perPage,
        startCursor,
        endCursor,
        searchQuery,
        sortBy,
        searchType,
      });
      const client = new shopify.api.clients.Graphql({ session: this.session });
      const CUSTOMERS_QUERY = `
        query {
          customers(
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
              firstName
              lastName
              displayName
              email
              phone
              amountSpent {
                amount
                currencyCode
              }
              defaultAddress {
                address1
                address2
                city
                province
                country
                zip
              }
              emailMarketingConsent {
                marketingState
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
      console.log({ CUSTOMERS_QUERY });
      const response = await client.query({
        data: {
          query: CUSTOMERS_QUERY,
        },
      });
      console.log({ result: response.body.data.customers });

      const customers = response.body.data.customers?.nodes || [];
      const pageInfo = response.body.data.customers?.pageInfo || {};

      return { customers, pageInfo };
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

  async countCustomers() {
    try {
      const response = await shopify.api.rest.Customer.count({
        session: this.session,
      });
      console.log("countCustomers", response);
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

  async deleteCustomer(customerId) {
    try {
      const response = await shopify.api.rest.Customer.delete({
        session: this.session,
        id: customerId,
      });
      console.log("deleteCustomer", response);
      return response;
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

  async editCustomer(customer) {
    try {
      const client = new shopify.api.clients.Graphql({ session: this.session });
      const response = await client.query({
        data: {
          query: `
            mutation customerUpdate($input: CustomerInput!) {
              customerUpdate(input: $input) {
                userErrors {
                  field
                  message
                }
                customer {
                  id
                  firstName
                  lastName
                }
              }
            }
          `,
          variables: {
            input: {
              ...customer,
              id: `gid://shopify/Customer/${customer.id}`,
            },
          },
        },
      });

      const errors = response.body.data.customerUpdate.userErrors;

      if (errors.length) {
        throw new Error(errors.map((error) => error.message).join("\n"));
      }

      return response.body.data.customerUpdate.customer;
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

export default CustomerService;
