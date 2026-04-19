const BASE = `${import.meta.env.VITE_URL || "http://localhost:5000"}/api/auth`;

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

export const completeOnboardingCall = (data, token) =>
  fetch(`${BASE}/onboarding`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const updateProfilePicture = (formData, token) =>
  fetch(`${BASE}/profile-picture`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((r) => r.json());
