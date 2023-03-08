import Conversation from "../models/Conversation.js";
import { createError } from "../util/error.js";

export const createConversation = async (req, res, next) => {
  try {
    const { recieverId } = req.body;

    if (!senderId || !recieverId)
      return next(createError(401, "Sender and reciver ID's required"));

    await Conversation.create({ members: [req.id, recieverId] });

    res.status(201).json("New conversation created");
  } catch (err) {
    next(err);
  }
};

export const getConversationsByUserId = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.id] },
    });

    if (!conversations)
      return next(createError(401, "No conversations available"));

    res.status(200).json(conversations);
  } catch (err) {
    next(err);
  }
};

export const getConversationByRecieverId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findOne({
      members: { $in: [id] },
    });

    if (!conversation)
      return next(createError(401, "Conversation not available"));

    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};
