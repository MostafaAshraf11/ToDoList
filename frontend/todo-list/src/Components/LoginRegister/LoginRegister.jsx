import React, { useState } from "react";
import styles from "./LoginRegister.module.css"; // Import the CSS Module
import { FaUser, FaLock, FaEnvelope, FaPhone, FaUnlock } from "react-icons/fa";
import { register, login } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LoginRegister = () => {
  const [action, setAction] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleRegisterClick = async (e) => {
    e.preventDefault();

    const sendData = {
      name: user.name,
      email: user.email,
      password: user.password,
      phoneNumber: user.phone,
    };

    try {
      const result = await register(sendData); // Await the register function
      toast.success("Registration successful!");
      loginLink();
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();

    const sendData = {
      email: user.email,
      password: user.password,
    };

    try {
      const res = await login(sendData);

      if (res.token) {
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error("Incorrect email or password");
      }
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const registerLink = () => {
    setAction("active");
    setIsPasswordVisible(false);
    setUser({ email: "", password: "", name: "", phone: "" });
  };

  const loginLink = () => {
    setAction("");
    setIsPasswordVisible(false);
    setUser({ email: "", password: "", name: "", phone: "" });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  return (
    <div className={styles.LoginRegisterContainer}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className={`${styles.wrapper} ${styles[action]}`}>
        <div className={styles["form-box"] + " " + styles.login}>
          <form action="">
            <h1>Login</h1>
            <div className={styles["input-box"]}>
              <input
                name="email"
                value={user.email}
                type="email"
                placeholder="E-mail"
                required
                onChange={handleChange}
              />
              <FaEnvelope className={styles.icon} />
            </div>
            <div className={styles["input-box"]}>
              <input
                name="password"
                value={user.password}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                required
                onChange={handleChange}
              />
              <span className={styles.icon} onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <FaUnlock /> : <FaLock />}
              </span>
            </div>
            <button type="submit" onClick={handleLoginClick}>
              Login
            </button>
            <div className={styles["register-link"]}>
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={registerLink}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className={styles["form-box"] + " " + styles.register}>
          <form action="">
            <h1>Registration</h1>
            <div className={styles["input-box"]}>
              <input
                name="name"
                value={user.name}
                type="text"
                placeholder="name"
                onChange={handleChange}
                required
              />
              <FaUser className={styles.icon} />
            </div>
            <div className={styles["input-box"]}>
              <input
                name="email"
                value={user.email}
                type="email"
                placeholder="E-mail"
                onChange={handleChange}
                required
              />
              <FaEnvelope className={styles.icon} />
            </div>

            <div className={styles["input-box"]}>
              <input
                name="phone"
                value={user.phone}
                type="tel"
                placeholder="Phone Number"
                pattern="[0-9]*"
                onChange={handleChange}
                required
              />
              <FaPhone className={styles.icon} />
            </div>
            <div className={styles["input-box"]}>
              <input
                name="password"
                value={user.password}
                onChange={handleChange}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                required
              />
              <span className={styles.icon} onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <FaUnlock /> : <FaLock />}
              </span>
            </div>
            <button type="submit" onClick={handleRegisterClick}>
              Register
            </button>
            <div className={styles["register-link"]}>
              <p>
                Already have an account?{" "}
                <a href="#" onClick={loginLink}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
