import mongoose from "mongoose";

export const addIncome = async (req, res) => {
  try {
    const { amount, remarks } = req.body;

    if (!amount || !remarks) {
      return res
        .status(400)
        .json({ message: "Amount and remarks are required" });
    }

    const Transactions = mongoose.model("transactions");
    const Users = mongoose.model("users");

    // ✅ Always ensure income is positive
    const incomeAmount = Math.abs(amount);

    // 1. Save transaction
    const newTransaction = new Transactions({
      amount: incomeAmount,
      remarks,
      transaction_type: "income",
      user_id: req.user._id,
    });
    await newTransaction.save();

    // 2. Update user balance
    const user = await Users.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.balance = (user.balance || 0) + incomeAmount; // ✅ add income
    await user.save();

    res.status(201).json({
      message: "Income added successfully",
      transaction: newTransaction,
      balance: user.balance, // ✅ return updated balance too
    });
  } catch (err) {
    console.error("❌ Error in addIncome:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message || err,
    });
  }
};
