import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Auth/LoginPage';
// import AdminDashboard from './components/AdminDashboard';
// import DeveloperDashboard from './components/DeveloperDashboard';
import SupervisorDashboard from './pages/SupervisorDashboard';
import TaskDetails from './pages/TaskDetails';
import Sidebar from './pages/Sidebar';
import DevTasks from './components/DeveloperDashboard/DevTasks';


const MobileSidebar = () => {
  return (
    <div className="md:hidden w-full h-full bg-black/40 fixed top-0 left-0 z-50">
      {/* Static Sidebar (Always visible on mobile) */}
      <div className="bg-white w-3/4 h-full fixed top-0 left-0 shadow-lg z-60">
        <div className="overflow-y-auto">
          {/* Sidebar Content */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes here */}
        <Route path="/login" element={<LoginPage />} />
       
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} /> 
        <Route path="/developer-dashboard" element={<DevTasks />} /> 
        
        {/* Home route */}
        <Route path="/" element={<h1>Welcome to the Project Management System</h1>} />
        <Route path='/task/:id' element={<TaskDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
