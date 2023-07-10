import Joi from "joi";

const schemaSignUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export default schemaSignUp;
