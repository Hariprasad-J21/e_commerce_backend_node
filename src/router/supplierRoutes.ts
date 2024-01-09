import express from "express";
import { Request, Response } from "express";
import EcSuppliers from "../models/ec_suppliers";
const supplierRouter = express.Router();
import { supplierProfile } from "../controllers/supplierscontrollers/supplierRegistration";
import supplierRegistration from "../controllers/supplierscontrollers/supplierRegistration";
import verifyToken from "../middlewares/verifyJWT";
import resetPassword from "../controllers/authenticaton/resetPassword";

// supplierRouter.get("/", async (req: Request, res: Response) => {
//   try {
//     const { e_mail } = req.query;
//     const data = await EcSuppliers.findOne({
//       where: { e_mail: e_mail },
//       raw: true,
//     });
//     res.status(201).json({ message: `The data is ${JSON.stringify(data)}` });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ error: error.toString() });
//   }
// });

supplierRouter.post(
  "/supplierRegistration",
  async (req: Request, res: Response) => {
    supplierRegistration(req, res);
  }
);

supplierRouter.get("/supplierProfile", (req: Request, res: Response) => {
  supplierProfile(req, res);
});

supplierRouter.patch(
  "/resetPassword",
  verifyToken,
  (req: Request, res: Response) => {
    resetPassword(req, res);
  }
);

export default supplierRouter;
