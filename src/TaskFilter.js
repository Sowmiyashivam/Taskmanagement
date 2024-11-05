import React, { useState } from 'react';

function TaskFilter({ setFilter }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <div className="task-filter">
      <label>Filter tasks:</label>
      <select value={selectedFilter} onChange={handleFilterChange}>
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
}

export default TaskFilter;
