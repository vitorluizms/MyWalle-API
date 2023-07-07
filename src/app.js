import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import { signUp, signIn } from "./controllers/authControllers.js";
import { getTransations } from "./controllers/transationControllers.js";

//Criação do app
const app = express();

//Configurações
app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
  await mongoClient.connect();
  console.log("MongoDB connected!");
} catch (err) {
  console.log(err.message);
}

export const db = mongoClient.db();

//Funções (endpoints) abaixo
//Endpoints POST
app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

app.get("/transations", getTransations)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}`);
});
