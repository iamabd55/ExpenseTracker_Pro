import React, { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const Analytics = ({ transactions, onBack }) => {
  const [filter, setFilter] = useState("month");

  // Filter transactions by time
  const filteredTxns = useMemo(() => {
    const now = new Date();
    return transactions.filter((t) => {
      const txnDate = new Date(t.createdAt);
      const diffDays = (now - txnDate) / (1000 * 60 * 60 * 24);
      if (filter === "week") return diffDays <= 7;
      if (filter === "month") return diffDays <= 30;
      if (filter === "year") return diffDays <= 365;
      return true;
    });
  }, [transactions, filter]);

  // Income & Expense totals
  const totals = useMemo(() => {
    let income = 0,
      expense = 0;
    filteredTxns.forEach((t) => {
      if (t.transaction_type === "income") income += Number(t.amount);
      else expense += Number(t.amount);
    });
    return { income, expense };
  }, [filteredTxns]);

  // Pie chart data
  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totals.income, totals.expense],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 1,
        hoverOffset: 6,
      },
    ],
  };

  // Bar chart data
  const barData = useMemo(() => {
    const dataMap = {};
    filteredTxns.forEach((t) => {
      const date = new Date(t.createdAt);
      let key = "";
      if (filter === "week") key = date.toLocaleDateString("en-US", { weekday: "short" });
      else if (filter === "month") key = date.getDate();
      else if (filter === "year") key = date.toLocaleDateString("en-US", { month: "short" });

      if (!dataMap[key]) dataMap[key] = { income: 0, expense: 0 };
      if (t.transaction_type === "income") dataMap[key].income += Number(t.amount);
      else dataMap[key].expense += Number(t.amount);
    });

    return {
      labels: Object.keys(dataMap),
      datasets: [
        {
          label: "Income",
          data: Object.values(dataMap).map((d) => d.income),
          backgroundColor: "#22c55e",
          barThickness: 20,
        },
        {
          label: "Expense",
          data: Object.values(dataMap).map((d) => d.expense),
          backgroundColor: "#ef4444",
          barThickness: 20,
        },
      ],
    };
  }, [filteredTxns, filter]);

  return (
    <div className="p-6 space-y-8">
      {/* Back + Filter */}
      <div className="flex items-center justify-between mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-neutral-900 border border-gray-600 text-gray-200 rounded-lg px-3 py-2"
        >
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="year">Past Year</option>
        </select>
      </div>

      {/* Grid Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
       {/* Pie Chart */}
<div className="bg-neutral-900 rounded-xl p-4 shadow-lg flex flex-col items-center justify-center">
  <h2 className="text-md font-semibold text-purple-300 mb-3">
    Income vs Expense
  </h2>
  <div className="w-48 h-48">   {/* 👈 Smaller fixed size */}
    <Pie data={pieData} />
  </div>
</div>


        {/* Bar Chart */}
        <div className="bg-neutral-900 rounded-xl p-4 shadow-lg">
          <h2 className="text-md font-semibold text-purple-300 mb-3">
            {filter === "week" && "Daily Trends (Past Week)"}
            {filter === "month" && "Daily Trends (Past Month)"}
            {filter === "year" && "Monthly Trends (Past Year)"}
          </h2>
          <div className="h-64">
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
