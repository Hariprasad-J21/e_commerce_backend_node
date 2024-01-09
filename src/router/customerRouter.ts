import express from "express";
import { Request, Response } from "express";
import EcCustomers from "../models/ec_customers";
import customerRegistration from "../../src/controllers/customers/customerRegistration";
import { customerProfile } from "../../src/controllers/customers/customerRegistration";
import resetPassword from "../controllers/authenticaton/resetPassword";
import verifyToken from "../middlewares/verifyJWT";
const customerRouter = express.Router();

// customerRouter.get("/", async (req: Request, res: Response) => {
//   try {
//     const { e_mail } = req.query;
//     const data = await EcCustomers.findOne({
//       where: { e_mail: e_mail },
//       raw: true,
//     });
//     res.status(201).json({ message: `The data is ${JSON.stringify(data)}` });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ error: error.toString() });
//   }
// });

customerRouter.post("/customerRegistration", (req: Request, res: Response) => {
  customerRegistration(req, res);
});

customerRouter.get(
  "/customerProfile",
  verifyToken,
  (req: Request, res: Response) => {
    customerProfile(req, res);
  }
);

customerRouter.patch(
  "/resetPassword",
  verifyToken,
  (req: Request, res: Response) => {
    resetPassword(req, res);
  }
);

export default customerRouter;
