import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { corsOptions } from "./config/corsOptions.js";
import { connectDB } from "./config/dbConnect.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import conversationRoutes from "./routes/conversation.js";
import messagesRoutes from "./routes/messages.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

//Middleqare
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.post("/api/upload", upload.single("file"), (req, res, next) => {
  const { file } = req;

  if (!file) return next(createError(400, "File required!"));

  res.status(200).json(file.filename);
});
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/messages", messagesRoutes);

//Error middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;

  const message = err.message || "Something went wrong!";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, () => {
  connectDB();

  console.log(`Server running on port ${PORT}`);
});
