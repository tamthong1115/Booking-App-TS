import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (res: Response, userId: string, isAdmin: boolean) => {
  const token = jwt.sign(
    { userId: userId , isAdmin: isAdmin},
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  });

  return token;
};

export default generateToken;
