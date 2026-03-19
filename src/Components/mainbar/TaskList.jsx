import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  fetchTasks,
  removeTask,
  toggleTask,
  editTask,
  clearTaskError,
} from "../../features/TaskSlice";
import { useDispatch, useSelector } from "react-redux";

const TASKS_PER_PAGE = 5;
const PRIORITY_ORDER = { low: 1, medium: 2, high: 3 };

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, isError, errorMessage } = useSelector((state) => state.tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (isError && errorMessage) {
      alert(errorMessage);
      dispatch(clearTaskError());
    }
  }, [dispatch, errorMessage, isError]);

  const deleteTask = async (id) => {
    await dispatch(removeTask(id));
  };

  const toggleCompleted = async (task) => {
    const result = await dispatch(toggleTask(task));

    if (toggleTask.fulfilled.match(result)) {
      dispatch(fetchTasks());
    }
  };

  const handleEditTask = async (task) => {
    const newName = prompt("Enter new task name", task.name);

    if (newName === null) {
      return;
    }

    const trimmedName = newName.trim();
    if (!trimmedName) {
      alert("Task name cannot be empty");
      return;
    }

    const result = await dispatch(
      editTask({
        id: task._id,
        updates: {
          name: trimmedName,
        },
      })
    );

    if (editTask.fulfilled.match(result)) {
      dispatch(fetchTasks());
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      task.name?.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query) ||
      task.priority?.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "pending" && !task.completed);

    const matchesPriority =
      priorityFilter === "all" || task.priority?.toLowerCase() === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }

    if (sortBy === "oldest") {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }

    if (sortBy === "name-asc") {
      return (a.name || "").localeCompare(b.name || "");
    }

    if (sortBy === "name-desc") {
      return (b.name || "").localeCompare(a.name || "");
    }

    if (sortBy === "priority-high") {
      return (PRIORITY_ORDER[b.priority] || 0) - (PRIORITY_ORDER[a.priority] || 0);
    }

    if (sortBy === "priority-low") {
      return (PRIORITY_ORDER[a.priority] || 0) - (PRIORITY_ORDER[b.priority] || 0);
    }

    if (sortBy === "due-soon") {
      return new Date(a.dueDate || "9999-12-31") - new Date(b.dueDate || "9999-12-31");
    }

    if (sortBy === "due-late") {
      return new Date(b.dueDate || "1970-01-01") - new Date(a.dueDate || "1970-01-01");
    }

    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedTasks.length / TASKS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * TASKS_PER_PAGE;
  const paginatedTasks = sortedTasks.slice(startIndex, startIndex + TASKS_PER_PAGE);

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    resetToFirstPage();
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    resetToFirstPage();
  };

  const handlePriorityChange = (e) => {
    setPriorityFilter(e.target.value);
    resetToFirstPage();
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    resetToFirstPage();
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="m-3 w-full rounded-2xl border bg-white p-3 shadow-lg sm:m-6 sm:p-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-cyan-800 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold tracking-wide text-amber-50 sm:text-2xl">
            TASK LIST
          </h2>

          <div className="w-full sm:max-w-md">
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name, description, or priority"
              className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm placeholder-gray-400 transition duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={handlePriorityChange}
            className="rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={sortBy}
            onChange={handleSortChange}
            className="rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="priority-high">Priority High-Low</option>
            <option value="priority-low">Priority Low-High</option>
            <option value="due-soon">Due Date Soonest</option>
            <option value="due-late">Due Date Latest</option>
          </select>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[640px] w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm sm:text-base">
              <th className="border-b p-3">Task Name</th>
              <th className="border-b p-3">Completed</th>
              <th className="border-b p-3">Edit</th>
              <th className="border-b p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.map((task) => (
              <tr
                key={task._id}
                className={`text-sm hover:bg-gray-50 sm:text-base ${task.completed ? "line-through text-gray-400" : ""}`}
              >
                <td className="border-b p-3">
                  <div className="font-medium">{task.name}</div>
                  {task.description && (
                    <div className="mt-1 text-xs text-gray-500 sm:text-sm">
                      {task.description}
                    </div>
                  )}
                </td>
                <td className="border-b p-3">
                  <button
                    onClick={() => toggleCompleted(task)}
                    className={`rounded px-3 py-2 text-xs sm:text-sm ${
                      task.completed ? "bg-green-500 text-white" : "bg-gray-300 text-black"
                    }`}
                  >
                    {task.completed ? "Completed" : "Mark Done"}
                  </button>
                </td>
                <td className="border-b p-3 text-center">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label={`Edit ${task.name}`}
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="border-b p-3 text-center">
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Delete ${task.name}`}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedTasks.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-sm text-gray-500 sm:text-base">
                  No tasks match your current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center text-sm text-gray-600 sm:text-left">
          Showing {paginatedTasks.length} of {sortedTasks.length} tasks
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={goToPreviousPage}
            disabled={safeCurrentPage === 1}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {safeCurrentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={goToNextPage}
            disabled={safeCurrentPage === totalPages}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
