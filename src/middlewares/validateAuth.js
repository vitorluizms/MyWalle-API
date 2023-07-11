import { db } from "../database/database.connection.js";
export default async function validateAuth(req, res, next) {
  const { authorization } = req.headers;
  console.log(authorization);
  const token = authorization?.replace("Bearer ", "");
  console.log(token);

  if (!token) return res.status(401).send("Token não foi enviado, faça login!");
  try {
    const user = await db.collection("session").findOne({ token });
    if (!user) return res.status(401).send("Faça login!");
    res.locals.user = user;

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
