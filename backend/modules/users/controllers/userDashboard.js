import mongoose from "mongoose";

export const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel=mongoose.model("transactions")
  const getUser = await usersModel.findOne({
    _id: req.user._id, //getting decoded data from auth middleware
  })
  .select("-password"); //exclude password from displaying
  const transactions=await transactionsModel.find({
    user_id:req.user._id
  })
  .sort("createdAt").limit(5);  //use "-createdAt" for descending and "createdAt for ascending"

  res.status(200).json({
    status: "success",
    data: getUser,
    transactions,
  });
};
