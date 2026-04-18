import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser } from "../api/auth"; // Make sure loginUser api function exists
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = await loginUser(form);
    setLoading(false);
    if (data.token) {
      login(data);
      if (!data.hasCompletedOnboarding) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError(data.message || "Invalid credentials");
    }
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Blurs (Matching Register Page) */}
      <div className="absolute top-[-5%] right-[-5%] w-[300px] h-[300px] bg-blue-100/50 blur-[80px] rounded-full -z-10" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-indigo-100/50 blur-[80px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-slate-100 rounded-[2rem] shadow-2xl shadow-blue-100/40 p-8"
      >
        {/* Compact Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors text-[10px] font-black uppercase tracking-widest mb-4">
          <span className="p-1.5 bg-slate-50 rounded-full">←</span> Home
        </Link>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Welcome <span className="text-blue-600 italic">Back.</span></h2>
          <p className="text-slate-400 font-medium text-xs mt-1">Sign in to your Nova account.</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-red-50 text-red-600 text-[10px] font-bold p-3 rounded-xl mb-4 text-center border border-red-100"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 ml-1">Email</label>
            <input
              name="email" type="email" required value={form.email} onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 transition-all"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Password</label>
              <a href="#" className="text-[9px] font-black text-blue-600 hover:underline uppercase tracking-widest">Forgot?</a>
            </div>
            <input
              name="password" type="password" required value={form.password} onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 transition-all"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-black py-3.5 rounded-xl shadow-lg hover:bg-blue-600 transition-all disabled:opacity-50 mt-2 text-xs uppercase tracking-widest"
          >
            {loading ? "Signing in..." : "Login"}
          </motion.button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-400 font-medium">
            New here?
            <Link to="/register" className="text-blue-600 font-black hover:underline ml-1">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}