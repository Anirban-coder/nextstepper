import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";         // Student View
import TeacherDashboard from "./pages/teachersDashboard"; // Teacher View
import CareersPage from "./pages/CareerPages";
import Profile from "./pages/Profile";
import CreateCourse from "./pages/CreateCourse";
import Analytics from "./pages/Analytics";
// Layout for Logged In Users
const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user?.token) return <Navigate to="/login" replace />;

  return (
    <>
      <Navbar />
      <div className="app-shell">
        <Outlet /> 
      </div>
    </>
  );
};

// Helper: Redirect to the correct dashboard based on Role
const HomeRedirect = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.role === "teacher") return <Navigate to="/teacher-dashboard" replace />;
  return <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route element={<ProtectedLayout />}>
            {/* Smart Redirect: Goes to Teacher or Student Dashboard */}
            <Route path="/" element={<HomeRedirect />} />

            <Route path="/dashboard" element={<Dashboard />} /> {/* Student */}
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} /> {/* Teacher */}
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
