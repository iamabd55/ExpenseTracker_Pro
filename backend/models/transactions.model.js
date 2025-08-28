import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    amount:{
        type:Number,
        required:true,
    },
    transaction_type:{
        type:String,
        required:true,
        enum:["income","expense"],
    },
    remarks:{
        type:String,
        required:true
    },
  },
  {
    timestamps: true,
  }
);

export const transactionsModel = mongoose.model("transactions", transactionsSchema);
