import mongoose from "mongoose";
import validator from "validator";

export const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");

  const { transaction_id, remarks, amount, transaction_type } = req.body;

  if (!transaction_id) throw "Transaction id is required";
  if (!validator.isMongoId(transaction_id.toString()))
    throw "please provide a valid ID";

  const updated = await transactionModel.findByIdAndUpdate(
    transaction_id,
    {
      remarks,
      transaction_type,
      amount: Number(amount),
    },
    { new: true, runValidators: true }
  );

  if (!updated) throw "NO transaction found";

  res.status(200).json({
    status: "Edit successful",
    transaction: updated,
  });
};
