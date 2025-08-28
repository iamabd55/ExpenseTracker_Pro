import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Key } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    reset_code: "",
    new_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const API = import.meta.env.VITE_API_URL;
      const { data } = await axios.post(
        "{API}/api/users/resetpw",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(data.status);
      setTimeout(() => {
        navigate("/login");
      }, 2000); // redirect to login after 2s
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.status || err.response.data.message);
      } else {
        setError("Password reset failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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
                   bg-white/5 rounded-2xl border-2 border-purple-600 
                   p-6 sm:p-8 shadow-2xl backdrop-blur-lg text-white 
                   overflow-y-auto mx-auto"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 text-purple-300">
          Reset Password
        </h1>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-400 text-center mb-4">{success}</p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col relative">
            <label className="mb-1 text-sm font-medium">Email</label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300"
                size={20}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="pl-12 px-4 py-2 rounded-xl bg-white/10 border border-purple-500 w-full placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          {/* Reset Code */}
          <div className="flex flex-col relative">
            <label className="mb-1 text-sm font-medium">Reset Code</label>
            <div className="relative">
              <Key
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300"
                size={20}
              />
              <input
                type="text"
                name="reset_code"
                value={form.reset_code}
                onChange={handleChange}
                placeholder="Enter code sent to email"
                className="pl-12 px-4 py-2 rounded-xl bg-white/10 border border-purple-500 w-full placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col relative">
            <label className="mb-1 text-sm font-medium">New Password</label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300"
                size={20}
              />
              <input
                type="password"
                name="new_password"
                value={form.new_password}
                onChange={handleChange}
                placeholder="********"
                className="pl-12 px-4 py-2 rounded-xl bg-white/10 border border-purple-500 w-full placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold transition-all duration-200 shadow-md"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

