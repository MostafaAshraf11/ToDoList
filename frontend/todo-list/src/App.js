import LoginRegister from "./Components/LoginRegister/LoginRegister";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "./Components/ToDoList/TodoList";
import NavBar from "./Components/ToDoList/NavBar";
import UserProfile from "./Components/ToDoList/UserProfile";
//<Route path="/" element={<LoginRegister />} />

function App() {
  return (
    <Router>
      {/* NavBar is always rendered */}
      <NavBar />

      {/* Define the routes */}
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/user" element={<UserProfile />} />
        {/* Add more routes as necessary */}
      </Routes>
    </Router>
  );
}

export default App;
