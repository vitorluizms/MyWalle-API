import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function getTransations(req, res) {
  const { user } = res.locals;

  try {
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
  const { user } = res.locals;

  try {
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
