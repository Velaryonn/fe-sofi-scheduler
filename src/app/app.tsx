
"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import Overview from "@/components/Overview";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navigation Bar */}
        <nav className="w-full flex justify-between items-center px-10 py-5 bg-white shadow-md">
          <h1 className="text-xl font-bold text-gray-800">Sofi Scheduler</h1>
          <div className="space-x-4">
            <Link to="/" className="text-gray-800 hover:underline">Home</Link>
            <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Dashboard</Link>
            <Link to="/overview" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Overview</Link>

          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/overview" element={<Overview />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
