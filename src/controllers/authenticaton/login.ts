import { Request, Response } from "express";
import EcCustomers from "../../models/ec_customers";
import EcSuppliers from "../../models/ec_suppliers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { e_mail, password, client_type } = req.body;
    let data;

    if (client_type === "supplier") {
      data = await EcSuppliers.findOne({
        where: { e_mail: e_mail },
        raw: true,
      });
    } else if (client_type === "customer") {
      data = await EcCustomers.findOne({
        where: { e_mail: e_mail },
        raw: true,
      });
    }

    if (data?.password && bcrypt.compareSync(password, data.password)) {
      const token = jwt.sign(
        { userId: data?.id, client_type },
        "your-secret-key", // Replace with your secret key
        { expiresIn: "24h" } // Token expiration time
      );
      res.status(200).json(token);
    } else {
      res.status(401).json("Failed");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
};

export default loginController;
