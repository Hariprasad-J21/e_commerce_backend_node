import { Request, Response } from "express";
import EcCustomers from "../../models/ec_customers";

const customerRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { full_name, e_mail, password, profile_pic } = req.body;
    await EcCustomers.create(
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
const customerProfile = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body.jwt_decoded;
  const found = await EcCustomers.findOne({
    where: { id: userId },
    raw: true,
  });

  console.log(found);

  res.send(found);
  //   return found;
};

export default customerRegistration;

export { customerProfile };
