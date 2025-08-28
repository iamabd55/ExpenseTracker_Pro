import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { jwtManager } from "../../../managers/jwtManager.js";

export const login = async (req, res) => {
  try {
    const usersModel = mongoose.model("users");
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email and password are required" });
    }

    const getUser = await usersModel.findOne({ email });

    if (!getUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    const comparePassword = await bcrypt.compare(password, getUser.password);

    if (!comparePassword) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email & Password do not match" });
    }

    const accessToken = jwtManager(getUser);

    res.status(200).json({
      status: "success",
      accessToken: accessToken,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", message: err.message || "Server Error" });
  }
};
