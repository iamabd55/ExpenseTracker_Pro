import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { jwtManager } from "../../../managers/jwtManager.js";
import { emailManager } from "../../../managers/emailManager.js";
import expressAsyncHandler from "express-async-handler";

export const register = expressAsyncHandler(async (req, res) => {
  const usersModel = mongoose.model("users");
  const { name, email, password, confirm_password } = req.body;

  // Validate required fields
  if (!name || !email || !password || !confirm_password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check duplicate email
  const existingUser = await usersModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const createdUser = await usersModel.create({
    full_name: name,
    email,
    password: hashedPassword,
    balance: 0, // default balance
  });

  // Generate JWT
  const accessToken = jwtManager(createdUser);

 try {
  await emailManager(
    createdUser.email,
    "Welcome to Expense Tracker PRO!",
    "We hope you can manage your expenses easily from our platform!"
  );
} catch (err) {
  console.error("Email sending failed:", err.message);
  // Don’t block registration just because email failed
}

  // Respond with token
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    accessToken,
  });
});



