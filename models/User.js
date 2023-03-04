import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
  },
});

export default models.User || model("User", userSchema);
