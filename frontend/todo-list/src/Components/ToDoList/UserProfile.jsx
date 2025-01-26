import React, { useState } from "react";
import "./UserProfile.css";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    password: "*********", // Default value for password when in read-only mode
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log("User data saved:", user);
  };

  const handleDeleteClick = () => {
    // Logic to delete user can go here
    console.log("User deleted");
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <form>
        <div className="input-box">
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            readOnly={!isEditing}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            readOnly={!isEditing}
          />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-box">
          <input
            name="phone"
            value={user.phone}
            onChange={handleChange}
            type="tel"
            placeholder="Phone Number"
            readOnly={!isEditing}
          />
          <FaPhone className="icon" />
        </div>
        <div className="input-box">
          <input
            name="password"
            value={isEditing ? "" : user.password} // Show password as empty or ********* based on isEditing
            onChange={handleChange}
            type="password"
            placeholder="Password"
            readOnly={!isEditing}
          />
          <FaLock className="icon" />
        </div>

        <div className="action-buttons">
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
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
