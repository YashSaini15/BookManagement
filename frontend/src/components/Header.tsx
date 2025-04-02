import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import toastMessages, { toastStyle } from "../config/toastMessages";
import "../styles/Header.css";

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      toast.success(toastMessages.logout.success, toastStyle.success);
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message || toastMessages.logout.error, toastStyle.error);
    }
  };
  return (
    <header className="app-header">
      <h1>Book Management App</h1>
      <nav>
        <NavLink to="/" end style={{ marginRight: "1rem" }}>
          Book List
        </NavLink>
        <NavLink to="/add">Add Book</NavLink>
        {user && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
