import express from "express";
import {
  createConversation,
  getConversationsByUserId,
  getConversationByRecieverId,
} from "../controllers/conversation.js";
import { verifyAccessToken } from "../middleware/verifyAccessToken.js";

const router = express.Router();

router.get("/", verifyAccessToken, getConversationsByUserId);

router.get("/check", getConversationByRecieverId);

router.post("/", verifyAccessToken, createConversation);

export default router;
