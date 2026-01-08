import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});

app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/subscribe", subscriptionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  