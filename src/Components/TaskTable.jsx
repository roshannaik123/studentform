import React from "react";
import TaskRow from "./TaskRow";

const TaskTable = ({ tasks, onDelete, onToggle, onEdit }) => {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <TaskRow
            key={task._id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;