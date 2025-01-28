import React, { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import {
  updateUser,
  deleteUser,
  getUserDataById,
} from "../../services/userService";
const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "*********", // Default value for password when in read-only mode
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      setIsEditing(false);
  
      const userId = localStorage.getItem("userId");
  
      if (!userId) {
        console.error("User ID is not available in localStorage.");
        return;
      }
  
      const result = await updateUser(userId, user);
  
      if (result.success) {
        console.log("User updated successfully:", result.data);
        // Optionally, update local state or UI with the new user data
      } else {
        console.error("Error updating user:", result.error.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };
  

  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    try {
      const userId = localStorage.getItem("userId");
  
      if (!userId) {
        console.error("User ID is not available in localStorage.");
        return;
      }
  
      const result = await deleteUser(userId);
  
      if (result.success) {
        console.log("User deleted successfully:", result.data);
        navigate("/");
      } else {
        console.error("Error deleting user:", result.error.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          navigate('/');
          return;
        }

        const res = await getUserDataById(userId);
        setUser({ ...res, password: "" });
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate('/');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.userPageContainer}>
      <div className={styles["profile-container"]}>
        <h1>User Profile</h1>
        <form>
          <div className={styles["input-box"]}>
            <input
              name="name"
              value={user.name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
              readOnly={!isEditing}
            />
            <FaUser className={styles.icon} />
          </div>
          <div className={styles["input-box"]}>
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              readOnly={!isEditing}
            />
            <FaEnvelope className={styles.icon} />
          </div>
          <div className={styles["input-box"]}>
            <input
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              type="tel"
              placeholder="Phone Number"
              readOnly={!isEditing}
            />
            <FaPhone className={styles.icon} />
          </div>
          <div className={styles["input-box"]}>
            <input
              name="password"
              value={isEditing ? user.password : "********"}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              readOnly={!isEditing}
            />
            <FaLock className={styles.icon} />
          </div>

          <div className={styles["action-buttons"]}>
            {isEditing ? (
              <button type="button" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button type="button" onClick={handleEditClick}>
                Edit
              </button>
            )}
            <button
              type="button"
              onClick={handleDeleteClick}
              className={styles["delete-btn"]}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
