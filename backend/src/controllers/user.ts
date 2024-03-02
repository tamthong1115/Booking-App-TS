import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import "dotenv/config";

// /api/users/register
export const postRegister = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    //this send automatically
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000, //1d
    });
    return res.status(200).send({ message: "User registered OK" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
