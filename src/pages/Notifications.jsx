import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification
} from "../api/notifications";

export default function Notifications() {
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getNotifications(filter, user.token);
      setNotifications(data || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [filter, user.token]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const filteredNotifications = notifications;

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead(user.token);
      await fetchNotifications();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id, user.token);
      await fetchNotifications();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id, user.token);
      await fetchNotifications();
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
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
          onClick={handleMarkAllAsRead}
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        {loading ? (
          <div className="text-center p-8 text-slate-600">Loading notifications...</div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center p-8 text-slate-600">No notifications</div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                notification.read
                  ? "bg-white border-slate-200 hover:bg-slate-50"
                  : "bg-blue-50 border-blue-200 hover:bg-blue-100"
              }`}
              onClick={() => {
                if (!notification.read) {
                  handleMarkAsRead(notification._id);
                }
              }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${typeColors[notification.type] || 'bg-slate-100'}`}>
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
                <span className="text-xs text-slate-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(notification._id);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}