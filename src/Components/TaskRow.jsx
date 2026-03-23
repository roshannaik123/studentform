import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const TaskRow = React.memo(({ task, onDelete, onToggle, onEdit }) => {
  return (
    <tr className={task.completed ? "line-through text-gray-400" : ""}>
      <td>{task.name}</td>

      <td>
        <button onClick={() => onToggle(task)}>
          {task.completed ? "Done" : "Mark Done"}
        </button>
      </td>

      <td>
        <button onClick={() => onEdit(task)}>
          <FaEdit />
        </button>
      </td>

      <td>
        <button onClick={() => onDelete(task._id)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
});

export default TaskRow;