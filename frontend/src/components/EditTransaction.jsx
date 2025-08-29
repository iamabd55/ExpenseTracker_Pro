import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTransaction = ({ transaction, token, onClose, onTransactionUpdated }) => {
  const [formData, setFormData] = useState({
    transaction_id: "",
    remarks: "",
    amount: "",
    transaction_type: "income",
  });

  // Prefill when transaction changes
  useEffect(() => {
    if (transaction) {
      setFormData({
        transaction_id: transaction._id,
        remarks: transaction.remarks || "",
        amount: transaction.amount || "",
        transaction_type: transaction.transaction_type || "income",
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = import.meta.env.VITE_API_URL;
      await axios.put(
        `${API}/api/transactions/editTransaction`,
        formData.transaction_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onTransactionUpdated(); // refresh list in parent
      onClose(); // close modal
    } catch (error) {
      console.error("Error editing transaction:", error);
      alert(
        error.response?.data?.message || "Failed to update transaction. Try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-2xl w-96 border border-purple-700">
        <h2 className="text-2xl font-bold mb-4 text-purple-400 text-center">
          ✨ Edit Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Remarks */}
          <div>
            <label className="block text-gray-300 mb-1">Remarks</label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-[#2a2a2a] text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-300 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="1"
              className="w-full border border-gray-600 bg-[#2a2a2a] text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Transaction Type */}
          <div>
            <label className="block text-gray-300 mb-1">Transaction Type</label>
            <select
              name="transaction_type"
              value={formData.transaction_type}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-[#2a2a2a] text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;

