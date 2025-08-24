import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AuthPage from "./components/AuthForm.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/user" element={<AuthPage role="user" />} />
        <Route path="/auth/admin" element={<AuthPage role="admin" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
