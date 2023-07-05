import { Express } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import Joi from "joi";
import dotenv from "dotenv";

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

const db = mongoClient.db();

//Funções (endpoints) abaixo


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}`);
});