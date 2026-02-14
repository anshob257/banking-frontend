import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showLoading } from "../utils/alert";


function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    showLoading("Signing in...");
    await login(form);
    await showSuccess("Login Successful!");
    navigate("/dashboard");
  } catch (err) {
    showError(err.response?.data?.message || "Login Failed");
  }
};


  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-6 relative z-10">
        <h1 className="text-4xl font-bold tracking-wide">
          NeoBank Pro
        </h1>
      </div>

      {/* Glow Background */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse top-20 left-0"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-600 opacity-20 rounded-full blur-3xl animate-pulse bottom-0 right-0"></div>
      </div>

      {/* CENTER SECTION */}
      <div className="flex items-center justify-center min-h-[85vh] px-6 relative z-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl w-full">

          {/* HERO */}
          {/* HERO */}
<div className="space-y-8 text-center lg:text-left">

  <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
    Smart Digital Banking
    <span className="block bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
      Built on Secure Ledger Architecture
    </span>
  </h2>

  <p className="text-gray-400 text-lg max-w-lg">
    Experience real-time balance updates, double-entry accounting,
    and enterprise-grade transaction integrity.
  </p>

  {/* 🔥 Feature Badges (Back & Improved) */}
  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">

    <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-md hover:scale-105 transition-all duration-300">
      ⚡ Instant Transfers
    </div>

    <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-md hover:scale-105 transition-all duration-300">
      🔒 Secure Ledger
    </div>

  </div>
</div>


          {/* LOGIN CARD */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 transition-all duration-500 hover:scale-[1.02]">

            <h3 className="text-2xl font-bold text-center mb-8">
              Sign In
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                />
              </div>

              <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    onChange={handleChange}
    required
    className="w-full px-4 py-3 pr-12 rounded-lg bg-black/40 border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300 text-white"
  />

  {/* Eye Button */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition"
  >
    {showPassword ? (
      /* Eye Off Icon */
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7 1.02-2.29 2.87-4.21 5.25-5.32M9.88 9.88A3 3 0 0114.12 14.12M3 3l18 18"
        />
      </svg>
    ) : (
      /* Eye Icon */
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    )}
  </button>
</div>


              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            {/* REGISTER LINK */}
            <p className="text-center text-gray-400 mt-6">
              New user?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-400 cursor-pointer hover:underline"
              >
                Create an account
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
