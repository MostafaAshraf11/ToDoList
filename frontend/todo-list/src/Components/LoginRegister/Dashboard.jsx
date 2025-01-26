import React from "react";

const Dashboard = () => {
  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div>
        <input type="text" placeholder="Enter a task" />
        <button className="add-button">Add</button>
      </div>
    </div>
  );
};

export default Dashboard;
