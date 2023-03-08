import Message from "../models/Message.js";
import { createError } from "../util/error.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { conversationId, senderId, text } = req.body;

    if (!conversationId || !text)
      return next(createError(401, "Message and convo ID's required"));

    await Message.create({ conversationId, senderId, text });

    res.status(201).json("Message sent!");
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId });

    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};
