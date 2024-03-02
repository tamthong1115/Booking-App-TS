import _ from "lodash";
import Schemas from "../schemas";
import { RequestHandler } from "express";

const supportedMethods = ["post", "put"];
const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

// interface CustomError {
//   status: string;
//   error: string;
// }

const schemaValidator: RequestHandler = (req, res, next) => {
  const path = req.route.path;
  const method = req.method.toLowerCase();

  if (!_.includes(supportedMethods, method)) {
    return next();
  }

  if (_.has(Schemas, path)) {
    const schema = Schemas[path];
    if (schema) {
      const { error, value } = schema.validate(req.body, validationOptions);

      if (error) {
        // const customError: CustomError = {
        //   status: "failed",
        //   error: "Invalid request. Please review request and try again.",
        // };

        const joiError = {
          status: "failed",
          error: {
            original: error._original,
            details: error.details.map(({ message, type }) => ({
              // message: message.replace(/['"]/g, ""),
              message: message,
              type,
            })),
          },
        };
        return res.status(400).json(joiError);
      }
      // validation successful
      req.body = value;
      return next();
    }
  }
  // not match path
  next();
};

export default schemaValidator;
