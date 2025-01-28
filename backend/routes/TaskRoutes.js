const express = require("express");

const {
  addTask,
  removeTask,
  updateTask,
  getTask,
  searchTasks,
} = require("../controllers/TaskController");

const { authenticateUser } = require("../middleware/AuthenticateUser");

const router = express.Router();

router.post("/add", addTask);

router.get("/select", getTask);

router.get("/search", authenticateUser, searchTasks);

router.delete("/remove", removeTask);

router.put("/edit", updateTask);

module.exports = router;
