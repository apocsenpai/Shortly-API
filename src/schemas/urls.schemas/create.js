import Joi from "joi";

const createUrlSchema = Joi.object({
  url: Joi.string().uri().required(),
});

export default createUrlSchema;
