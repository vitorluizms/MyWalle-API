import dayjs from "dayjs";
import { db } from "../app.js";
import schemaTransation from "../schemas/transations.schema.js";

export async function getTransations(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Token não enviado");

  try {
    const user = await db.collection("session").findOne({ token });
    if (!user) return res.status(401).send("Faça login!");
    const transations = await db
      .collection("transations")
      .find({ idUser: user.idUser })
      .toArray();
    const body = transations.map((transation) => {
      return {
        date: transation.date,
        description: transation.description,
        value: transation.value,
        type: transation.type,
      };
    });
    res.status(200).send(body);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function createTransation(req, res) {
  const { description, value } = req.body;
  const { type } = req.params;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Token não enviado");

  const obj = { value, type, description };
  const validate = schemaTransation.validate(obj, { abortEarly: false });
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
    const user = await db.collection("session").findOne({ token });
    if (!user) return res.status(401).send("Faça login!");
    await db.collection("transations").insertOne({
      idUser: user.idUser,
      value,
      description,
      type: type.replace(/:/, ""),
      date: dayjs().locale("pt-br").format("DD/MM"),
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
