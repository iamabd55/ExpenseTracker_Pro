import React, { useState } from "react";
import axios from "axios";

const DeleteTransaction = ({ transactionId, token, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!transactionId) return;
    try {
      setLoading(true);
      const API = import.meta.env.VITE_API_URL;
      await axios.delete(
        `${API}/api/transactions/${transactionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (onSuccess) onSuccess(); // ✅ refresh dashboard
      onClose(); // ✅ close modal
    } catch (err) {
      console.error("Error deleting transaction:", err.response?.data || err.message);
      alert("Failed to delete transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-neutral-900 p-6 rounded-xl shadow-lg w-96 border border-neutral-700">
        <h2 className="text-lg font-semibold text-white mb-4">
          Confirm Delete
        </h2>
        <p className="text-gray-400 mb-6">
          Are you sure you want to delete this transaction? This action cannot
          be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransaction;

