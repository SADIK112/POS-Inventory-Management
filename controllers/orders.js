import OrderService from "../services/order.js";

export const getOrders = async (req, res, next) => {
  try {
    const { perPage, startCursor, endCursor, searchQuery, sortBy, searchType } =
      req.query;
    const { session } = res.locals.shopify;

    const orderService = new OrderService(session);
    const result = await orderService.fetchOrders(
      +perPage,
      startCursor,
      endCursor,
      searchQuery,
      sortBy,
      searchType
    );
    const countOrders = await orderService.countOrders();
    res.status(200).json({ ...result, countOrders });
  } catch (error) {
    next(error);
  }
};
