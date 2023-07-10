import { Router } from "express";
import {
  createTransation,
  getTransations,
} from "../controllers/transationControllers.js";
import schemaTransation from "../schemas/transations.schema.js";
import { validateTransation } from "../middlewares/validateSchema.js";
import validateAuth from "../middlewares/validateAuth.js";

const transationRouter = Router();
transationRouter.use(validateAuth);

transationRouter.get("/transations", getTransations);
transationRouter.post(
  "/transation/:type",
  validateTransation(schemaTransation),
  createTransation
);

export default transationRouter;
