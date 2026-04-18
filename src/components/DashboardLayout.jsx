import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout({ page, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Explore Feed", path: "/feed", icon: "🔍" },
    { name: "Create Request", path: "/create-request", icon: "➕" },
    { name: "Messages", path: "/messages", icon: "💬" },
    { name: "Leaderboard", path: "/leaderboard", icon: "🏆" },
    { name: "AI Center", path: "/ai-center", icon: "🤖" },
    { name: "Notifications", path: "/notifications", icon: "🔔" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-100 shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-50">
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter">
            Help<span className="text-blue-600 italic">lytics</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.fullName || "User"}
              </p>
              <p className="text-xs text-slate-500">{user?.role || "Role"}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
          >
            <span>⚙️</span>
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-100 shadow-sm flex items-center justify-between px-6">
          <h2 className="text-xl font-bold text-slate-900 capitalize">
            {page.replace("-", " ")}
          </h2>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
              />
            </div>
            {/* Notifications */}
            <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
              🔔
            </button>
            {/* Profile Dropdown */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}