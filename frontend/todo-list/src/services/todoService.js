import axios from "axios";

export const fetchTasksDetails = async (
  userId,
  { search = "", status = "", page = 1, limit = 10 } = {}
) => {
  try {
    const queryParams = new URLSearchParams({
      id: userId,
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      queryParams.append("search", search);
    }

    if (status) {
      queryParams.append("status", status.toLowerCase());
    }

    const url = `http://localhost:5000/task/search?${queryParams.toString()}`;

    const token = localStorage.getItem("token");

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log("Tasks retrieved successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to retrieve tasks:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching task details:", error.message);
    return {
      success: false,
      message: "Could not fetch task details. Please try again.",
    };
  }
};

export const addTask = async (userId, taskData) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/task/add?id=${userId}`,
      taskData
    );
    console.log("Task added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error.message);
    return { success: false, message: "Could not add task. Please try again." };
  }
};

export const removeTask = async (userId, taskId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/task/remove`, {
      data: { id: userId, taskId },
    });
    console.log("Task removed successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error removing task:", error.message);
    return {
      success: false,
      message: "Could not remove task. Please try again.",
    };
  }
};

export const updateTask = async (
  userId,
  taskId,
  { title, description, status, dueDate }
) => {
  try {
    console.log("input:", userId, taskId, {
      title,
      description,
      status,
      dueDate,
    });

    const url = "http://localhost:5000/task/edit";

    const body = {
      id: userId,
      taskId: taskId,
      title,
      description,
      status,
      dueDate,
    };

    const response = await axios.put(url, body);

    if (response.status === 200) {
      console.log("Task updated successfully:", response.data);
      return response.data; // Successfully updated
    } else if (response.status === 404) {
      console.log("Task not found, no update necessary.");
      return null;
    } else {
      console.error("Failed to update task:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error updating task:", error.message);
    return null;
  }
};
