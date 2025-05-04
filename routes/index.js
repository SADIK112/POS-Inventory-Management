import express from "express";
import productRouter from "./product.js";
import customerRouter from "./customer.js";
import orderRouter from "./order.js";

const router = express.Router()

router.use("/products", productRouter);
router.use("/customers", customerRouter);
router.use("/orders", orderRouter);

export default router;