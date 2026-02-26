import React, { useState, useEffect } from 'react';
import '../styles/taskform.css';

const TaskForm = ({ onSubmit, initialData, isEditing, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    status: 'todo',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'medium',
        dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : '',
        status: initialData.status || 'todo',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      status: 'todo',
    });
  };

  return (
    <div className="task-form">
      <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <div className="form-buttons">
          <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
          {isEditing && (
            <button type="button" className="cancel-btn" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
