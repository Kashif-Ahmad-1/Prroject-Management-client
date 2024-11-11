import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import Loading from "../../components/Loader";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Tabs from "../../components/Tabs";
import TaskTitle from "../../components/TaskTitle";
import BoardView from "./BoardView";

import Table from "./Table";
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

const DevTasks = () => {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const toggleSidebar = () => {
    setIsOpen((prev) => !prev); // Toggle sidebar visibility
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Assuming authToken is stored in localStorage
        const response = await axios.get("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(response.data.projects); // Assuming the response data is an array of tasks
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);


// Handle task deletion
const handleTaskDeleted = async (taskId) => {
  try {
    // Make a DELETE request to the API
    const response = await axios.delete(`http://localhost:5000/api/projects/${taskId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status === 200) {
      // Refetch tasks after deletion
      const fetchTasks = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("authToken");
          const response = await axios.get("http://localhost:5000/api/projects", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTasks(response.data.projects);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching tasks:", err);
          setError("Failed to load tasks.");
          setLoading(false);
        }
      };

      fetchTasks();
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
  // Handle task update (edit task)
  const handleTaskUpdate = (updatedTask) => {
    // Update the task list with the updated task
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };


  const handleActivityUpdate = async (taskId, newActivity) => {
    // Define valid activities
    const validActivities = ['assigned', 'started', 'in progress', 'bug', 'completed', 'commented'];
  
    // Validate the new activity value
    if (!validActivities.includes(newActivity)) {
      alert("Invalid activity status");
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:5000/api/projects/${taskId}/activity`,
        { activity: newActivity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        // Update task list after activity change
        const updatedTask = response.data.project;
        handleTaskUpdate(updatedTask); // Update the task in the state
      }
    } catch (err) {
      console.error("Error updating activity:", err);
      setError("Failed to update activity.");
    }
  };
  

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Static title for "Tasks"
  const title = "Tasks";

  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
  
      {/* Main Content Area */}
      <div
         className={`flex-1 transition-all ${
          // For mobile view, add margin when sidebar is open
          isOpen ? "ml-64" : "ml-0"
        } md:ml-0`} // For desktop, always apply margin-left of 64
      >
        <Header setOpen={setOpen} toggleSidebar={toggleSidebar} />
  
        <div className="py-6 px-6">
          {/* Title and Create Task Button */}
          <div className="flex items-center justify-between mb-6">
            <Title title={title} />
            <Button
              onClick={() => setOpen(true)}
              label="Create Task"
              icon={<IoMdAdd className="text-lg" />}
              className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
            />
          </div>
  
          {/* Tabs for View Selection */}
          <Tabs tabs={TABS} setSelected={setSelected}>
            {/* <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
              <TaskTitle label="To Do" className={TASK_TYPE.todo} />
              <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
              <TaskTitle label="Completed" className={TASK_TYPE.completed} />
            </div> */}
  
            {/* Conditional rendering for BoardView or Table */}
            {selected !== 1 ? (
             <BoardView tasks={tasks} onTaskDeleted={handleTaskDeleted} onActivityUpdate={handleActivityUpdate}/>
            ) : (
              <div className="w-full">
                <Table tasks={tasks} />
              </div>
            )}
          </Tabs>
        </div>
  
      
      </div>
    </div>
  );
}  

export default DevTasks;
