import express from "express";
import {
  register,
  login,
  refreshAccessToken,
  logout,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/signin", login);

router.get("/refresh", refreshAccessToken);

router.get("/signout", logout);

export default router;
