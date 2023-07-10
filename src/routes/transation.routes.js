import { Router } from "express";
import { createTransation, getTransations } from "../controllers/transationControllers";

const transationRouter = Router();

transationRouter.get("/transations", getTransations);
transationRouter.post("/transation/:type", createTransation);

export default transationRouter