import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { taskAPI } from '../services/api';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data.tasks);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks([response.data.task, ...tasks]);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await taskAPI.updateTask(editingTask._id, taskData);
      setTasks(tasks.map((t) => (t._id === editingTask._id ? response.data.task : t)));
      setEditingTask(null);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        setTasks(tasks.filter((t) => t._id !== taskId));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Task Management</h1>
          {user && <p>Welcome, {user.name}!</p>}
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="form-section">
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            initialData={editingTask}
            isEditing={!!editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />
        </div>

        <div className="tasks-section">
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="no-tasks">No tasks yet. Create one to get started!</p>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
