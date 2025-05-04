import express from "express";
import {
  getCustomers,
  deleteCustomer,
  editCustomer,
} from "../controllers/customers.js";

const customerRouter = express.Router();

customerRouter.get("/lookup", getCustomers);
customerRouter.delete("/:id", deleteCustomer);
customerRouter.put("/update", editCustomer);

export default customerRouter;
