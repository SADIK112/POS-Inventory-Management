import express from "express";
import { getProducts, deleteProduct, editProduct } from "../controllers/products.js";

const productRouter = express.Router()

productRouter.get("/lookup", getProducts)
productRouter.delete("/:id", deleteProduct)
productRouter.put("/update", editProduct);

export default productRouter;