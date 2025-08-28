import express from "express";

import { auth } from "../../middleware/auth.js";
import { addIncome } from "./controllers/addIncome.js";
import { addExpense } from "./controllers/addExpense.js";
import { getTransactions } from "./controllers/getTransactions.js";
import { deleteTransaction } from "./controllers/deleteTransaction.js";
import { editTransaction } from "./controllers/editTransaction.js";

const transactionsRoutes = express.Router();

// Public
transactionsRoutes.get("/", getTransactions);

// Protected
transactionsRoutes.post("/addIncome", auth, addIncome);
transactionsRoutes.post("/addExpense", auth, addExpense);
transactionsRoutes.delete("/:transaction_id", auth, deleteTransaction);
transactionsRoutes.patch("/editTransaction", auth, editTransaction);

export default transactionsRoutes;
