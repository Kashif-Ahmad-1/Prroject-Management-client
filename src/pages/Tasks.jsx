import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";

import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import Header from "./Header";
import Sidebar from "./Sidebar";
// Static task type mapping
const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

// Static data for Tabs
const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const Tasks = () => {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true); // Set loading to true when fetching tasks
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.projects); // Assuming response is an array of tasks
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when component mounts
  }, []); // Empty dependency array means it runs only once when the component mounts

  // Handle task deletion
  const handleTaskDeleted = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/projects/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 200) {
        fetchTasks(); // Refetch tasks after successful deletion
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Handle task update
  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin border-t-4 border-blue-600 w-16 h-16 border-solid rounded-full" />
      </div>
    );
  }

  if (error) {
    return <div className="py-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "pl-64" : "pl-16"
        } md:pl-64`}
      >
        <Header setOpen={setOpen} toggleSidebar={toggleSidebar} />

        <div className="py-6 px-4 md:px-8">
          {/* Title and Create Task Button */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Tasks</h1>
            <Button
              onClick={() => setOpen(true)}
              label="Create Task"
              icon={<IoMdAdd className="text-lg" />}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4 flex items-center gap-2"
            />
          </div>

          {/* Tabs for View Selection */}
          <Tabs tabs={TABS} setSelected={setSelected}>
            <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
              <TaskTitle label="To Do" className={TASK_TYPE.todo} />
              <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
              <TaskTitle label="Completed" className={TASK_TYPE.completed} />
            </div>

            {/* Conditional rendering for BoardView or Table */}
            {selected !== 1 ? (
              <BoardView tasks={tasks} onTaskDeleted={handleTaskDeleted} />
            ) : (
              <Table tasks={tasks} />
            )}
          </Tabs>
        </div>

        {/* Add Task Modal */}
        <AddTask open={open} setOpen={setOpen} onTaskUpdate={handleTaskUpdate} />
      </div>
    </div>
  );
};

export default Tasks;
