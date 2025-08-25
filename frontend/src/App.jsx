import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthPage from './pages/AuthPage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const location = useLocation();

  // Sync with localStorage when it changes
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, [location.pathname]); 

  const isLoggedIn = !!token;
  const isAdmin = role === "admin";

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/catalog"
        element={isLoggedIn ? <CatalogPage /> : <Navigate to="/auth" />}
      />

      <Route
        path="/admin-dashboard"
        element={isLoggedIn && isAdmin ? <AdminDashboard /> : <Navigate to="/auth" />}
      />
    </Routes>
  );
}
