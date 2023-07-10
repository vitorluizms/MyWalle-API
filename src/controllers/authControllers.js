import Joi from "joi";
import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";
import { v4 as uuid } from "uuid";
import schemaSignUp from "../schemas/auth.schemas.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  const validate = schemaSignUp.validate(req.body, { abortEarly: false });

  if (validate.error) {
    let errors = "";
    validate.error.details.forEach((detail, index) => {
      if (index !== validate.error.details.length - 1)
        errors += `${detail.message}\n`;
      else errors += detail.message;
    });
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

export async function signIn(req, res) {
  const { email, password } = req.body;
  const schemaSignIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const validate = schemaSignIn.validate(req.body, { abortEarly: false });

  if (validate.error) {
    let errors = "";
    validate.error.details.forEach((detail, index) => {
      if (index !== validate.error.details.length - 1)
        errors += `${detail.message}\n`;
      else errors += detail.message;
    });
    return res.status(422).send(errors);
  }
  try {
    const user = await db.collection("users").findOne({ email: email });
    if (!user) return res.status(404).send("Usuário não cadastrado!");

    const validatePassword = bcrypt.compareSync(password, user.password);
    if (!validatePassword) return res.status(401).send("Senha inválida!");

    await db.collection("session").deleteMany({ idUser: user._id });
    const token = uuid();
    const body = { name: user.name, token };
    await db
      .collection("session")
      .insertOne({ token: token, idUser: user._id });
    res.status(200).send(body);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
