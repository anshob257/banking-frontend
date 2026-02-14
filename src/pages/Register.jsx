import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { showSuccess, showError, showLoading } from "../utils/alert";


function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    showLoading("Creating account...");
    await registerUser(form);
    await showSuccess("Registration Successful!");
    navigate("/");
  } catch (err) {
    showError(err.response?.data?.message || "Registration Failed");
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

      {/* CENTER CARD */}
      <div className="flex items-center justify-center min-h-[85vh] px-6 relative z-10">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-md transition-all duration-500 hover:scale-[1.02]">

          <h3 className="text-2xl font-bold text-center mb-8">
            Create Account
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
