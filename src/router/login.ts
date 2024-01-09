import EcSuppliers from "../models/ec_suppliers";
import express from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import EcCustomers from "../models/ec_customers";
import loginController from "../controllers/authenticaton/login";

const loginRouter = express.Router();

loginRouter.post("/", async (req: Request, res: Response) => {
  loginController(req, res);
});

export default loginRouter;
