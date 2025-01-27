import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import styles from "./Navbar.module.css";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage items
    console.log(
      "before:  token : ",
      localStorage.getItem("token"),
      "UserId :",
      localStorage.getItem("userId")
    );
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    console.log(
      "After:  token : ",
      localStorage.getItem("token"),
      "UserId :",
      localStorage.getItem("userId")
    );

    // Redirect to home/login page
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-brand"]}>
        <Link style={{ color: "white" }} to="/home">
          Todo List
        </Link>
      </div>
      <div className={styles["navbar-links"]}>
        <Link to="/user" className={styles["nav-link"]}>
          <FaUser color="white" />
        </Link>
        <button onClick={handleLogout} className={styles["nav-link"]}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
