const BASE = `${import.meta.env.VITE_URL || "http://localhost:5000"}/api/notifications`;

const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

const post = (url, body, token) =>
  fetch(url, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(body),
  }).then((r) => r.json());

const get = (url, token) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

const patch = (url, body, token) =>
  fetch(url, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify(body),
  }).then((r) => r.json());

const del = (url, token) =>
  fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

// Get notifications
export const getNotifications = (filter = "all", token) => {
  const url = filter && filter !== "all" ? `${BASE}?filter=${filter}` : BASE;
  return get(url, token);
};

// Create notification
export const createNotification = (data, token) => post(BASE, data, token);

// Mark notification as read
export const markNotificationAsRead = (notificationId, token) =>
  patch(`${BASE}/${notificationId}/read`, {}, token);

// Mark all notifications as read
export const markAllNotificationsAsRead = (token) =>
  patch(`${BASE}/mark-all/read`, {}, token);

// Delete notification
export const deleteNotification = (notificationId, token) =>
  del(`${BASE}/${notificationId}`, token);

// Get leaderboard
export const getLeaderboard = (timeframe = "month", token) =>
  get(`${BASE}/leaderboard/top?timeframe=${timeframe}`, token);

// Get user statistics
export const getUserStats = (token) => get(`${BASE}/stats/user`, token);

// Get AI insights
export const getAIInsights = (token) => get(`${BASE}/insights/ai`, token);
