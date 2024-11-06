import React from "react";
import TaskCard from "./TaskCard"; // Assuming TaskCard is in the same directory

const BoardView = ({ tasks }) => {
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))
      ) : (
        <div>No tasks found.</div>
      )}
    </div>
  );
};

export default BoardView;
