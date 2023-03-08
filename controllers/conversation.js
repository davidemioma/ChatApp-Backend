import Conversation from "../models/Conversation.js";
import { createError } from "../util/error.js";

export const createConversation = async (req, res, next) => {
  try {
    const { senderId, recieverId } = req.body;

    await Conversation.create({ members: [senderId, recieverId] });

    res.status(201).json("New conversation created");
  } catch (err) {
    next(err);
  }
};

export const getConversationsByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const conversations = await Conversation.find({
      members: { $in: [id] },
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
    const { myId, userId } = req.query;

    const conversation = await Conversation.findOne({
      members: { $in: [myId, userId] },
    });

    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};
