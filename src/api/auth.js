const BASE = "http://localhost:5000/api/auth";

const post = (url, body) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json());

export const registerUser = (data) => post(`${BASE}/register`, data);
export const loginUser = (data) => post(`${BASE}/login`, data);

export const getMe = (token) =>
  fetch(`${BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());
