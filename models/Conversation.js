import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const conversationSchema = new Schema(
  {
    members: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Conversation || model("Conversation", conversationSchema);
