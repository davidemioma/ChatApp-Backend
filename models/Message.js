import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Message || model("Message", messageSchema);
