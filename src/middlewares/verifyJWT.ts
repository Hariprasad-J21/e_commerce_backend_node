import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let secretKey = "your-secret-key";
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "token not provided" });
  }
  try {
    let processed_token = token.split("Bearer ")[1];

    // Verify the token
    const decoded = jwt.verify(processed_token, secretKey);

    console.log(decoded);
    // Attach the decoded payload to the request object
    req.body.jwt_decoded = decoded;
    console.log(req.body.jwt_decoded);
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyToken;
