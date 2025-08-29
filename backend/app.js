import expressAsyncHandler from "express-async-handler";
import express from "express";
import cors from "cors";
import { errorHandler } from "./handlers/errorHandler.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { usersModel } from "./models/user.model.js";
import { transactionsModel } from "./models/transactions.model.js";
import userRoutes from "./modules/users/users.routes.js";
import transactionsRoutes from "./modules/transactions/transactions.routes.js";

dotenv.config();

const app = express();

// // ✅ Allowed origins (local + deployed frontend)
// const allowedOrigins = [
//   "http://localhost:5173",                   // Local dev
//   "https://expense-tracker-pro-three.vercel.app"    // Your deployed frontend (replace if different)
// ];

app.use(cors({
  origin: "*", // or your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((e) => {
    console.log("Connection to DB failed", e.message);
  });

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionsRoutes);

// ✅ 404 handler
app.all(/.*/, (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Not found!",
  });
});

// ✅ Error handler
app.use(errorHandler);

// ✅ Use Railway PORT instead of hardcoding
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

