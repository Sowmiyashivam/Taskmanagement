import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // State for filtering tasks

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedLoginStatus === 'true' && storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
    
    // Load tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Handle login
  const handleLogin = (loggedInUser) => {
    setIsLoggedIn(true);
    setUser(loggedInUser);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  // Add a new task
  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Update an existing task
  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Delete a task (only Admin or task owner can delete)
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // Show all tasks
  });

  return (
    <div className="App">
      {!isLoggedIn ? (
        <>
          <Login onLogin={handleLogin} />
          <Register onRegister={(username) => setUser({ username, role: 'user' })} />
        </>
      ) : (
        <>
          <h1>Welcome, {user.username} ({user.role})</h1>
          <button onClick={handleLogout}>Logout</button>
          
          {/* Task Filter for filtering tasks by status */}
          <TaskFilter setFilter={setFilter} />

          {/* Task Form to add a new task */}
          <TaskForm addTask={addTask} />

          {/* Task List displaying filtered tasks */}
          <TaskList
            tasks={filteredTasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
            user={user}
          />
        </>
      )}
    </div>
  );
}

export default App;
