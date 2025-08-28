import expressAsyncHandler from "express-async-handler";
import express from "express"
import cors from "cors"
import { errorHandler } from "./handlers/errorHandler.js";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import { usersModel } from "./models/user.model.js";
import { transactionsModel } from "./models/transactions.model.js";
import userRoutes from "./modules/users/users.routes.js";
import transactionsRoutes from "./modules/transactions/transactions.routes.js";
const app=express()
app.use(cors())
dotenv.config()
app.use(express.json())

mongoose.connect(process.env.mongo_connection,{}).then(() => {
  console.log("MongoDB connection successful")
}).catch((e) => {
  console.log("Connection to DB failed",e.message)
})
//
app.use("/api/users",userRoutes)
app.use("/api/transactions",transactionsRoutes)
//End of all routes
app.all(/.*/,(req,res,next) => {
  res.status(404).json({
    status:"failed",
    message:"Not found!"
  })
})
app.use(errorHandler)
app.listen(5000,() => {
  console.log("Server success")
})