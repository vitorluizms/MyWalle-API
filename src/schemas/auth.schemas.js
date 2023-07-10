import Joi from "joi";

const schemaSignUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

const schemaSignIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { schemaSignIn, schemaSignUp };
