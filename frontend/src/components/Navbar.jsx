import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>BookStore</h2>

      <div className="nav-links">
        <NavLink
          to="/books"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Books
        </NavLink>

        <NavLink
          to="/authors"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Authors
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;