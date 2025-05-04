import ProductService from "../services/product.js";

export const getProducts = async (req, res, next) => {
  try {
    const {
      perPage,
      startCursor,
      endCursor,
      searchQuery,
      sortBy,
      searchType,
      status,
    } = req.query;
    const { session } = res.locals.shopify;

    const productService = new ProductService(session);
    const result = await productService.fetchProducts(
      +perPage,
      startCursor,
      endCursor,
      searchQuery,
      sortBy,
      searchType,
      status
    );
    const countProducts = await productService.countProducts();
    res.status(200).json({ ...result, countProducts });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { session } = res.locals.shopify;

    const productService = new ProductService(session);
    await productService.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const editProduct = async (req, res, next) => {
  try {
    const { product } = req.body;
    const { session } = res.locals.shopify;

    const productService = new ProductService(session);
    const updatedProduct = await productService.editProduct(product);
    console.log({ updatedProduct });
    res
      .status(200)
      .json({
        product: updatedProduct,
        message: "Product updated successfully",
      });
  } catch (error) {
    next(error);
  }
};

