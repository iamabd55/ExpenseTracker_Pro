// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Plus,
  PlusCircle,
  MinusCircle,
  Minus,
  BarChart2,
  Home,
  Settings,
  FileText,
  DollarSign,
  LogOut,
  ArrowLeft,
  Pencil,
  Trash2,
} from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import AddIncome from "../components/AddIncome";
import AddExpense from "../components/AddExpense";
import Analytics from "../components/Analytics";
import DeleteTransaction from "../components/DeleteTransaction";
import EditTransaction from "../components/EditTransaction";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  // edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const token = localStorage.getItem("accessToken");

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${API}/api/users/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const payload = res.data || {};
      const userData = payload.data ?? payload.user ?? payload;
      const tx = payload.transactions ?? payload.data?.transactions ?? [];

      setUser(userData);
      setTransactions(Array.isArray(tx) ? tx : []);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
        navigate("/login");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchDashboard();
  }, [token]);

  const confirmLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const filteredTransactions = transactions.filter((t) =>
    ((t.description ?? t.remarks) || "")
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalIncome = transactions
    .filter((t) => t.transaction_type === "income")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const totalExpense = transactions
    .filter((t) => t.transaction_type === "expense")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const currentBalance =
    typeof user?.balance === "number"
      ? user.balance
      : totalIncome - totalExpense;

  if (loading) {
    return (
       <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950 to-black">
      <div className="flex flex-col items-center gap-4">
        <ClipLoader
          color="#a855f7" // Tailwind purple-500
          loading={loading}
          size={70}
          speedMultiplier={1.2}
        />
        <p className="text-purple-300 font-medium animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-800 dark:from-gray-950 dark:via-purple-950 dark:to-black dark:text-gray-100 flex flex-col relative transition-colors duration-500">
      {/* background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.1),transparent_60%)]" />

      {/* Top Navbar */}
      <header className="flex justify-between items-center px-6 py-4 
        bg-white/30 dark:bg-black/30 backdrop-blur-xl border-b border-purple-900/20 shadow-lg transition-colors duration-500">
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Expense Tracker <span className="text-gray-800 dark:text-white">Pro</span>
        </h1>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center gap-2 text-red-500 hover:text-red-400 font-medium transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </header>

      {/* Content Above Transactions */}
      <div className="flex-shrink-0">
        {/* Balance Box */}
        {!showAnalytics && (
          <div className="mx-4 mt-6 bg-gradient-to-br from-purple-600/40 to-indigo-900/40 dark:from-purple-600/30 dark:to-indigo-900/30 
            backdrop-blur-xl p-6 rounded-2xl text-white shadow-2xl border border-purple-500/30">
            <h2 className="text-base font-medium opacity-80">Total Balance</h2>
            <p className="text-4xl font-bold mt-2 tracking-normal text-white drop-shadow-lg">
              Rs.{Number(currentBalance || 0).toFixed(2)}
            </p>
            <div className="flex justify-between mt-3 text-sm text-purple-200">
              <span>Income: Rs. {Number(totalIncome).toFixed(2)}</span>
              <span>Expenses: Rs. {Number(totalExpense).toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Notification Bar */}
        <div className="mx-4 mt-4 bg-purple-600/10 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300 px-4 py-2 text-center text-sm rounded-xl border border-purple-400/20 dark:border-purple-800/40 shadow-md">
          💡 Rent due in 3 days!
        </div>

        {/* Search */}
        {!showAnalytics && (
          <div className="p-4">
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-purple-400/30 bg-white/40 dark:bg-black/40 text-gray-800 dark:text-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 px-4 mb-4">
          {!showAnalytics ? (
            <>
              <button
                onClick={() => setShowExpenseModal(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-500/80 hover:bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg backdrop-blur-sm transition"
              >
                <Minus size={16} /> Expense
              </button>
              <button
                onClick={() => setShowIncomeModal(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500/80 hover:bg-green-600 text-white py-3 rounded-xl font-semibold shadow-lg backdrop-blur-sm transition"
              >
                <Plus size={16} /> Income
              </button>
              <button
                onClick={() => setShowAnalytics(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-600/80 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg backdrop-blur-sm transition"
              >
                <BarChart2 size={16} /> Analytics
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAnalytics(false)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-600/80 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold shadow-lg backdrop-blur-sm transition"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {showAnalytics ? (
          <Analytics
            transactions={transactions}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />
        ) : filteredTransactions.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            No transactions yet ✨
          </p>
        ) : (
          <ul className="space-y-3">
            {filteredTransactions.map((t) => (
              <li
                key={t._id}
                className="flex justify-between items-center bg-white/50 dark:bg-black/40 backdrop-blur-md 
                rounded-xl px-4 py-3 shadow-xl border border-purple-500/20 hover:border-purple-400/50 
                transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <DollarSign
                    className={`p-1 rounded-full ${
                      t.transaction_type === "income"
                        ? "bg-green-300/20 text-green-500"
                        : "bg-red-300/20 text-red-500"
                    }`}
                    size={28}
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {t.description ?? t.remarks}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Right side: amount + edit/delete */}
                <div className="flex items-center gap-3">
                  <p
                    className={`flex items-center gap-2 font-semibold ${
                      t.transaction_type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {t.transaction_type === "income" ? (
                      <PlusCircle size={20} className="text-green-500" />
                    ) : (
                      <MinusCircle size={20} className="text-red-500" />
                    )}
                    Rs.{Number(t.amount).toFixed(2)}
                  </p>

                  {/* Edit */}
                  <button
                    onClick={() => {
                      setEditingTransaction(t);
                      setShowEditModal(true);
                    }}
                    className="p-2 text-blue-500 hover:text-blue-400 transition"
                    title="Edit transaction"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      setSelectedTransactionId(t._id);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 text-red-500 hover:text-red-400 transition"
                    title="Delete transaction"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom Navigation - Floating Dock */}
      <nav className="bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-purple-900/30 
        rounded-2xl shadow-xl p-2 flex justify-around items-center fixed bottom-4 
        left-1/2 -translate-x-1/2 w-[90%] max-w-md transition">
        <button
          onClick={() => setShowAnalytics(false)}
          className="flex flex-col items-center text-purple-600 dark:text-purple-300 hover:text-purple-500 dark:hover:text-purple-400 transition"
        >
          <Home size={20} />
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        <button
          onClick={() => setShowIncomeModal(true)}
          className="flex flex-col items-center text-purple-600 dark:text-purple-300 hover:text-purple-500 dark:hover:text-purple-400 transition"
        >
          <Plus size={20} />
          <span className="text-xs mt-1">Add</span>
        </button>
        <button className="flex flex-col items-center text-purple-600 dark:text-purple-300 hover:text-purple-500 dark:hover:text-purple-400 transition">
          <FileText size={20} />
          <span className="text-xs mt-1">Transactions</span>
        </button>
        <button
          onClick={() => setShowAnalytics(true)}
          className="flex flex-col items-center text-purple-600 dark:text-purple-300 hover:text-purple-500 dark:hover:text-purple-400 transition"
        >
          <BarChart2 size={20} />
          <span className="text-xs mt-1">Analytics</span>
        </button>
        <button className="flex flex-col items-center text-purple-600 dark:text-purple-300 hover:text-purple-500 dark:hover:text-purple-400 transition">
          <Settings size={20} />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg text-center w-80 border border-neutral-300 dark:border-neutral-700 transition">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-gray-800 dark:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showIncomeModal && (
        <AddIncome
          token={token}
          onClose={() => setShowIncomeModal(false)}
          onSuccess={fetchDashboard}
        />
      )}
      {showExpenseModal && (
        <AddExpense
          token={token}
          onClose={() => setShowExpenseModal(false)}
          onSuccess={fetchDashboard}
        />
      )}
      {showDeleteModal && selectedTransactionId && (
        <DeleteTransaction
          transactionId={selectedTransactionId}
          token={token}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={fetchDashboard}
        />
      )}
      {showEditModal && editingTransaction && (
        <EditTransaction
          token={token}
          transaction={editingTransaction}
          onClose={() => setShowEditModal(false)}
          onTransactionUpdated={fetchDashboard}
        />
      )}
    </div>
  );
};

export default Dashboard;




