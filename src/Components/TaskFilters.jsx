import React from "react";

const TaskFilters = ({ filters, setFilters, setPage }) => {
  const update = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const selectClassName =
    "w-full appearance-none rounded-xl border border-white/20 bg-white/95 px-4 py-3 pr-10 text-sm font-medium text-slate-800 shadow-sm shadow-cyan-950/10 outline-none transition duration-200 hover:border-cyan-200 focus:border-cyan-300 focus:bg-white focus:ring-2 focus:ring-cyan-200";

  return (
    <div className="mb-6 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="task-search" className="text-sm font-semibold tracking-wide text-amber-50">
          Search
        </label>
        <input
          id="task-search"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="w-full rounded-xl border border-white/20 bg-amber-50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="task-status" className="text-sm font-semibold tracking-wide text-amber-50">
          Status
        </label>
        <div className="relative">
          <select
            id="task-status"
            value={filters.status}
            onChange={(e) => update("status", e.target.value)}
            className={selectClassName}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
            ▼
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="task-priority" className="text-sm font-semibold tracking-wide text-amber-50">
          Priority
        </label>
        <div className="relative">
          <select
            id="task-priority"
            value={filters.priority}
            onChange={(e) => update("priority", e.target.value)}
            className={selectClassName}
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
            ▼
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="task-sort" className="text-sm font-semibold tracking-wide text-amber-50">
          Sort By
        </label>
        <div className="relative">
          <select
            id="task-sort"
            value={filters.sortBy}
            onChange={(e) => update("sortBy", e.target.value)}
            className={selectClassName}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name-asc">A-Z</option>
            <option value="name-desc">Z-A</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
            ▼
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
