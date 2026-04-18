import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import CreateRequest from "./pages/CreateRequest";
import RequestDetail from "./pages/RequestDetail";
import Messages from "./pages/Messages";
import Leaderboard from "./pages/Leaderboard";
import AiCenter from "./pages/AiCenter";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Home from "./Home";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout page="dashboard">
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <DashboardLayout page="feed">
                  <Feed />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai-center"
            element={
              <ProtectedRoute>
                <DashboardLayout page="ai-center">
                  <AiCenter />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <DashboardLayout page="notifications">
                  <Notifications />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout page="profile">
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <DashboardLayout page="admin">
                  <Admin />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-request"
            element={
              <ProtectedRoute>
                <DashboardLayout page="create-request">
                  <CreateRequest />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/request/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout page="request-detail">
                  <RequestDetail />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <DashboardLayout page="messages">
                  <Messages />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <DashboardLayout page="leaderboard">
                  <Leaderboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
