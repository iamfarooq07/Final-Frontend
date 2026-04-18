import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;

  if (!user) return <Navigate to="/home" replace />;

  // If user is logged in but hasn't completed onboarding
  if (!user.hasCompletedOnboarding) {
    // If trying to access dashboard, redirect to onboarding
    if (location.pathname === "/dashboard") {
      return <Navigate to="/onboarding" replace />;
    }
    // Allow access to onboarding
  } else {
    // If user has completed onboarding
    // If trying to access onboarding, redirect to dashboard
    if (location.pathname === "/onboarding") {
      return <Navigate to="/dashboard" replace />;
    }
    // Allow access to dashboard
  }

  return children;
}
