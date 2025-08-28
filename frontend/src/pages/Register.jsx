import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("accessToken", data.accessToken);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background
    <div
      className="relative w-full min-h-screen flex items-center justify-center bg-slate-950
      [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]
      before:absolute before:inset-0
      before:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]
      before:bg-[size:14px_24px] before:content-['']"
    >
      <div
        className="relative z-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] 
             max-w-md sm:max-w-lg md:max-w-xl 
             bg-white/10 rounded-2xl border-2 border-purple-500 
             p-6 sm:p-8 shadow-xl backdrop-blur-lg text-white 
             overflow-y-auto mx-auto"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 sm:mb-8">
          Sign Up
        </h1>
        {/* Conditional rendering of error */}
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col relative">
            <label className="mb-1 text-sm sm:text-base font-medium">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-purple-400"
                size={20}
              />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="pl-10 sm:pl-12 px-3 sm:px-4 py-2 rounded-xl bg-white/20 border border-purple-500 w-full placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col relative">
            <label className="mb-1 text-sm sm:text-base font-medium">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-purple-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="pl-10 sm:pl-12 px-3 sm:px-4 py-2 rounded-xl bg-white/20 border border-purple-500 w-full placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="mb-1 text-sm sm:text-base font-medium">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-purple-400"
                size={20}
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="pl-10 sm:pl-12 px-3 sm:px-4 py-2 rounded-xl bg-white/20 border border-purple-500 w-full placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col relative">
            <label className="mb-1 text-sm sm:text-base font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-purple-400"
                size={20}
              />
              <input
                type="password"
                name="confirm_password"
                value={form.confirm_password}
                onChange={handleChange}
                placeholder="********"
                className="pl-10 sm:pl-12 px-3 sm:px-4 py-2 rounded-xl bg-white/20 border border-purple-500 w-full placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-all duration-200 shadow-md"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-purple-200">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
