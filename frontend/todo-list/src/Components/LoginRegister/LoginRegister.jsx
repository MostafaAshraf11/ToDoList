import React, { useState } from "react";
import "./LoginRegister.css";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaUnlock } from "react-icons/fa";

const LoginRegister = () => {
  const [action, setAction] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    console.log(e);
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
    <div className={`wrapper ${action}`}>
      <div className="form-box login">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input
              name="email"
              value={user.email}
              type="email"
              placeholder="E-mail"
              required
              onChange={handleChange}
            ></input>
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type={isPasswordVisible ? "text" : "password"} // Toggle input type based on password visibility
              placeholder="Password"
              required
            />
            <span className="icon" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <FaUnlock /> : <FaLock />}
            </span>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={registerLink}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="form-box register">
        <form action="">
          <h1>Registration</h1>
          <div className="input-box">
            <input type="text" placeholder="name" required></input>
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="email" placeholder="E-mail" required></input>
            <FaEnvelope className="icon" />
          </div>

          <div className="input-box">
            <input
              type="tel"
              placeholder="Phone Number"
              pattern="[0-9]*"
              required
            ></input>
            <FaPhone className="icon" />
          </div>
          <div className="input-box">
            <input
              type={isPasswordVisible ? "text" : "password"} // Toggle input type based on password visibility
              placeholder="Password"
              required
            />
            <span className="icon" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <FaUnlock /> : <FaLock />}
            </span>
          </div>
          <div className="terms-conditions">
            <label>
              <input type="checkbox" required></input>I accept the terms &
              conditions
            </label>
          </div>
          <button type="submit">Register</button>
          <div className="register-link">
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
  );
};

export default LoginRegister;
