const BASE = `${import.meta.env.VITE_URL || "http://localhost:5000"}/api/requests`;

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

export const createRequest = (data, token) => post(`${BASE}`, data, token);
export const getRequests = (filters = {}, token) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  return get(`${BASE}?${params.toString()}`, token);
};
export const getRequestById = (id, token) => get(`${BASE}/${id}`, token);
export const updateRequestStatus = (id, status, token) => patch(`${BASE}/${id}/status`, { status }, token);
export const getMyRequests = (token) => get(`${BASE}/my`, token);