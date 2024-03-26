import Joi, { ObjectSchema } from "joi";
import schemaValidator from "../middlewares/schemaValidator";

const hotelSchema = Joi.object({
  name: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required(),
  pricePerNight: Joi.number().required().min(0),
  // facilities: Joi.array().required(),
});

export const hotelValidator = schemaValidator(hotelSchema);
