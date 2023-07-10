import { Router } from "express";
import {
  createTransation,
  getTransations,
} from "../controllers/transationControllers.js";

const transationRouter = Router();

transationRouter.get("/transations", getTransations);
transationRouter.post("/transation/:type", createTransation);

export default transationRouter;
