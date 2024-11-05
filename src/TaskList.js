import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [task, setTask] = useState({ id: '', title: '', completed: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ ...task, id: Date.now() });
    setTask({ id: '', title: '', completed: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
