import clsx from "clsx";
import moment from "moment";
import React, { useState,useEffect  } from "react";
import axios from "axios";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { tasks } from "../assets/data";
import Tabs from "../components/Tabs";
import { PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import Loading from "../components/Loader";
import Button from "../components/Button";
import Sidebar from "./Sidebar";
import Header from "./Header";
const assets = [
  "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

// Updated TABS without the "Activities/Timeline" tab
const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
];


const TaskDetails = () => {
  const { id } = useParams(); // Get the task ID from URL params
  const [task, setTask] = useState(null);
  const [selected, setSelected] = useState(0); // Set the default tab to 0 (only one tab)
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    // Fetch task data from the API
    axios
      .get(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming you have token-based auth
        },
      })
      .then((response) => {
        setTask(response.data.project);
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });
  }, [id]);

  if (!task) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  const {
    _id,
    projectName,
    projectTitle,
    description,
    dateProject,
    priority,
    price,
    projectCompletionTime,
    websiteType,
    development,
    figmaDesign,
    backendDevelopment,
    assets,
    teams,
    subTasks,
  } = task;

  return (
    <div className="w-full min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header setOpen={setOpen} />
        <div className="py-6 px-6">
          <h1 className="text-2xl text-gray-600 font-bold">{projectName}</h1>

          {/* Tabs Component (only one tab displayed) */}
          <Tabs tabs={TABS} setSelected={setSelected}>
            {selected === 0 && (
              <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto">
                {/* LEFT COLUMN */}
                <div className="w-full md:w-1/2 space-y-8">
                  <div className="flex items-center gap-5">
                    <div
                      className={clsx(
                        "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                        PRIOTITYSTYELS[priority],  // Make sure to define this in your code
                        bgColor[priority]  // Make sure to define this as well
                      )}
                    >
                      <span className="text-lg">{ICONS[priority]}</span>  {/* ICONS should be an object mapping priorities to icons */}
                      <span className="uppercase">{priority} Priority</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
                      />
                      <span className="text-black uppercase">{task.stage}</span>
                    </div>
                  </div>

                  <p className="text-gray-500">Created At: {new Date(dateProject).toDateString()}</p>

                  <div className="flex items-center gap-8 p-4 border-y border-gray-200">
                    <div className="space-x-2">
                      <span className="font-semibold">Price:</span>
                      <span>${price}</span>
                    </div>

                    <span className="text-gray-400">|</span>

                    <div className="space-x-2">
                      <span className="font-semibold">Completion Time:</span>
                      <span>{projectCompletionTime}</span>
                    </div>
                  </div>

                  {/* PROJECT DESCRIPTION */}
                  <div className="space-y-4 py-6">
                    <p className="text-gray-600 font-semibold text-sm">Description</p>
                    <p className="text-gray-700">{description}</p>
                  </div>

                  {/* TASK TEAM */}
                  <div className="space-y-4 py-6">
  <p className="text-gray-600 font-semibold text-sm">TASK TEAM</p>
  <div className="space-y-3">
    {task?.teams?.map((member, index) => (
      <div key={index} className="flex gap-4 py-2 items-center border-t border-gray-200">
        <div className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600">
          <span className="text-center">{getInitials(member.name)}</span>
        </div>
        <div>
          <p className="text-lg font-semibold">{member.name}</p>
          <span className="text-gray-500">{member.email}</span> {/* Display email of the team member */}
        </div>
      </div>
    ))}
  </div>
</div>


                  {/* SUB-TASKS */}
                  <div className="space-y-4 py-6">
                    <p className="text-gray-500 font-semibold text-sm">SUB-TASKS</p>
                    <div className="space-y-8">
                      {subTasks?.map((el, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200">
                            <MdTaskAlt className="text-violet-600" size={26} />
                          </div>

                          <div className="space-y-1">
                            <div className="flex gap-2 items-center">
                              <span className="text-sm text-gray-500">
                                {new Date(el?.date).toDateString()}
                              </span>

                              <span className="px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold">
                                {el?.tag}
                              </span>
                            </div>

                            <p className="text-gray-700">{el?.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: ASSETS */}
                <div className="w-full md:w-1/2 space-y-8">
                  <p className="text-lg font-semibold">ASSETS</p>
                  <div className="w-full grid grid-cols-2 gap-4">
                    {assets?.map((el, index) => (
                      <img
                        key={index}
                        src={el}
                        alt={`Asset ${index + 1}`}
                        className="w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
