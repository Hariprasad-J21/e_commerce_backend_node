import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  customProperty?: string;
}

const firstMiddleWare = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("hi from middleware");
  req.customProperty = "hello this is a custom property";
  next();
};

const secondMiddleWare = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
  next();
};

export default firstMiddleWare;
export { secondMiddleWare };
