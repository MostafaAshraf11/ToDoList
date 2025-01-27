import LoginRegister from "./Components/LoginRegister/LoginRegister";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/ToDoList/NavBar";
import UserProfile from "./Components/ToDoList/UserProfile";
import TodoApp from "./Components/ToDoList/TodoApp";
//<Route path="/" element={<LoginRegister />} />

function App() {
  return (
    <Router>
      {/* The NavBar is only rendered for routes that are not the login page */}
      <Routes>
        {/* Login page should be outside the navbar */}
        <Route path="/" element={<LoginRegister />} />

        {/* NavBar will be rendered on these pages */}
        <Route
          path="/home"
          element={
            <>
              <NavBar />
              <TodoApp />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <NavBar />
              <UserProfile />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
