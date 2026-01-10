import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Careers from "./pages/Careers";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/careers"
          element={
            <ProtectedRoute>
              <Careers />
            </ProtectedRoute>
          }
        />

        {/* Placeholder */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <h2 style={{ padding: "20px" }}>Student Info (Coming Soon)</h2>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
