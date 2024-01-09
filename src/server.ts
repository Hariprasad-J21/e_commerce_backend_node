import express from "express";
import sequelize from "./config/sequelize-config";
import { Request, Response } from "express";
import EcSuppliers from "./models/ec_suppliers";
const { Op } = require("sequelize");
import supplierRouter from "./router/supplierRoutes";
import loginRouter from "./router/login";
import customerRouter from "./router/customerRouter";
import firstMiddleWare from "./middlewares/middlewares";
import { secondMiddleWare } from "./middlewares/middlewares";
//import EcSuppliersModel from "../types/ec_suppliers";

const app = express(); // express is in form of a class therefore we need to define it

const port = 3000;

sequelize.sync({ force: false });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//   const { name, age } = req.query; // extract name and age from the query

//   res.send(`${name},${age}`); // send the name and age as the response

// });

// app.post("/", async (req: Request, res: Response) => {
//   try {
//     const { full_name, e_mail, password, profile_pic } = req.body;
//     await EcSuppliers.create(
//       {
//         full_name,
//         e_mail,
//         password,
//         profile_pic: Buffer.from(profile_pic),
//       },
//       { raw: true }
//     );

//     res.status(201).json({ message: "Successfully implemented" });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ error: error.toString() });
//   }
// });

// app.get("/", async (req: Request, res: Response) => {
//   try {
//     const { e_mail } = req.query;
//     const data = await EcSuppliers.findOne({
//       where: { e_mail: e_mail },
//       raw: true,
//     });
//     res.status(201).json({ message: `The data is ${data}` });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ error: error.toString() });
//   }
// });

// app.post("/contact", (req: Request, res: Response) => {
//   const { name, phone, email } = req.body; // you can also give name='Hari' to giv default name
//   if (!name) {
//     res.status(400).json({ message: "there is no name" });
//   }

//   res.status(200).json({
//     message: `the name is ${name}, the phone is ${phone} and the mail is ${email}`,
//   });
// });

interface CustomRequest extends Request {
  customProperty?: string;
}

// app.use((req: CustomRequest, res, next) => {
//   firstMiddleWare(req, res, next);
// });

// app.use((req, res, next) => {
//   secondMiddleWare(req, res, next);
// });

app.get(
  "/example",
  firstMiddleWare,
  secondMiddleWare,
  (req: CustomRequest, res) => {
    const customProperty = req.customProperty ?? "Not Available";
    res.send(`Custom property value:${customProperty}`);
  }
);

app.use("/api/v1", supplierRouter);
app.use("/api/v2", customerRouter);

app.use(loginRouter);

app.listen(port, () => {
  console.log(`The port running is ${port}`);
});
