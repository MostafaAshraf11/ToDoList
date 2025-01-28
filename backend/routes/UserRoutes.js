const express = require("express");
const {
  register,
  login,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/UserController");

const router = express.Router();
const { authenticateUser } = require("../middleware/AuthenticateUser");

router.post("/register", register);

router.post("/login", login);

router.get("/getDetails",getUserById);
router.put("/update",updateUser);

router.delete("/delete", deleteUser);

module.exports = router;
