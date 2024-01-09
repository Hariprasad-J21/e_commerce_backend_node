import { Request, Response } from "express";
import EcSuppliers from "../../models/ec_suppliers";

const supplierRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { full_name, e_mail, password, profile_pic } = req.body;
    await EcSuppliers.create(
      {
        full_name,
        e_mail,
        password,
        profile_pic: Buffer.from(profile_pic),
      },
      { raw: true }
    );

    res.status(201).json({ message: "Successfully implemented" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
};

const supplierProfile = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body.jwt_decoded;
  const found = await EcSuppliers.findOne({
    where: { id: userId },
    raw: true,
  });
  console.log(found);

  res.send(found);
  //   return found;
};

export default supplierRegistration;

export { supplierProfile };
