import mongoose from "mongoose"
export const getTransactions=async(req,res) => {

    const transactionsModel=mongoose.model("transactions")

    const transactions=await transactionsModel.find({
        user_id:req.user._id,
        ...req.query
    })



  res.status(200).json({
    status:"Transactions",
    data:transactions
  })
}