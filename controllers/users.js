import User from "../models/User.js";
import { createError } from "../util/error.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) return next(createError(400, "User not found!"));

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
