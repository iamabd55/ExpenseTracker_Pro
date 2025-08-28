import mongoose from "mongoose";
import validator from "validator";

export const deleteTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");

  const { transaction_id } = req.params;

  if (!validator.isMongoId(transaction_id.toString())) throw "Please provide a valid transaction ID";

  // Find transaction
  const txn = await transactionModel.findById(transaction_id);
  if (!txn) throw "No transaction found";

  const userId = txn.user_id;

  // Delete the transaction
  await transactionModel.deleteOne({ _id: transaction_id });

  // ✅ Recompute balance from all remaining transactions
  const remainingTxns = await transactionModel.find({ user_id: userId });

  let newBalance = 0;
  remainingTxns.forEach((t) => {
    if (t.transaction_type === "income") {
      newBalance += t.amount;
    } else {
      newBalance -= t.amount;
    }
  });

  // Update user balance
  await usersModel.updateOne(
    { _id: userId },
    { $set: { balance: newBalance } },
    { runValidators: true }
  );

  res.status(200).json({ status: "success", balance: newBalance });
};
