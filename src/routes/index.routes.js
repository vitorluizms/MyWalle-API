import { Router } from "express";
import authRouter from "./auth.routes";
import transationRouter from "./transation.routes";

const router = Router();

router.use(authRouter);
router.use(transationRouter);

export default router;
