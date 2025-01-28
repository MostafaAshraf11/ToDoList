import React, { useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import styles from "./TodoApp.module.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Importing react-hot-toast
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
        const token = localStorage.getItem("token");
        if (!userId || !token) {
          //toast.error("token expired. Redirecting to login...");
          navigate("/");
          return;
        }

        const fetchData = { search: searchQuery, status: selectedFilters[0] };
        const res = await fetchTasksDetails(userId, fetchData);

        if (!(res.message === "Tasks retrieved successfully")) {
          navigate("/");
          return;
        }

        setTodos(res.tasks);
      } catch (error) {
        navigate("/");
      }
    };

    fetchData();
  }, [searchQuery, selectedFilters, navigate]);

  const toggleFilter = (value) => {
    setSelectedFilters((prev) => {
      if (prev.includes(value)) {
        return [];
      }
      return [value];
    });
  };

  const handleAddTodo = () => {
    if (todos.length !== 0 && todos[0].isNew) {
      toast("You are already adding a new task!", { icon: "⚠️" });
      return;
    }
    const newTodo = {
      _id: Date.now(),
      title: "",
      description: "",
      status: "pending",
      dueDate: "",
      isNew: true,
    };
    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    toast("New task added! Fill out the details and save.", { icon: "📝" });
  };

  const handleDelete = async (id) => {
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos);

    const deletedTodo = todos.find((todo) => todo._id === id);
    if (deletedTodo.isNew) {
      toast("Unsaved task deleted.", { icon: "🗑️" });
      return;
    }
    const userId = localStorage.getItem("userId");

    try {
      await removeTask(userId, id);
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Error deleting task. Please try again.");
    }
  };

  const handleSave = async (updatedCard) => {
    const userId = localStorage.getItem("userId");
    try {
      const result = await addTask(userId, updatedCard);
      const updatedTodos = [...todos];
      updatedTodos[0] = result.task;
      setTodos(updatedTodos);
      toast.success("Task saved successfully!");
    } catch (error) {
      toast.error("Error saving task. Please try again.");
    }
  };

  return (
    <div className={styles.todoApp}>
      <Toaster position="top-right" reverseOrder={false} />

      <form className={styles.searchForm}>
        {/* Search Field */}
        <input
          type="text"
          placeholder="Search for tasks..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

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

      <button onClick={handleAddTodo} className={styles.addButton}>
        Add Task
      </button>

      <div className={styles.todosContainer}>
        <div className={styles.todosGrid}>
          {todos?.map((todo) => (
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
    </div>
  );
};

export default TodoApp;
