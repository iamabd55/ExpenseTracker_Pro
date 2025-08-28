import React from "react";
import { Wallet, PieChart, PiggyBank } from "lucide-react"; // icons

const features = [
  {
    title: "Smart Expense Tracking",
    description:
      "Easily log and categorize your expenses to understand where your money goes every day.",
    icon: <Wallet className="w-10 h-10 text-purple-400" />,
  },
  {
    title: "Budget Planning & Insights",
    description:
      "Set monthly budgets, track spending trends, and get insights that help you stay on track.",
    icon: <PieChart className="w-10 h-10 text-blue-400" />,
  },
  {
    title: "Goals & Savings Made Easy",
    description:
      "Save for what matters. Create goals, monitor progress, and celebrate financial wins.",
    icon: <PiggyBank className="w-10 h-10 text-green-400" />,
  },
];

const Features = () => {
  return (
    <section className="w-full py-16 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Why Choose Expense Tracker Pro?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/10 border border-white/20 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
