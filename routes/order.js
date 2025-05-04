import express from "express";
import { getOrders } from "../controllers/orders.js";

const orderRouter = express.Router()

orderRouter.get("/lookup", getOrders)

export default orderRouter;