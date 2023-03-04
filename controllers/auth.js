import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../util/error.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, profileUrl } = req.body;

    const duplicate = await User.findOne({ username })
      .collation({ locale: "en", strength: 2 })
      .exec();

    if (duplicate) return next(createError(409, "Username already exists"));

    const hashedPwd = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPwd, profileUrl });

    res.status(201).json(`New user ${username} created!`);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username })
      .collation({ locale: "en", strength: 2 })
      .exec();

    if (!user) return next(createError(401, `${username} does not exists`));

    const pwdMatched = await bcrypt.compare(password, user.password);

    if (!pwdMatched) return next(createError(401, "Wrong password"));

    const accessToken = jwt.sign(
      {
        userInfo: {
          id: user._id,
          username: user.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    const { password: userPassword, ...others } = user._doc;

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, //Must match the refresh token,
    });

    res.status(200).json({ others, accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    res.status(200).json("Cookie cleared");
  } catch (err) {
    next(err);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt)
      return next(createError(401, "You are not authenticated!"));

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return next(createError(403, "Token is not valid!"));

        const user = await User.findOne({ username: decoded.username })
          .collation({ locale: "en", strength: 2 })
          .exec();

        if (!user) return next(createError(401, "You are not authenticated!"));

        const accessToken = jwt.sign(
          {
            userInfo: {
              id: user._id,
              username: user.username,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );

        const { password: userPassword, ...others } = user._doc;

        res.status(200).json({ others, accessToken });
      }
    );
  } catch (err) {
    next(err);
  }
};
