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
      <Sidebar />
  
      {/* Main Content Area */}
      <div className="flex-1 pl-64">
        <Header setOpen={setOpen} />
  
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
            <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
              <TaskTitle label="To Do" className={TASK_TYPE.todo} />
              <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
              <TaskTitle label="Completed" className={TASK_TYPE.completed} />
            </div>
  
            {/* Conditional rendering for BoardView or Table */}
            {selected !== 1 ? (
              <BoardView tasks={tasks} />
            ) : (
              <div className="w-full">
                <Table tasks={tasks} />
              </div>
            )}
          </Tabs>
        </div>
  
        {/* Add Task Modal */}
        <AddTask open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}  

export default Tasks;
