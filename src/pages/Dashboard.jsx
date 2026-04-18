import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRequests, getMyRequests } from "../api/requests";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { title: "Total Requests", value: "0", change: "+0%", icon: "📋", color: "blue" },
    { title: "Active Requests", value: "0", change: "+0%", icon: "🔄", color: "green" },
    { title: "Helped Users", value: "0", change: "+0%", icon: "🤝", color: "purple" },
    { title: "Trust Score", value: "0.0", change: "+0.0", icon: "⭐", color: "yellow" },
  ]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [allRequests, userRequests] = await Promise.all([
        getRequests({}, user.token),
        getMyRequests(user.token)
      ]);

      // Calculate stats
      const activeRequests = allRequests.filter(r => r.status === 'open');
      const solvedRequests = allRequests.filter(r => r.status === 'solved');
      const userSolved = solvedRequests.filter(r => r.helperId === user._id);

      setStats([
        {
          title: "Total Requests",
          value: allRequests.length.toString(),
          change: "+12%",
          icon: "📋",
          color: "blue"
        },
        {
          title: "Active Requests",
          value: activeRequests.length.toString(),
          change: "+5%",
          icon: "🔄",
          color: "green"
        },
        {
          title: "Helped Users",
          value: userSolved.length.toString(),
          change: "+23%",
          icon: "🤝",
          color: "purple"
        },
        {
          title: "Trust Score",
          value: "4.8",
          change: "+0.2",
          icon: "⭐",
          color: "yellow"
        },
      ]);

      setRecentRequests(allRequests.slice(0, 5));
      setMyRequests(userRequests);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const aiInsights = [
    "You are most active in React help requests",
    "High demand skill: Node.js - consider learning it",
    "Suggested: Try answering backend requests for better matching",
    "Your response time is 2x faster than average",
  ];

  const quickActions = [
    { title: "Create Request", description: "Post a new help request", path: "/create-request", icon: "➕", color: "blue" },
    { title: "Browse Feed", description: "Explore available requests", path: "/feed", icon: "🔍", color: "green" },
    { title: "View Leaderboard", description: "See top helpers", path: "/leaderboard", icon: "🏆", color: "purple" },
    { title: "Open AI Center", description: "Get AI-powered insights", path: "/ai-center", icon: "🤖", color: "indigo" },
  ];

  const urgencyColors = {
    High: "bg-red-50 text-red-700 border-red-200",
    Medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Low: "bg-green-50 text-green-700 border-green-200",
  };

  const statColors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.fullName?.split(' ')[0]}!</h1>
          <p className="text-slate-600 mt-1">Here's what's happening in your community today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
            Online
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${statColors[stat.color]} rounded-xl flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Requests */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Recent Community Requests</h2>
              <Link
                to="/feed"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all →
              </Link>
            </div>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-slate-100 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div key={request._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2 line-clamp-1">{request.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-slate-200 text-slate-700 px-3 py-1 rounded-full font-medium">
                          {request.category}
                        </span>
                        <span className={`text-xs px-3 py-1 rounded-full border font-medium ${urgencyColors[request.urgency]}`}>
                          {request.urgency}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {request.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-medium">
                            {tag}
                          </span>
                        ))}
                        {request.tags.length > 3 && (
                          <span className="text-xs text-slate-500">+{request.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>
                    <Link
                      to={`/request/${request._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors ml-4"
                    >
                      View
                    </Link>
                  </div>
                ))}
                {recentRequests.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-500">No requests yet. Be the first to create one!</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* AI Insights */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🤖</span>
              <h2 className="text-xl font-semibold text-slate-900">AI Insights</h2>
            </div>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                  <span className="text-blue-600 mt-0.5">💡</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="group flex flex-col items-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-200 hover:shadow-md"
            >
              <span className={`text-3xl mb-3 ${statColors[action.color]} w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {action.icon}
              </span>
              <h3 className="font-semibold text-slate-900 text-center mb-2">{action.title}</h3>
              <p className="text-xs text-slate-600 text-center leading-relaxed">{action.description}</p>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}