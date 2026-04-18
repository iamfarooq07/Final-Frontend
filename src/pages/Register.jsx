import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { registerUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "Need Help" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = await registerUser(form);
    setLoading(false);
    if (data.token) {
      login(data);
      if (!data.hasCompletedOnboarding) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-[-5%] right-[-5%] w-[300px] h-[300px] bg-blue-100/50 blur-[80px] rounded-full -z-10" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-indigo-100/50 blur-[80px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-slate-100 rounded-[2rem] shadow-2xl shadow-blue-100/40 p-8"
      >
        {/* Compact Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors text-[10px] font-black uppercase tracking-widest mb-4">
          <span className="p-1.5 bg-slate-50 rounded-full">←</span> Back
        </Link>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Join <span className="text-blue-600 italic">Nova.</span></h2>
          <p className="text-slate-400 font-medium text-xs mt-1">Create your professional account.</p>
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
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 ml-1">Name</label>
            <input
              name="fullName" type="text" required value={form.fullName} onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 transition-all"
              placeholder="Enter Your Name"
            />
          </div>

          <div>
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 ml-1">Email</label>
            <input
              name="email" type="email" required value={form.email} onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 transition-all"
              placeholder="Enter Your Email"
            />
          </div>

          <div>
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 ml-1">Password</label>
            <input
              name="password" type="password" required minLength={6} value={form.password} onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 transition-all mb-4"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 ml-1">Role</label>
            <select
              name="role" value={form.role} onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 transition-all appearance-none"
            >
              <option value="Need Help">Need Help</option>
              <option value="Can Help">Can Help</option>
              <option value="Both">Both</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-black py-3.5 rounded-xl shadow-lg hover:bg-blue-600 transition-all disabled:opacity-50 mt-2 text-xs uppercase tracking-widest"
          >
            {loading ? "Creating..." : "Register"}
          </motion.button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-400 font-medium">
            Already a member?
            <Link to="/login" className="text-blue-600 font-black hover:underline ml-1">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}