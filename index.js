import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import { connectDB } from "./config/dbConnect.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

//Middleqare
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);

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
