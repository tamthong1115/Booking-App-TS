import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserType } from "../../shared/types";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyTokenUser: RequestHandler = (req, res, next) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "get authorized failed" });
  }
};

export const authenticationAdmin: RequestHandler = (req, res, next) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    if ((decoded as JwtPayload).isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "forbidden" });
    }
  } catch (error) {
    return res.status(401).json({ message: "get authorized failed" });
  }
};
