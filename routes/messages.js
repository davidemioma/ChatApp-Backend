import express from "express";
import { sendMessage, getMessages } from "../controllers/messages.js";
import { verifyAccessToken } from "../middleware/verifyAccessToken.js";

const router = express.Router();

router.get("/:conversationId", verifyAccessToken, getMessages);

router.post("/", verifyAccessToken, sendMessage);

export default router;
