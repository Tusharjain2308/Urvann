import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/auth");
  };

  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center shadow-md">
      <div className="font-bold text-xl">
        <Link to="/">Urvann</Link>
      </div>
      <div className="space-x-4">
        {token && (
          <>
            <Link to="/catalog" className="hover:underline">Catalog</Link>
            {role === "admin" && (
              <Link to="/admin/add-plant" className="hover:underline">Add Plant</Link>
            )}
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
              Logout
            </button>
          </>
        )}
        {!token && (
          <Link to="/auth" className="hover:underline">Login / Register</Link>
        )}
      </div>
    </nav>
  );
}
