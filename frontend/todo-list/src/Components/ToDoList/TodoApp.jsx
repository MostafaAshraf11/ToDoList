import React, { useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import styles from "./TodoApp.module.css";
import { useNavigate } from "react-router-dom";
import {
  fetchTasksDetails,
  addTask,
  removeTask,
} from "../../services/todoService";
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const fetchData = { search: searchQuery, status: selectedFilters[0] };
        const res = await fetchTasksDetails(userId, fetchData);
        setTodos(res.tasks);
      } catch (error) {
        console.error("Error fetching task details:", error.message);
        navigate("/");
      }
    };
    fetchData();
  }, [searchQuery, selectedFilters]); // Runs whenever searchQuery or selectedFilters change

  // Search and Filter logic

  // Toggle filter logic for checkboxes
  const toggleFilter = (value) => {
    setSelectedFilters((prev) => {
      // If the checkbox is already selected, uncheck it (clear the filter)
      if (prev.includes(value)) {
        return [];
      }
      // Otherwise, set the selected filter to only this value
      return [value];
    });
  };

  // Add a new todo as the first item in the list
  const handleAddTodo = () => {
    const newTodo = {
      _id: Date.now(),
      title: "",
      description: "",
      status: "pending",
      dueDate: "",
      isNew: true, // Flag to indicate a newly added item
    };
    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
  };

  // Delete and Save handlers for cards
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos);

    //api call
    const deletedTodo = todos.filter((todo) => todo._id === id);
    if (deletedTodo[0].isNew) {
      return;
    }
    const userId = localStorage.getItem("userId");

    removeTask(userId, id);
  };

  const handleSave = async (updatedCard) => {
    //api call
    console.log("updatedcards", updatedCard);
    const userId = localStorage.getItem("userId");
    const result = await addTask(userId, updatedCard);
    const updatedTodos = [...todos];
    updatedTodos[0] = result.task;
    setTodos(updatedTodos);
  };
  return (
    <div className={styles.todoApp}>
      {/* Unified Search and Filter Form */}
      <form className={styles.searchForm}>
        {/* Search Field */}
        <input
          type="text"
          placeholder="Search for tasks..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Checkbox Filters */}
        <div className={styles.filterOptions}>
          <label>
            <input
              type="checkbox"
              value="pending"
              checked={selectedFilters.includes("pending")}
              onChange={() => toggleFilter("pending")}
            />
            Pending
          </label>
          <label>
            <input
              type="checkbox"
              value="completed"
              checked={selectedFilters.includes("completed")}
              onChange={() => toggleFilter("completed")}
            />
            Completed
          </label>
        </div>
      </form>

      {/* Add Component Button */}
      <button onClick={handleAddTodo} className={styles.addButton}>
        Add Task
      </button>

      {/* Displaying filtered todo cards in a grid layout */}
      <div className={styles.todosGrid}>
        {todos.map((todo) => (
          <TodoCard
            key={todo._id}
            card={todo}
            onDelete={handleDelete}
            onSave={handleSave}
            isEditable={todo.isNew || false}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
