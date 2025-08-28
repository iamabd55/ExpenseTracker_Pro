import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const AddExpense = ({ token, onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!amount || !remarks) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(
        "http://localhost:5000/api/transactions/addExpense",
        { amount: Number(amount), remarks },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAmount("");
      setRemarks("");
      onClose();
      onSuccess(); // ✅ reload dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Error adding expense");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-neutral-900 rounded-2xl p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-white">Add Expense</h2>
        <form onSubmit={handleAddExpense} className="space-y-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-purple-700/50 bg-neutral-800 text-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-purple-700/50 bg-neutral-800 text-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-semibold shadow-md"
          >
            {submitting ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
