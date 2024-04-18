import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
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
    console.log(req.body);
    await user.save();

    generateToken(res, user.id);

    return res.status(200).send({ message: "User registered OK" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(res, user.id);

    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getValidateToken = (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
};

export const postLogout = (req: Request, res: Response) => {
  try {
    res.cookie("auth_token", "", { expires: new Date(0) });
    res.send(200).json({ message: "Logout Success!" });
  } catch (err) {
    res.send(400).json({ message: "Logout Error!" });
  }
};
