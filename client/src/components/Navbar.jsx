import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* LOGO */}
      <Link to="/" style={{ fontWeight: "bold", fontSize: "18px" }}>
        NextStepper
      </Link>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", gap: "16px" }}>
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <div>
          <Link to="/dashboard" style={{ marginRight: "12px" }}>
            Dashboard
          </Link>
          <Link to="/careers" style={{ marginRight: "12px" }}>
            Careers
          </Link>
          <Link to="/analytics" style={{ marginRight: "12px" }}>
            Analytics
          </Link>
          <Link to="/profile" style={{ marginRight: "12px" }}>
            Profile
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
