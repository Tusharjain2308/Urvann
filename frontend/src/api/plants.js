// src/api/plants.js
import { BASE_URL } from "./config.js";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const headers = {
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
};

// 👉 1. Public: search + filter
export const getPlants = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/api/plants/search?${params}`, {
    headers,
  });
  if (!res.ok) throw new Error("Failed to fetch plants");
  return res.json();
};

// 👉 Admin: add
export const addPlant = async (plant) => {
  if (role !== "admin") throw new Error("Unauthorized");
  const payload = { ...plant, categories: plant.categories || [] }; // always array
  const res = await fetch(`${BASE_URL}/api/plants/addplant`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to add plant");
  return res.json();
};

// 👉 Admin: update
export const updatePlant = async (id, plant) => {
  if (role !== "admin") throw new Error("Unauthorized");
  const payload = { ...plant, categories: plant.categories || [] };
  const res = await fetch(`${BASE_URL}/api/plants/updateplant/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update plant");
  return res.json();
};

// 👉 4. Admin: delete
export const deletePlant = async (id) => {
  if (role !== "admin") throw new Error("Unauthorized");
  const res = await fetch(`${BASE_URL}/api/plants/deleteplant/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete plant");
  return res.json();
};
