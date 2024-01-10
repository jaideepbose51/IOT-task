import express from "express";
import { createUser, authentication } from "../controllers/index.js";

const router = express.Router();

router.post("/singup", authentication, createUser);

router.post("/login", login);

export default router;
