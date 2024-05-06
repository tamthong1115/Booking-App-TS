import { NextFunction, Request, Response } from "express";
import chalk from "chalk";
import CustomError from "../utils/ExpressError";

const ExpressHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log(
      `${chalk.red(err.statusCode)} ${chalk.red(err.message)} \n${err.stack}`
    );
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error(chalk.red(err));
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export default ExpressHandler;
