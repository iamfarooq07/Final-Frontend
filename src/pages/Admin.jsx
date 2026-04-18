import { useState } from "react";
import { motion } from "framer-motion";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("requests");

  // Dummy data
  const requests = [
    {
      id: 1,
      title: "React component optimization",
      user: "John Doe",
      status: "Active",
      category: "Frontend",
      createdAt: "2024-01-15",
      flagged: false
    },
    {
      id: 2,
      title: "Node.js API authentication",
      user: "Jane Smith",
      status: "Resolved",
      category: "Backend",
      createdAt: "2024-01-14",
      flagged: true
    },
    {
      id: 3,
      title: "Database schema design",
      user: "Bob Johnson",
      status: "Pending",
      category: "Database",
      createdAt: "2024-01-13",
      flagged: false
    }
  ];

  const analytics = {
    totalUsers: 1247,
    totalRequests: 892,
    activeRequests: 156,
    resolvedRequests: 736,
    averageResponseTime: "2.3 hours",
    topCategory: "Frontend"
  };

  const flaggedContent = [
    {
      id: 1,
      type: "request",
      content: "Inappropriate language in request",
      reportedBy: "User123",
      status: "Pending Review"
    },
    {
      id: 2,
      type: "message",
      content: "Spam message in chat",
      reportedBy: "User456",
      status: "Reviewed"
    }
  ];

  const tabs = [
    { id: "requests", label: "Manage Requests", icon: "📋" },
    { id: "content", label: "Moderate Content", icon: "🚩" },
    { id: "analytics", label: "Analytics", icon: "📊" }
  ];

  const statusColors = {
    Active: "bg-green-100 text-green-700",
    Resolved: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-slate-600">Manage platform content and monitor activity</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "requests" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">All Help Requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Request</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{request.title}</div>
                        <div className="text-sm text-slate-500">{request.createdAt}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{request.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{request.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[request.status]}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === "content" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Flagged Content</h2>
            <div className="space-y-4">
              {flaggedContent.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div>
                    <h3 className="font-medium text-slate-900">{item.content}</h3>
                    <p className="text-sm text-slate-600">Reported by: {item.reportedBy}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-900 text-sm">Review</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "analytics" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Users", value: analytics.totalUsers, icon: "👥" },
              { label: "Total Requests", value: analytics.totalRequests, icon: "📋" },
              { label: "Active Requests", value: analytics.activeRequests, icon: "🔄" },
              { label: "Resolved Requests", value: analytics.resolvedRequests, icon: "✅" }
            ].map((stat, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value.toLocaleString()}</h3>
                <p className="text-slate-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Average Response Time</span>
                  <span className="font-medium text-slate-900">{analytics.averageResponseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Top Category</span>
                  <span className="font-medium text-slate-900">{analytics.topCategory}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Activity Chart</h3>
              <div className="h-32 flex items-end justify-between">
                {[40, 60, 30, 80, 50, 70, 45].map((height, index) => (
                  <div key={index} className="flex-1 bg-blue-200 rounded-t mx-1" style={{ height: `${height}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}