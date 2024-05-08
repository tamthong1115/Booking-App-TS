import {NextFunction, Request, Response} from "express";
import chalk from "chalk";
import CustomError from "../utils/ExpressError";

const ExpressHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(
        `${chalk.red(err.statusCode)} ${chalk.red(err.message)} \n${err.stack}`
    );
    res.status(err.statusCode).json({message: err.message});
};

export default ExpressHandler;
