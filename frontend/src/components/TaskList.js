import React from 'react';
import '../styles/tasklist.css';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      default:
        return 'status-todo';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      default:
        return 'priority-low';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="tasks-list">
      <h2>My Tasks</h2>
      <div className="tasks-grid">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-header">
              <h3>{task.title}</h3>
              <div className="task-badges">
                <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`status-badge ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
            </div>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
              <span className="due-date">📅 {formatDate(task.dueDate)}</span>
            </div>
            <div className="task-actions">
              <button className="edit-btn" onClick={() => onEdit(task)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
