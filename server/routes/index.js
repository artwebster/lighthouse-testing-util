import { Router } from "express";
import lighthouse from "./lighthouse.js";

const router = Router();

router.use("/lighthouse", lighthouse);

export default router;
