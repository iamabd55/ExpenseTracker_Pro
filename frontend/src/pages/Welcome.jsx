import React from "react";
import logo from "../assets/logo.svg";
import TextAnimatedGradient from "../fonts/textAnimatedGradient.jsx";
import Button from "../components/Button.jsx";
import Button2 from "../components/Button2";
import Features from "../components/Features";
import Footer from "../components/Footer";

const Welcome = () => {
  return (
    <div className="relative">
      {/* 🔥 Background (fixed, covers whole page) */}
      <div className="fixed inset-0 -z-10 bg-slate-950 
        [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]
        before:absolute before:inset-0 
        before:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] 
        before:bg-[size:14px_24px] 
        before:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]
        before:content-['']">
      </div>

      {/* Hero */}
      <div className="min-h-screen flex">
        <div className="flex flex-col items-center justify-center gap-5 flex-1">
          {/* Logo */}
          <img src={logo} alt="logo" className="opacity-75 w-[150px] md:w-[250px]" />

          {/* Title */}
          <TextAnimatedGradient text="Welcome to Expense Tracker Pro" />

          {/* Subtitle */}
          <p
            className="text-white text-xl w-[85vw] md:w-full text-center"
            style={{ fontFamily: "Saira, sans-serif" }}
          >
            Manage your expenses, plan your savings, and reach your goals stress-free.
          </p>

          {/* Buttons */}
          <div className="flex flex-col my-4 md:flex-row md:gap-2">
            <Button text="Register" to="/register" />
            <Button2 text="Login" to="/login" />
          </div>
        </div>
      </div>

      {/* Features below hero */}
      <Features />
      <Footer/>
    </div>
  );
};

export default Welcome;

