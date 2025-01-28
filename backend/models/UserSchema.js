const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phone number"],
    match: [/^[0-9]+$/, "Please provide a valid phone number"],
  },
  toDoList: [
    {
      title: {
        type: String,
        required: [true, "Please enter a title"],
      },
      description: {
        type: String,
      },
      status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
      },
      dueDate: {
        type: Date,
        required: [true, "Please provide a due date"],
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
