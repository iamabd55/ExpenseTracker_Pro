import mongoose from "mongoose"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import { emailManager } from "../../../managers/emailManager.js"
export const resetPassword=async(req,res) => {
    const usersModel=mongoose.model("users")
    const {email,new_password,reset_code}=req.body
    
    if(!email)throw "Email is required"
    if(!new_password)throw "Please Enter new Password"
    if(reset_code.toString().length>5) throw "Invalid reset code"
  const getUserWithResetCode=await usersModel.findOne({
        email,
        reset_code
    })

    if(!getUserWithResetCode) throw "Reset Code doesn't match"

    const hashedPassword = await bcrypt.hash(new_password, 12);
    await usersModel.updateOne({
      email
    },{
      password:hashedPassword,
      reset_code:""
    },{
      runValidators:true
    })

    await emailManager(email,"Your Password is reset. If you have not done that, please contact us","Password reset successfull")
  res.status(200).json({
    status:"Password Reset Successfully"
  })
}