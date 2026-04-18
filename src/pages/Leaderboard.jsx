import { useState } from "react";
import { motion } from "framer-motion";

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState("month");

  // Dummy leaderboard data
  const leaderboard = [
    {
      rank: 1,
      name: "Sarah Chen",
      avatar: "SC",
      trustScore: 4.9,
      helpsGiven: 47,
      badges: ["🏅", "⚡", "🤝"],
      change: "+2"
    },
    {
      rank: 2,
      name: "Mike Johnson",
      avatar: "MJ",
      trustScore: 4.8,
      helpsGiven: 42,
      badges: ["🏅", "🤝"],
      change: "+1"
    },
    {
      rank: 3,
      name: "Alice Brown",
      avatar: "AB",
      trustScore: 4.7,
      helpsGiven: 38,
      badges: ["⚡", "🤝"],
      change: "-1"
    },
    {
      rank: 4,
      name: "David Wilson",
      avatar: "DW",
      trustScore: 4.6,
      helpsGiven: 35,
      badges: ["🤝"],
      change: "+3"
    },
    {
      rank: 5,
      name: "Emma Davis",
      avatar: "ED",
      trustScore: 4.5,
      helpsGiven: 31,
      badges: ["⚡"],
      change: "0"
    },
    {
      rank: 6,
      name: "John Smith",
      avatar: "JS",
      trustScore: 4.4,
      helpsGiven: 28,
      badges: [],
      change: "-2"
    },
    {
      rank: 7,
      name: "Lisa Wang",
      avatar: "LW",
      trustScore: 4.3,
      helpsGiven: 25,
      badges: ["🤝"],
      change: "+1"
    },
    {
      rank: 8,
      name: "Tom Anderson",
      avatar: "TA",
      trustScore: 4.2,
      helpsGiven: 22,
      badges: [],
      change: "0"
    }
  ];

  const badgeDescriptions = {
    "🏅": "Top Helper",
    "⚡": "Fast Responder",
    "🤝": "Community Hero"
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getChangeColor = (change) => {
    if (change.startsWith("+")) return "text-green-600";
    if (change.startsWith("-")) return "text-red-600";
    return "text-slate-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leaderboard</h1>
          <p className="text-slate-600">Top helpers in our community</p>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        {leaderboard.slice(0, 3).map((user, index) => {
          const positions = [1, 0, 2]; // 2nd, 1st, 3rd order for display
          const actualIndex = positions[index];
          const actualUser = leaderboard[actualIndex];

          return (
            <div
              key={actualUser.rank}
              className={`relative rounded-2xl p-6 text-center ${
                actualUser.rank === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white" :
                actualUser.rank === 2 ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white" :
                "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
              }`}
              style={{
                transform: actualUser.rank === 1 ? "scale(1.05)" : "scale(1)",
                zIndex: actualUser.rank === 1 ? 10 : 5
              }}
            >
              <div className="text-4xl mb-2">🏆</div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                {actualUser.avatar}
              </div>
              <h3 className="font-bold text-lg mb-1">{actualUser.name}</h3>
              <p className="text-sm opacity-90 mb-2">#{actualUser.rank}</p>
              <div className="flex justify-center gap-1 mb-3">
                {actualUser.badges.map((badge, badgeIndex) => (
                  <span key={badgeIndex} className="text-lg" title={badgeDescriptions[badge]}>
                    {badge}
                  </span>
                ))}
              </div>
              <div className="text-sm">
                <p>{actualUser.helpsGiven} helps</p>
                <p>{actualUser.trustScore}/5 trust</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Full Rankings</h2>
        </div>

        <div className="divide-y divide-slate-200">
          {leaderboard.map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getRankStyle(user.rank)}`}>
                  {user.rank}
                </div>

                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {user.avatar}
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">{user.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>{user.helpsGiven} helps given</span>
                    <span>•</span>
                    <span>Trust Score: {user.trustScore}/5</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {user.badges.map((badge, badgeIndex) => (
                    <span key={badgeIndex} className="text-lg" title={badgeDescriptions[badge]}>
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="text-right">
                  <div className={`text-sm font-medium ${getChangeColor(user.change)}`}>
                    {user.change}
                  </div>
                  <div className="text-xs text-slate-500">vs last period</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Badge Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
      >
        <h3 className="font-semibold text-slate-900 mb-4">Badge System</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(badgeDescriptions).map(([badge, description]) => (
            <div key={badge} className="flex items-center gap-3">
              <span className="text-2xl">{badge}</span>
              <div>
                <p className="font-medium text-slate-900">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}