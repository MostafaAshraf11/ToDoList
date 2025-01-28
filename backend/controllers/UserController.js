const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    const { name, phoneNumber, password } = req.body;
    const email = req.body.email.toLowerCase();

    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({
        message:
          "Missing required fields: name, email, or phone number or password",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({ name, email, phoneNumber, password: hash });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password,
        toDoList: user.toDoList,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "", error: error.message });
  }
}

async function login(req, res) {
  try {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Password is incorrect " });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        toDoList: user.toDoList,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getUserByEmail(req, res) {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message || "Unknown error occurred",
    });
  }
}

async function getUserById(req, res) {
  try {
    const id = req.query.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, phoneNumber } = user;

    res.status(200).json({ name, email, phoneNumber });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message || "Unknown error occurred",
    });
  }
}

async function updateUser(req, res) {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const id = req.query.id;

    // Trim spaces from inputs
    const trimmedName = name ? name.trim() : null;
    const trimmedEmail = email ? email.trim() : null;
    const trimmedPhoneNumber = phoneNumber ? phoneNumber.trim() : null;
    const trimmedPassword = password ? password.trim() : null;

    // Check if any required field is empty
    if (!trimmedName || !trimmedEmail || !trimmedPhoneNumber) {
      return res
        .status(400)
        .json({ message: "Cannot update with an empty field." });
    }

    // Validate the phoneNumber format using regex (only digits allowed)
    const phoneRegex = /^[0-9]+$/;
    if (trimmedPhoneNumber && !phoneRegex.test(trimmedPhoneNumber)) {
      return res.status(400).json({ message: "Invalid phone number format." });
    }

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (
      trimmedName === existingUser.name &&
      trimmedEmail === existingUser.email &&
      trimmedPhoneNumber === existingUser.phoneNumber &&
      (!trimmedPassword || trimmedPassword === existingUser.password)
    ) {
      return res.status(400).json({ message: "No change to the user." });
    }

    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (trimmedEmail !== existingUser.email) {
      const emailExists = await User.findOne({ email: trimmedEmail });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists." });
      }
    }

    const updateData = {};
    if (trimmedName) updateData.name = trimmedName;
    if (trimmedEmail) updateData.email = trimmedEmail;
    if (trimmedPhoneNumber) updateData.phoneNumber = trimmedPhoneNumber;

    if (trimmedPassword) {
      const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user.",
      error: error.message || "Unknown error occurred.",
    });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.query.id;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message || "Unknown error occurred",
    });
  }
}

module.exports = {
  register,
  getUserByEmail,
  updateUser,
  deleteUser,
  login,
  getUserById,
};
