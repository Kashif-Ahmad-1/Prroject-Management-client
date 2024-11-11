import React, { useState } from "react";
import clsx from "clsx";
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

// Priority icons based on priority
const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const TaskCard = ({ task, onTaskDeleted, onActivityUpdate }) => {
  const [open, setOpen] = useState(false);
  const [isActivityPanelOpen, setActivityPanelOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(task.activities || "assigned");

  // Extracting relevant task information
  const { _id, projectName, projectTitle, dateProject, priority, price, projectCompletionTime, websiteType, development, figmaDesign, backendDevelopment } = task;

  const assignDeveloper = {
    development: development?.assignDeveloper,
    figmaDesign: figmaDesign?.assignDeveloper,
    backendDevelopment: backendDevelopment?.assignDeveloper
  };

  // Handle activity change
  const handleActivityChange = (e) => {
    const newActivity = e.target.value;
    setSelectedActivity(newActivity);

    // Call the parent function to update the activity
    if (onActivityUpdate) {
      onActivityUpdate(_id, newActivity);
    }

    // Close the activity panel after update
    setActivityPanelOpen(false); // Hides the panel
  };

  return (
    <div className="w-full h-[450px] bg-white shadow-md rounded-lg p-6 space-y-4 overflow-hidden">
      {/* Top Header: Project Name & Priority */}
      <div className="flex justify-between items-center">
        <div
          className={clsx(
            "flex gap-2 items-center text-sm font-medium",
            priority === "high" ? "text-red-500" : "text-gray-500"
          )}
        >
          <span className="text-lg">{ICONS[priority]}</span>
          <span className="uppercase">{priority} Priority</span>
        </div>
      </div>

      {/* Project Name */}
      <div className="text-2xl font-bold text-gray-800">{projectName}</div>

      {/* Project Title */}
      <div className="flex items-center gap-2">
        <h4 className="line-clamp-1 text-black text-lg">{projectTitle}</h4>
      </div>

      {/* Project Date */}
      <span className="text-sm text-gray-600">{new Date(dateProject).toLocaleDateString()}</span>

      {/* Divider */}
      <div className="w-full border-t border-gray-200 my-3" />

      {/* Activity, Assets, Subtasks */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <BiMessageAltDetail />
            <span>{0}</span> {/* Placeholder for activity count */}
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <MdAttachFile />
            <span>{task?.assets?.length}</span> {/* Asset count */}
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <FaList />
            <span>{0}</span> {/* Placeholder for subtask count */}
          </div>
        </div>
      </div>

      {/* Activity Update Toggle */}
      <div className="flex justify-between items-center">
        <h5 className="text-sm font-semibold">Activity: {selectedActivity}</h5>
        <button
          className="text-blue-600 hover:text-blue-800 text-sm"
          onClick={() => setActivityPanelOpen(!isActivityPanelOpen)} // Toggle activity panel
        >
          {isActivityPanelOpen ? "Hide" : "Update Activity"}
        </button>
      </div>

      {/* Activity Panel */}
      {isActivityPanelOpen && (
        <div className="mt-2 space-y-2">
          <select
            value={selectedActivity}
            onChange={handleActivityChange}
            className="w-full p-2 border rounded-md text-sm"
          >
            <option value="assigned">Assigned</option>
            <option value="started">Started</option>
            <option value="in progress">In Progress</option>
            <option value="bug">Bug</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}

      {/* Additional Project Details */}
      <div className="mt-4 space-y-2 overflow-auto">
        <h5 className="text-sm font-semibold">
          Price: <span className="font-normal">${price}</span>
        </h5>
        <h5 className="text-sm font-semibold">
          Completion Time: <span className="font-normal">{projectCompletionTime}</span>
        </h5>
        <h5 className="text-sm font-semibold">
          Website Type: <span className="font-normal">{websiteType}</span>
        </h5>
      </div>

      {/* Add Subtask Button */}
      <div className="w-full pt-4 mt-auto">
        <button
          onClick={() => setOpen(true)}
          className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold hover:text-gray-700"
        >
          <IoMdAdd className="text-lg" />
          <span>Assign Developer</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
