import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaUser } from "react-icons/fa";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Todo List</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/user" className="nav-link">
          <FaUser />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
