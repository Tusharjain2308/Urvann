import { useNavigate } from "react-router-dom";

export default function BaseLayout({ title, subtitle, children, className }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
    window.location.reload();
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 ${className}`}
    >
      {/* Header Section */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-green-200 sticky top-0 z-20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-4xl font-serif font-extrabold text-gray-900 tracking-tight animate-slide-in-left">
                {title}
              </h1>
              {subtitle && (
                <p
                  className="text-lg text-gray-600 mt-1 animate-slide-in-left"
                  style={{ animationDelay: "0.2s" }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="relative px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 transform hover:scale-105"
            aria-label="Logout"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m5 4v-7a3 3 0 00-3-3H5"
                />
              </svg>
              Logout
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      {/* Floating Botanical Elements */}
      <div
        className="fixed top-10 left-5 text-5xl text-green-400/30 animate-float pointer-events-none"
        style={{ animationDuration: "4s" }}
      >
        🍃
      </div>
      <div
        className="fixed top-1/3 right-10 text-6xl text-emerald-400/30 animate-leaf-sway pointer-events-none"
        style={{ animationDuration: "5s", animationDelay: "0.5s" }}
      >
        🌿
      </div>
      <div
        className="fixed bottom-20 left-10 text-7xl text-teal-400/30 animate-float pointer-events-none"
        style={{ animationDuration: "6s", animationDelay: "1s" }}
      >
        🌱
      </div>
      <div
        className="fixed bottom-40 right-20 text-4xl text-green-300/30 animate-leaf-sway pointer-events-none"
        style={{ animationDuration: "4.5s", animationDelay: "1.5s" }}
      >
        🌸
      </div>
    </div>
  );
}
