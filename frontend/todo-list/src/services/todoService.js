import axios from "axios";

export const fetchTasksDetails = async (
  userId,
  { search = "", status = "", page = 1, limit = 10 } = {}
) => {
  try {
    // Build the query string dynamically
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

    const response = await axios.get(url);

    if (response.status === 200) {
      console.log("Tasks retrieved successfully:", response.data);
      return response.data; // Return the retrieved data for further use
    } else {
      console.error("Failed to retrieve tasks:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching task details:", error.message);
    throw new Error("Could not fetch task details. Please try again.");
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
    throw new Error("Could not add task. Please try again.");
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
    throw new Error("Could not remove task. Please try again.");
  }
};

export const updateTask = async (
  userId,
  taskId,
  { title, description, status, dueDate }
) => {
  try {
    console.log("input :", userId, taskId, {
      title,
      description,
      status,
      dueDate,
    });
    const url = "http://localhost:5000/task/edit";

    // Create the request body
    const body = {
      id: userId,
      taskId: taskId,
      title,
      description,
      status,
      dueDate,
    };

    // Send PUT request to update the task
    const response = await axios.put(url, body);

    if (response.status === 200) {
      console.log("Task updated successfully:", response.data);
      return response.data; // Return the updated task response
    } else {
      console.error("Failed to update task:", response.statusText);
      return null; // Return null if update fails
    }
  } catch (error) {
    console.error("Error updating task:", error.message);
    throw new Error("Could not update task. Please try again.");
  }
};
