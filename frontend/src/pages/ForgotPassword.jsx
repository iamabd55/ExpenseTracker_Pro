import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate(); // <-- added
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/forgotpw",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(data.status || "Reset code sent! Check your email.");

      // Redirect to reset password page after 1.5s
      setTimeout(() => {
        navigate("/resetpw", { state: { email } }); // pass email to reset page
      }, 1500);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.status || "Something went wrong!");
      } else {
        setError("Request failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-purple-950 to-slate-900 flex items-center justify-center">
      <div
        className="relative z-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] 
                   max-w-md sm:max-w-lg md:max-w-xl 
                   bg-white/5 rounded-2xl border-2 border-purple-600 
                   p-6 sm:p-8 shadow-2xl backdrop-blur-lg text-white 
                   overflow-y-auto mx-auto"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center tracking-wide text-purple-300">
          Forgot Password
        </h1>

        {message && (
          <p className="text-green-400 text-center mb-4">{message}</p>
        )}
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col relative">
            <label htmlFor="email" className="mb-1 text-sm font-medium">
              Enter your email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300"
                size={20}
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 px-4 py-2 rounded-xl bg-white/10 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-white/60 w-full"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold transition-all duration-200 shadow-md"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-purple-200">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-purple-400 underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
