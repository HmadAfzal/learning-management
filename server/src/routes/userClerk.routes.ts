import express from "express";
import { updateUser } from "../controllers/userClerk.controllers";

const router = express.Router();

router.put("/:userId", updateUser);

export default router;