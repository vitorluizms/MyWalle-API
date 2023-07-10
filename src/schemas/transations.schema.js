import Joi from "joi";

const schemaTransation = Joi.object({
  value: Joi.number().precision(2).required(),
  type: Joi.string().valid(":withDrawal", ":deposit").required(),
  description: Joi.string().required(),
});

export default schemaTransation;
