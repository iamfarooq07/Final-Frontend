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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Blurs */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          x: [0, 10, -10, 0],
          y: [0, -10, 10, 0]
        }}
        transition={{
          scale: { duration: 1.5, ease: "easeOut" },
          opacity: { duration: 1.5, ease: "easeOut" },
          x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 25, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-[-5%] right-[-5%] w-[300px] h-[300px] bg-blue-100/50 blur-[80px] rounded-full -z-10"
      />''
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          x: [0, -15, 15, 0],
          y: [0, 15, -15, 0]
        }}
        transition={{
          scale: { duration: 1.5, delay: 0.2, ease: "easeOut" },
          opacity: { duration: 1.5, delay: 0.2, ease: "easeOut" },
          x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 18, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-indigo-100/50 blur-[80px] rounded-full -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white border border-slate-100 rounded-[2rem] shadow-2xl shadow-blue-100/40 p-6"
      >
        {/* Animated Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors text-[10px] font-black uppercase tracking-widest mb-4">
            <motion.span
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.2 }}
              className="p-1.5 bg-slate-50 rounded-full"
            >
              ←
            </motion.span> Home
          </Link>
        </motion.div>

        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mb-6"
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-3xl font-black text-slate-900 tracking-tighter"
          >
            Welcome <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="text-blue-600 italic"
            >
              Back.
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-slate-400 font-medium text-xs mt-1"
          >
            Sign in to your Nova account.
          </motion.p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-red-50 text-red-600 text-[10px] font-bold p-3 rounded-xl mb-4 text-center border border-red-100"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 ml-1">Email</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              name="email" type="email" required value={form.email} onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 transition-all"
              placeholder="email@example.com"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Password</label>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-[9px] font-black text-blue-600 hover:underline uppercase tracking-widest"
              >
                Forgot?
              </motion.a>
            </div>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              name="password" type="password" required value={form.password} onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 transition-all"
              placeholder="••••••••"
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-black py-3.5 rounded-xl shadow-lg hover:bg-blue-600 transition-all disabled:opacity-50 text-xs uppercase tracking-widest"
          >
            <motion.span
              key={loading ? "loading" : "login"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Signing in...</span>
              </motion.div>
            ) : (
              "Login"
            )}
            </motion.span>
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mt-4 pt-4 border-t border-slate-50 text-center"
        >
          <p className="text-xs text-slate-400 font-medium">
            New here?
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <Link to="/register" className="text-blue-600 font-black hover:underline ml-1">Create Account</Link>
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}