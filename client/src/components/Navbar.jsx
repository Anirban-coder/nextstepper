import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dashboardPath = user?.role === "teacher" ? "/teacher-dashboard" : "/dashboard";
  const userLabel = user?.name || user?.fullName || user?.email || "Learner";
  const initials = userLabel
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "N";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="site-nav-wrap">
      <nav className="site-nav">
        <Link to="/" className="site-brand">
          <span className="site-brand-mark">N</span>
          <span className="site-brand-copy">
            <span className="site-brand-name">NextStepper</span>
            <span className="site-brand-tag">Learning with momentum</span>
          </span>
        </Link>

        <div className="site-nav-links">
          {!user && (
            <>
              <NavLink to="/login" className={({ isActive }) => `site-nav-link${isActive ? " active" : ""}`}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => `site-nav-link${isActive ? " active" : ""}`}>
                Register
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink to={dashboardPath} className={({ isActive }) => `site-nav-link${isActive ? " active" : ""}`}>
                Dashboard
              </NavLink>
              <NavLink to="/careers" className={({ isActive }) => `site-nav-link${isActive ? " active" : ""}`}>
                Careers
              </NavLink>
              <NavLink to="/analytics" className={({ isActive }) => `site-nav-link${isActive ? " active" : ""}`}>
                Analytics
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => `site-nav-link${isActive ? " active" : ""}`}>
                Profile
              </NavLink>
              <div className="site-nav-user">
                <span className="site-nav-avatar">{initials}</span>
                <span className="site-nav-user-copy">
                  <span className="site-nav-user-name">{userLabel}</span>
                  <span className="site-nav-user-role">{user?.role || "member"}</span>
                </span>
              </div>
              <button onClick={handleLogout} className="site-nav-logout">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
