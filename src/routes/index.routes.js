import { Router } from "express";
import authRouter from "./auth.routes.js";
import transationRouter from "./transation.routes.js";

const router = Router();

router.use(authRouter);
router.use(transationRouter);

export default router;
