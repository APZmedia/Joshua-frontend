import React from "react";
import Calendar from "../pages/Dashboard/Calendar";
import Posts from "../pages/Dashboard/Posts";
import Library from "../pages/Dashboard/Library";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Dashboard Header */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>

      {/* Dashboard Content */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
        
        {/* Config Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Config</h2>
          <p>Manage settings and preferences here.</p>
        </div>

        <Posts />
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          <p>View and manage your posts.</p>
        </div>
        <Calendar />

        <Library />
      </div>
    </div>
  );
};

export default Dashboard;
