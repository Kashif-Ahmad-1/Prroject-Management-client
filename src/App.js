import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Auth/LoginPage';
// import AdminDashboard from './components/AdminDashboard';
// import DeveloperDashboard from './components/DeveloperDashboard';
import SupervisorDashboard from './pages/SupervisorDashboard';
import TaskDetails from './pages/TaskDetails'
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes here */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/developer-dashboard" element={<DeveloperDashboard />} />
        */}
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} /> 
        
        {/* Home route */}
        <Route path="/" element={<h1>Welcome to the Project Management System</h1>} />
        <Route path='/task/:id' element={<TaskDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
