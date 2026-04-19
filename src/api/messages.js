const BASE = `${import.meta.env.VITE_URL || "http://localhost:5000"}/api/messages`;

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

// Get all conversations
export const getConversations = (token) => get(`${BASE}/conversations`, token);

// Get or create conversation with user
export const getConversation = (recipientId, token) =>
  get(`${BASE}/conversations/${recipientId}`, token);

// Get messages for a conversation
export const getMessages = (conversationId, token) =>
  get(`${BASE}/${conversationId}/messages`, token);

// Send message
export const sendMessage = (conversationId, content, token) =>
  post(`${BASE}/${conversationId}/send`, { content }, token);

// Mark message as read
export const markMessageAsRead = (messageId, token) =>
  patch(`${BASE}/${messageId}/read`, {}, token);

// Mark conversation as read
export const markConversationAsRead = (conversationId, token) =>
  patch(`${BASE}/${conversationId}/mark-read`, {}, token);
