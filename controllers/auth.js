import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../util/error.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
