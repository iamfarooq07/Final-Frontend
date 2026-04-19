import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { getLeaderboard } from "../api/notifications";
import { Trophy, Medal, Star, Award } from "lucide-react";

export default function Leaderboard() {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState("month");
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard(timeframe, user.token);
        setLeaderboard(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [timeframe, user.token]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1: return "bg-yellow-500 text-white";
      case 2: return "bg-gray-400 text-white";
      case 3: return "bg-orange-500 text-white";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  // ✅ FIXED FUNCTION
  const getChangeColor = (change) => {
    if (!change) return "text-slate-500";
    if (typeof change === "number") {
      if (change > 0) return "text-green-600";
      if (change < 0) return "text-red-600";
    }
    if (typeof change === "string") {
      if (change.startsWith("+")) return "text-green-600";
      if (change.startsWith("-")) return "text-red-600";
    }
    return "text-slate-500";
  };

  if (loading) {
    return <div className="text-center p-10 text-slate-600">Loading leaderboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
          <p className="text-slate-600 mt-1">Top helpers in our community</p>
        </div>

        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Top 3 Podium */}
      {leaderboard.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[1, 0, 2].map((idx) => {
            const u = leaderboard[idx];
            if (!u) return null;
            const medalIcons = [
              <Trophy className="w-8 h-8" />, // Gold
              <Medal className="w-8 h-8" />, // Silver
              <Award className="w-8 h-8" />  // Bronze
            ];
            return (
              <div
                key={u.rank}
                className={`relative rounded-2xl p-6 text-center text-white ${
                  u.rank === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600 scale-105" :
                  u.rank === 2 ? "bg-gradient-to-br from-gray-300 to-gray-500" :
                  "bg-gradient-to-br from-orange-400 to-orange-600"
                }`}
              >
                <div className="mb-3 flex justify-center">
                  {medalIcons[idx]}
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                  {getInitials(u.name)}
                </div>
                <h3 className="font-bold text-lg">{u.name}</h3>
                <p className="text-sm opacity-90 mb-2">#{u.rank}</p>
                <div className="flex justify-center gap-1 mb-3">
                  {u.badges?.map((badge, i) => (
                    <span key={i} className="text-xl">{badge}</span>
                  ))}
                </div>
                <div className="text-sm font-semibold">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{u.trustScore?.toFixed(1) || "N/A"}</span>
                  </div>
                  <p>{u.helpsGiven} helps</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Full Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Full Rankings</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Rank</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">User</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">Trust Score</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">Helps Given</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">Badges</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-600">Change</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((u, index) => (
                <motion.tr
                  key={u.rank}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${getRankStyle(u.rank)}`}>
                      {u.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                        {getInitials(u.name)}
                      </div>
                      <span className="font-medium text-slate-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1 font-semibold">
                      <Star className="w-4 h-4" />
                      <span>{u.trustScore?.toFixed(1) || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-slate-900">{u.helpsGiven}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-1 justify-center">
                      {u.badges?.map((badge, i) => (
                        <span key={i} className="text-lg">{badge}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-semibold ${getChangeColor(u.change)}`}>
                      {typeof u.change === "number" ? (u.change > 0 ? "+" : "") + u.change : u.change}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Empty State */}
      {leaderboard.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-slate-500">No leaderboard data available yet</p>
        </div>
      )}
    </div>
  );
}