import React, { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { FaSave, FaCheckCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import styles from "./TodoCard.module.css"; // Importing the CSS module
import { updateTask } from "../../services/todoService";

const TodoCard = ({ card, onDelete, onSave, isEditable }) => {
  const [isEditing, setIsEditing] = useState(isEditable || false); // Initialize with isEditable prop
  const [updatedCard, setUpdatedCard] = useState(card);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    if (card.isNew) {
      onSave(updatedCard);
      return;
    }
    setIsEditing(false);
    //call the api
    const userId = localStorage.getItem("userId");
    updateTask(userId, updatedCard._id, updatedCard);
  };

  const handleStatusClick = () => {
    setUpdatedCard({
      ...updatedCard,
      status: updatedCard.status === "pending" ? "completed" : "pending",
    });

    //call the api
    if (card.isNew) {
      return;
    }
    const userId = localStorage.getItem("userId");
    updateTask(userId, updatedCard._id, {
      ...updatedCard,
      status: updatedCard.status === "pending" ? "completed" : "pending",
    });
  };

  const handleDeleteClick = () => {
    onDelete(card._id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCard({ ...updatedCard, [name]: value });
  };

  // Apply dynamic classes based on the card's status
  const cardStatusClass =
    updatedCard.status === "completed" ? styles.completed : styles.pending;

  return (
    <div className={`${styles.todoCard} ${cardStatusClass}`}>
      <div className={styles.cardHeader}>
        {isEditing ? (
          <FaSave className={styles.icon} onClick={handleSaveClick} />
        ) : (
          <MdEdit className={styles.icon} onClick={handleEditClick} />
        )}
        <RiDeleteBin5Fill
          className={`${styles.icon} ${styles.delete}`}
          onClick={handleDeleteClick}
        />
      </div>

      <div className={styles.cardBody}>
        {/* Title */}
        <div className={styles.inputField}>
          <label>Title</label>
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={updatedCard.title}
              onChange={handleChange}
              placeholder="Title"
            />
          ) : (
            <h3>{updatedCard.title}</h3>
          )}
        </div>

        {/* Description */}
        <div className={styles.inputField}>
          <label>Description</label>
          {isEditing ? (
            <textarea
              name="description"
              value={updatedCard.description}
              onChange={handleChange}
              placeholder="Description"
            />
          ) : (
            <p>{updatedCard.description}</p>
          )}
        </div>

        {/* Due Date */}
        <div className={styles.inputField}>
          <label>Due Date</label>
          {isEditing ? (
            <input
              type="date"
              name="dueDate"
              value={updatedCard.dueDate.split("T")[0]} // Assuming dueDate is in ISO format
              onChange={handleChange}
            />
          ) : (
            <p>{updatedCard.dueDate.split("T")[0]}</p>
          )}
        </div>

        {/* Status */}
        <div className={styles.statusButton}>
          <button onClick={handleStatusClick}>
            {updatedCard.status === "pending" ? (
              <FaRegCircleCheck />
            ) : (
              <FaCheckCircle />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
