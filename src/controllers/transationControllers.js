import { db } from "../app.js";
import Joi from "joi";

export async function getTransations(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Token não enviado");

  try {
    const user = await db.collection("session").findOne({ token });
    const transations = await db
      .collection("transations")
      .find({ idUser: user.idUser })
      .toArray();
    const body = {
      date: transations.date,
      description: transations.description,
      value: transations.value,
      type: transations.type,
    };
    res.status(200).send(body);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
