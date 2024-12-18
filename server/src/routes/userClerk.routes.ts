import express from "express";
import { updateUser } from "../controllers/userClerk.controllers";

const router = express.Router();

router.put("/:userId", updateUser);
router.get("/:userId", (req, res) => {
    res.json({ message: "Hello World" });
});
export default router;