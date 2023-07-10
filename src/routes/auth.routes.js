import { Router } from "express";
import { signIn, signUp } from "../controllers/authControllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { schemaSignIn, schemaSignUp } from "../schemas/auth.schemas.js";

const authRouter = Router();
authRouter.post("/sign-up", validateSchema(schemaSignUp), signUp);

authRouter.post("/sign-in", validateSchema(schemaSignIn), signIn);

export default authRouter;
