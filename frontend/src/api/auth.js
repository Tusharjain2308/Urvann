// api/auth.js
import { BASE_URL } from "./config.js";

export const register = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // role comes from formData
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // no role here
  });
  return res.json();
};
