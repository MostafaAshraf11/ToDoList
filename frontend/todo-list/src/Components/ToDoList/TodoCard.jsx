import React, { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { FaSave, FaCheckCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import styles from "./TodoCard.module.css"; // Importing the CSS module
import { updateTask } from "../../services/todoService";
import toast from "react-hot-toast"; // Importing toast for notifications

const TodoCard = ({ card, onDelete, onSave, isEditable }) => {
  const [isEditing, setIsEditing] = useState(isEditable || false); // Initialize with isEditable prop
  const [updatedCard, setUpdatedCard] = useState(card);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    if (card.isNew) {
      onSave(updatedCard);
      return;
    }
    setIsEditing(false);
    // Call the API to update the task
    const userId = localStorage.getItem("userId");
    try {
      const result = await updateTask(userId, updatedCard._id, updatedCard);
      if (result) {
        toast.success("Task updated successfully!");
      } else {
        console.log("No change to task, no update necessary.");
      }
    } catch (error) {
      toast.error("Could not update the task. Please try again.");
    }
  };

  const handleStatusClick = async () => {
    setUpdatedCard({
      ...updatedCard,
      status: updatedCard.status === "pending" ? "completed" : "pending",
    });

    // Call the API to update the status
    if (card.isNew) {
      return;
    }
    const userId = localStorage.getItem("userId");
    try {
      const result = await updateTask(userId, updatedCard._id, {
        ...updatedCard,
        status: updatedCard.status === "pending" ? "completed" : "pending",
      });
      if (result) {
        toast.success("Task status updated successfully!");
      } else {
        console.log("No change to task status, no update necessary.");
      }
    } catch (error) {
      toast.error("Could not update task status. Please try again.");
    }
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
      <div className={styles.cardHeaderContainer}>
        <p className={`${styles.todoStatus} ${cardStatusClass}`}>
          {updatedCard.status}
        </p>
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
      </div>

      <div className={styles.cardBody}>
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
            <h3 style={{ color: "#C0C0C0" }}>{updatedCard.title}</h3>
          )}
        </div>

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
            <p style={{ color: "#C0C0C0" }}>{updatedCard.description}</p>
          )}
        </div>

        <div className={styles.inputField}>
          <label>Due Date</label>
          {isEditing ? (
            <input
              type="date"
              name="dueDate"
              value={updatedCard.dueDate.split("T")[0]}
              onChange={handleChange}
            />
          ) : (
            <p style={{ color: "#C0C0C0" }}>
              {updatedCard.dueDate.split("T")[0]}
            </p>
          )}
        </div>

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
