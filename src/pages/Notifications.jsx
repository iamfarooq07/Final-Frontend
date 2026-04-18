import { useState } from "react";
import { motion } from "framer-motion";

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "request",
      title: "New help request in React category",
      message: "Someone posted a React component optimization request",
      timestamp: "2 minutes ago",
      read: false,
      icon: "📋"
    },
    {
      id: 2,
      type: "help",
      title: "Your request was answered!",
      message: "John Doe helped with your Node.js API issue",
      timestamp: "1 hour ago",
      read: false,
      icon: "🤝"
    },
    {
      id: 3,
      type: "system",
      title: "AI Suggestion: Improve your profile",
      message: "Add more skills to get better request matches",
      timestamp: "3 hours ago",
      read: true,
      icon: "🤖"
    },
    {
      id: 4,
      type: "update",
      title: "Request status updated",
      message: "Your React help request is now in progress",
      timestamp: "1 day ago",
      read: true,
      icon: "🔄"
    },
    {
      id: 5,
      type: "achievement",
      title: "New badge unlocked!",
      message: "You've earned the 'Fast Responder' badge",
      timestamp: "2 days ago",
      read: true,
      icon: "🏅"
    }
  ]);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    if (filter === "system") return notification.type === "system" || notification.type === "achievement";
    return notification.type === filter;
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const typeColors = {
    request: "bg-blue-100 text-blue-600",
    help: "bg-green-100 text-green-600",
    system: "bg-purple-100 text-purple-600",
    update: "bg-yellow-100 text-yellow-600",
    achievement: "bg-orange-100 text-orange-600"
  };

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "request", label: "Requests" },
    { value: "help", label: "Help" },
    { value: "system", label: "System" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-600">Stay updated with your community activity</p>
        </div>
        <button
          onClick={markAllAsRead}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Mark All as Read
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === option.value
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">No notifications found.</p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                notification.read
                  ? "bg-white border-slate-200 hover:bg-slate-50"
                  : "bg-blue-50 border-blue-200 hover:bg-blue-100"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${typeColors[notification.type]}`}>
                {notification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-slate-900">{notification.title}</h3>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                <span className="text-xs text-slate-500">{notification.timestamp}</span>
              </div>
              <div className="flex-shrink-0">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[notification.type]}`}>
                  {notification.type}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}