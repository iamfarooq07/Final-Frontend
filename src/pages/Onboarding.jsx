import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { completeOnboardingCall } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Onboarding() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    fullName: user.fullName || "",
    skills: "",
    interests: "",
    location: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Convert comma-separated strings to arrays
    const data = {
      fullName: form.fullName.trim(),
      skills: form.skills.split(",").map(s => s.trim()).filter(s => s),
      interests: form.interests.split(",").map(i => i.trim()).filter(i => i),
      location: form.location.trim()
    };

    const result = await completeOnboardingCall(data, user.token);
    setLoading(false);

    if (result.token) {
      login(result);
      navigate("/dashboard");
    } else {
      setError(result.message || "Onboarding failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-[-5%] right-[-5%] w-[300px] h-[300px] bg-blue-100/50 blur-[80px] rounded-full -z-10" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-indigo-100/50 blur-[80px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white border border-slate-100 rounded-[2rem] shadow-2xl shadow-blue-100/40 p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Complete Your <span className="text-blue-600 italic">Profile.</span></h2>
          <p className="text-slate-400 font-medium text-sm mt-2">Tell us more about yourself to get started.</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-red-50 text-red-600 text-sm font-bold p-4 rounded-xl mb-6 text-center border border-red-100"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Full Name</label>
            <input
              name="fullName" type="text" required value={form.fullName} onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 transition-all"
              placeholder="Enter Your Full Name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Skills</label>
              <textarea
                name="skills" required value={form.skills} onChange={handleChange}
                className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 transition-all resize-none"
                placeholder="e.g., JavaScript, React, Node.js (comma separated)"
                rows={3}
              />
              <p className="text-xs text-slate-400 mt-1 ml-1">Separate skills with commas</p>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Interests</label>
              <textarea
                name="interests" required value={form.interests} onChange={handleChange}
                className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 transition-all resize-none"
                placeholder="e.g., Web Development, AI, Design (comma separated)"
                rows={3}
              />
              <p className="text-xs text-slate-400 mt-1 ml-1">Separate interests with commas</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Location</label>
            <input
              name="location" type="text" required value={form.location} onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 transition-all"
              placeholder="e.g., New York, NY or Remote"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-black py-4 rounded-xl shadow-lg hover:bg-blue-600 transition-all disabled:opacity-50 mt-4 text-sm uppercase tracking-widest"
          >
            {loading ? "Completing..." : "Complete Profile"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}