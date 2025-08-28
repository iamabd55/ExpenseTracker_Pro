import mongoose from "mongoose";

export const addExpense = async (req, res) => {
  try {
    const { amount, remarks } = req.body;

    if (!amount || !remarks) {
      return res.status(400).json({ message: "Amount and remarks are required" });
    }

    const Users = mongoose.model("users");
    const Transactions = mongoose.model("transactions");

    // ✅ Get the user
    const user = await Users.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Ensure expense does not exceed balance
    if (user.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance. Cannot add this expense.",
        currentBalance: user.balance,
      });
    }

    // ✅ Create expense transaction
    const newTransaction = new Transactions({
      amount,
      remarks,
      transaction_type: "expense",
      user_id: req.user._id,
    });

    // ✅ Update balance
    user.balance -= amount;

    // ✅ Save both updates
    await Promise.all([newTransaction.save(), user.save()]);

    res.status(201).json({
      message: "Expense added successfully",
      transaction: newTransaction,
      updatedBalance: user.balance,
    });
  } catch (err) {
    console.error("❌ Error in addExpense:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message || err,
    });
  }
};
