import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "../features/TaskSlice";

const AddTask = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.name.trim()) {
      alert("Task name is required");
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(
        addTask({
          ...task,
          completed: false,
        })
      ).unwrap();

      alert("Task created successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error || "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-4 sm:px-4 md:px-6">
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-cyan-700 sm:text-3xl">Add New Task</h2>
            <p className="mt-1 text-sm text-gray-500">
              Create a task with priority, description, and due date.
            </p>
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => (onClose ? onClose() : navigate("/dashboard"))}
            className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Task Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Task name"
              value={task.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-cyan-400 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the task"
              value={task.description}
              onChange={handleChange}
              rows="5"
              disabled={isSubmitting}
              className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-cyan-400 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="priority" className="text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                disabled={isSubmitting}
                className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-cyan-400 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                disabled={isSubmitting}
                className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-cyan-400 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => (onClose ? onClose() : navigate("/dashboard"))}
              className="rounded-lg bg-gray-300 px-4 py-3 font-medium hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-3 font-medium text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {isSubmitting ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
