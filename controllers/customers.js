import CustomerService from "../services/customer.js";

export const getCustomers = async (req, res, next) => {
  try {
    const { perPage, startCursor, endCursor, searchQuery, sortBy, searchType } =
      req.query;
    const { session } = res.locals.shopify;

    const customerService = new CustomerService(session);
    const result = await customerService.fetchCustomers(
      +perPage,
      startCursor,
      endCursor,
      searchQuery,
      sortBy,
      searchType
    );
    const countCustomers = await customerService.countCustomers();
    res.status(200).json({ ...result, countCustomers });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { session } = res.locals.shopify;

    const customerService = new CustomerService(session);
    await customerService.deleteCustomer(id);
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const editCustomer = async (req, res, next) => {
  try {
    const { customer } = req.body;
    const { session } = res.locals.shopify;

    const customerService = new CustomerService(session);
    const updatedCustomer = await customerService.editCustomer(customer);
    console.log({ updatedCustomer });
    res
      .status(200)
      .json({
        customer: updatedCustomer,
        message: "Customer updated successfully",
      });
  } catch (error) {
    next(error);
  }
};
