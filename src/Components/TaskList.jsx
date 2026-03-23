import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchTasks,
  removeTask,
  toggleTask,
  editTask,
  clearTaskError,
} from "../features/TaskSlice";

import TaskFilters from "./TaskFilters";
import TaskTable from "./TaskTable";
import Pagination from "./Pagination";
// import { fetchTasks } from "../features/TaskSlice";

const TASKS_PER_PAGE = 5;
const PRIORITY_ORDER = { low: 1, medium: 2, high: 3 };

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, isError, errorMessage } = useSelector((state) => state.tasks);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
    sortBy: "newest",
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (isError && errorMessage) {
      toast.error(errorMessage);
      dispatch(clearTaskError());
    }
  }, [isError, errorMessage, dispatch]);

  // ✅ Handlers (memoized)
  const deleteTask = useCallback((id) => {
    dispatch(removeTask(id));
  }, [dispatch]);

  const toggleCompleted = useCallback((task) => {
    dispatch(toggleTask(task)); // no refetch
  }, [dispatch]);

  const handleEditTask = useCallback((task) => {
    const newName = prompt("Enter new task name", task.name);
    if (!newName?.trim()) return toast.error("Task name cannot be empty");

    dispatch(editTask({
      id: task._id,
      updates: { name: newName.trim() },
    }));
  }, [dispatch]);

  // ✅ Filtering
  const filteredTasks = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.name?.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.priority?.toLowerCase().includes(query);

      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "completed" && task.completed) ||
        (filters.status === "pending" && !task.completed);

      const matchesPriority =
        filters.priority === "all" ||
        task.priority?.toLowerCase() === filters.priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, filters]);

  // ✅ Sorting
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "priority-high":
          return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
        case "priority-low":
          return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        default:
          return 0;
      }
    });
  }, [filteredTasks, filters.sortBy]);

  const totalPages = Math.ceil(sortedTasks.length / TASKS_PER_PAGE) || 1;

  // ✅ Pagination
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * TASKS_PER_PAGE;
    return sortedTasks.slice(start, start + TASKS_PER_PAGE);
  }, [sortedTasks, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="p-4 bg-cyan-800 rounded-2xl text-amber-50">
      <TaskFilters filters={filters} setFilters={setFilters} setPage={setCurrentPage} />

      <TaskTable
        tasks={paginatedTasks}
        onDelete={deleteTask}
        onToggle={toggleCompleted}
        onEdit={handleEditTask}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TaskList;