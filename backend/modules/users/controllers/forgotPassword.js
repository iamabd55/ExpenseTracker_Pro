import mongoose from "mongoose"

import { emailManager } from "../../../managers/emailManager.js"
export const forgotPassword=async(req,res) => {
    const usersModel=mongoose.model("users")
    const {email}=req.body

    if(!email)throw "Email is required"

    const getUser=await usersModel.findOne({
        email
    })
    if(!getUser) throw "This email doesn't exist in the system"

    const resetCode=Math.floor(10000+Math.random()*90000)

    await usersModel.updateOne({
        email
    },{
        reset_code:resetCode
    },{
        runValidators:true
    })

    await emailManager(email,"Your Password reset Code is: "+resetCode,"Reset Password")

  res.status(200).json({
    status:"Reset code sent to email successfully"
  })
}