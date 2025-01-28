const User = require("../models/UserSchema");

async function addTask(req, res) {
  try {
    const { title, description, dueDate, status } = req.body;
    const id = req.query.id;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required fields: No user ID provided" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTask = {
      title,
      description,
      status: status, // Default to 'pending' if not provided
      dueDate: dueDate ? dueDate : Date.now(),
    };

    user.toDoList.push(newTask);
    await user.save();

    const createdTask = user.toDoList[user.toDoList.length - 1];

    res.status(201).json({
      message: "Task added successfully",
      task: createdTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding task",
      error: error.message || "Unknown error occurred",
    });
  }
}

async function getTask(req, res) {
  try {
    const id = req.query.id;
    const taskId = req.query.taskId;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required fields: No user ID provided" });
    }
    if (!taskId) {
      return res
        .status(400)
        .json({ message: "Missing required fields: No task ID provided" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = user.toDoList.id(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task retrieved successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing task",
      error: error.message || "Unknown error occurred",
    });
  }
}

async function searchTasks(req, res) {
  try {
    const id = req.query.id;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search?.trim() || "";
    const status = req.query.status?.trim().toLowerCase();

    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required fields: No user ID provided" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let filteredTasks = user.toDoList;

    if (search) {
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) {
      if (!["pending", "completed"].includes(status)) {
        return res.status(400).json({
          message: 'Invalid status value. Use "pending" or "completed".',
        });
      }
      filteredTasks = filteredTasks.filter(
        (task) => task.status.toLowerCase() === status
      );
    }

    const totalTasks = filteredTasks.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    res.status(200).json({
      message: "Tasks retrieved successfully",
      totalTasks,
      tasks: filteredTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tasks",
      error: error.message || "Unknown error occurred",
    });
  }
}

async function removeTask(req, res) {
  try {
    const id = req.body.id;
    const taskId = req.body.taskId;

    if (!taskId) {
      return res
        .status(400)
        .json({ message: "Missing required fields: No task ID provided" });
    }
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required fields: No user ID provided" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { toDoList: { _id: taskId } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Task removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing task",
      error: error.message || "Unknown error occurred",
    });
  }
}

async function updateTask(req, res) {
  try {
    const id = req.body.id;
    const taskId = req.body.taskId;
    const { title, description, status, dueDate } = req.body;

    if (!taskId) {
      return res
        .status(400)
        .json({ message: "Missing required fields: No task ID provided" });
    }
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required fields: No user ID provided" });
    }

    const updateFields = {};
    if (title) updateFields["toDoList.$.title"] = title;
    if (description) updateFields["toDoList.$.description"] = description;
    if (status) updateFields["toDoList.$.status"] = status;
    if (dueDate) updateFields["toDoList.$.dueDate"] = dueDate;

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided to update" });
    }

    const user = await User.updateOne(
      { _id: id, "toDoList._id": taskId },
      { $set: updateFields },
      { new: true }
    );
    if (user.modifiedCount === 0) {
      return res.status(404).json({ message: "Not Updated" });
    }

    res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing task",
      error: error.message || "Unknown error occurred",
    });
  }
}

module.exports = {
  addTask,
  removeTask,
  updateTask,
  getTask,
  searchTasks,
};
