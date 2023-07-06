import Joi from "joi";
import bcrypt from "bcrypt";
import { db } from "../app.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const schemaSignUp = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });

  const validate = schemaSignUp.validate(req.body, { abortEarly: false });

  if (validate.error) {
    const errors = validate.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  const hash = bcrypt.hashSync(password, 10);

  try {
    const user = await db.collection("users").findOne({ email: email });
    if (user) return res.status(409).send("Email em uso! Tente outro!");

    await db.collection("users").insertOne({
      name,
      email,
      password: hash,
    });
    res.status(201).send("Usuário criado!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
