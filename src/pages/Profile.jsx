import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Profile() {
  const { user } = useAuth();

  // Dummy data
  const userStats = {
    requestsCreated: 12,
    requestsSolved: 8,
    helpsGiven: 15,
    trustScore: 4.7
  };

  const skills = [
    "React", "JavaScript", "Node.js", "Express", "MongoDB", "TypeScript", "CSS", "HTML"
  ];

  const badges = [
    { name: "Top Helper", description: "Helped 10+ users", icon: "🏅", earned: true },
    { name: "Fast Responder", description: "Responds within 30 minutes", icon: "⚡", earned: true },
    { name: "Community Hero", description: "Active for 6+ months", icon: "🤝", earned: true },
    { name: "AI Expert", description: "Specializes in AI/ML", icon: "🤖", earned: false },
    { name: "DevOps Master", description: "Expert in DevOps", icon: "🐳", earned: false },
    { name: "Mentor", description: "Mentored 5+ users", icon: "👨‍🏫", earned: false }
  ];

  const trustScorePercentage = (userStats.trustScore / 5) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-600">Manage your profile and view your contributions</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
          Edit Profile
        </button>
      </div>

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 mb-1">{user?.fullName || "User Name"}</h2>
            <p className="text-slate-600 mb-2">{user?.email || "user@example.com"}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              {user?.role || "Role"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Requests Created", value: userStats.requestsCreated, icon: "📋" },
          { label: "Requests Solved", value: userStats.requestsSolved, icon: "✅" },
          { label: "Helps Given", value: userStats.helpsGiven, icon: "🤝" },
          { label: "Trust Score", value: userStats.trustScore, icon: "⭐", special: true }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
              {stat.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              {stat.special ? `${stat.value}/5` : stat.value}
            </h3>
            <p className="text-slate-600 text-sm">{stat.label}</p>
            {stat.special && (
              <div className="mt-3">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${trustScorePercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Badges Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                badge.earned
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-slate-50 border-slate-200 opacity-60"
              }`}
            >
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <h3 className={`font-medium ${badge.earned ? "text-slate-900" : "text-slate-500"}`}>
                  {badge.name}
                </h3>
                <p className={`text-sm ${badge.earned ? "text-slate-600" : "text-slate-400"}`}>
                  {badge.description}
                </p>
              </div>
              {badge.earned && (
                <span className="ml-auto text-yellow-600">✓</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}