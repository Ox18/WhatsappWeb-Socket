import { Router } from "express";
import { renderIndex, renderMain } from "../controllers/index.controller";

const router = Router();

router.get("/", renderIndex);

router.get("/main", renderMain);

export default router;
