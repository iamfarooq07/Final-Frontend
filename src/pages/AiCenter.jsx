import { useState } from "react";
import { motion } from "framer-motion";

export default function AiCenter() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Dummy data
  const insights = [
    {
      type: "activity",
      title: "You are most active in React & Node.js help requests",
      description: "You've helped 12 users this week in these areas",
      icon: "📈",
      color: "bg-blue-100 text-blue-600"
    },
    {
      type: "performance",
      title: "Your response rate is 2x above average",
      description: "You typically respond within 30 minutes",
      icon: "⚡",
      color: "bg-green-100 text-green-600"
    },
    {
      type: "suggestion",
      title: "Suggested focus: AI / Backend requests",
      description: "High demand skills with fewer helpers available",
      icon: "🎯",
      color: "bg-purple-100 text-purple-600"
    },
    {
      type: "trend",
      title: "Platform trend: AI/ML skills growing 45%",
      description: "Consider learning AI/ML for better matching",
      icon: "🚀",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const suggestions = [
    {
      title: "Answer 3 pending React requests",
      description: "High urgency requests waiting for your expertise",
      action: "View Requests",
      priority: "high"
    },
    {
      title: "Complete your profile with AI skills",
      description: "Add AI/ML to your skills for better matching",
      action: "Update Profile",
      priority: "medium"
    },
    {
      title: "Help in DevOps category",
      description: "Only 2 active helpers, high demand",
      action: "Explore DevOps",
      priority: "low"
    }
  ];

  const trendingSkills = [
    { name: "React", growth: "+45%", demand: "High", icon: "⚛️" },
    { name: "Node.js", growth: "+32%", demand: "High", icon: "🟢" },
    { name: "AI/ML", growth: "+67%", demand: "Very High", icon: "🤖" },
    { name: "DevOps", growth: "+28%", demand: "Medium", icon: "🐳" },
    { name: "TypeScript", growth: "+23%", demand: "High", icon: "🔷" },
    { name: "Python", growth: "+41%", demand: "High", icon: "🐍" }
  ];

  const priorityColors = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-green-100 text-green-700 border-green-200"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Center</h1>
          <p className="text-slate-600">Your personalized AI insights and recommendations</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
      </div>

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${insight.color}`}>
                {insight.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-2">{insight.title}</h3>
                <p className="text-sm text-slate-600">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-4">AI Recommendations</h2>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-xl border ${priorityColors[suggestion.priority]}`}>
              <div className="flex-1">
                <h3 className="font-medium text-slate-900 mb-1">{suggestion.title}</h3>
                <p className="text-sm text-slate-600">{suggestion.description}</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                {suggestion.action}
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Trending Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Trending Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <span className="text-2xl">{skill.icon}</span>
              <div className="flex-1">
                <h3 className="font-medium text-slate-900">{skill.name}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 font-medium">{skill.growth}</span>
                  <span className="text-slate-500">•</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    skill.demand === 'Very High' ? 'bg-red-100 text-red-700' :
                    skill.demand === 'High' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {skill.demand}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}