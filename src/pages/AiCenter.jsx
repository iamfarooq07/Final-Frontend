import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { getAIInsights, getUserStats } from "../api/notifications";
import { Atom, Circle, Bot, Container, Diamond, Code, TrendingUp, Zap, Target, Rocket, Lightbulb, Users, Star } from "lucide-react";

// Icon mapping function for backend icon names
const getIconComponent = (iconName) => {
  const iconMap = {
    TrendingUp,
    Zap,
    Target,
    Rocket,
    Lightbulb,
    Users,
    Star,
    Bot,
    Atom,
    Circle,
    Container,
    Diamond,
    Code
  };
  return iconMap[iconName] || Bot; // Default to Bot if icon not found
};

export default function AiCenter() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [insights, setInsights] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [insightsData, statsData] = await Promise.all([
          getAIInsights(user.token),
          getUserStats(user.token)
        ]);
        setInsights(insightsData || []);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to fetch AI insights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.token]);

  const priorityColors = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-green-100 text-green-700 border-green-200"
  };

  const suggestions = [
    {
      title: `Answer pending requests in your skills`,
      description: "High urgency requests waiting for your expertise",
      action: "View Requests",
      priority: "high"
    },
    {
      title: "Complete your profile with more skills",
      description: "Add more skills for better matching",
      action: "Update Profile",
      priority: "medium"
    },
    {
      title: "Help more users this week",
      description: stats?.activeRequests ? `${stats.activeRequests} active requests available` : "No active requests",
      action: "Explore Requests",
      priority: "low"
    }
  ];

  const trendingSkills = [
    { name: "React", growth: "+45%", demand: "High", icon: Atom },
    { name: "Node.js", growth: "+32%", demand: "High", icon: Circle },
    { name: "AI/ML", growth: "+67%", demand: "Very High", icon: Bot },
    { name: "DevOps", growth: "+28%", demand: "Medium", icon: Container },
    { name: "TypeScript", growth: "+23%", demand: "High", icon: Diamond },
    { name: "Python", growth: "+41%", demand: "High", icon: Code }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">AI Center</h1>
            <p className="text-slate-600 mt-1">Your personalized AI insights and recommendations</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {stats && (
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalRequests || 0}</div>
                <div className="text-slate-500">Total Requests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.helpsGiven || 0}</div>
                <div className="text-slate-500">Helps Given</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.trustScore || 0}</div>
                <div className="text-slate-500">Trust Score</div>
              </div>
            </div>
          )}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 shadow-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 text-center p-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-600">Loading AI insights...</p>
          </div>
        ) : insights.length === 0 ? (
          <div className="col-span-2 text-center p-12">
            <Bot className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 text-lg font-medium">No insights available yet</p>
            <p className="text-slate-500 text-sm mt-2">Start helping users to get personalized AI recommendations</p>
          </div>
        ) : (
          insights.map((insight, index) => {
            const IconComponent = getIconComponent(insight.icon);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${insight.color} shadow-sm`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">{insight.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-semibold text-slate-900">AI Recommendations</h2>
        </div>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                suggestion.priority === 'high' ? 'border-red-200 bg-red-50/50 hover:bg-red-50' :
                suggestion.priority === 'medium' ? 'border-yellow-200 bg-yellow-50/50 hover:bg-yellow-50' :
                'border-green-200 bg-green-50/50 hover:bg-green-50'
              }`}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-2 text-base">{suggestion.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{suggestion.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                    suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {suggestion.priority === 'high' ? 'High Priority' :
                     suggestion.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                  </span>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all duration-200 hover:shadow-lg hover:scale-105 ml-4 whitespace-nowrap">
                {suggestion.action}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Trending Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-semibold text-slate-900">Trending Skills</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-4 p-5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <skill.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 text-lg">{skill.name}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium text-sm">{skill.growth}</span>
                  </div>
                  <span className="text-slate-400">•</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    skill.demand === 'Very High' ? 'bg-red-100 text-red-700 border border-red-200' :
                    skill.demand === 'High' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                    'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}>
                    {skill.demand} Demand
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}