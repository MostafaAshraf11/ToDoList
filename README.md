# ToDoList - MERN Stack Application

A full-stack todo list application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Project Structure
- `backend/`: Contains the server-side code with API endpoints.
- `frontend/`: Contains the client-side React application.

## Prerequisites
Before running the application, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance
- [Git](https://git-scm.com/)

## Environment Setup

### Backend Configuration
Create a `.env` file in the `backend` directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string or local MongoDB URI.
Replace `your_jwt_secret_key` with a secure random string for JWT token generation.

## Installation & Setup

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend
cd todo-list

# Install dependencies
npm install

# If react-router is missing, install them manually
npm install react-router-dom 

# Start the development server
npm start
```

The application should now be running with:
- Backend server on: `http://localhost:5000`
- Frontend application on: `http://localhost:3000`

## Dependencies

### Backend Dependencies
- Express.js
- Mongoose
- JSON Web Token (JWT)
- dotenv
- cors
- bcryptjs

### Frontend Dependencies
- React
- React Router DOM
- Axios

## Features
- User authentication (signup/login)
- Create, read, update, and delete todos
- JWT-based authentication
