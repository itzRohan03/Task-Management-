const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// Create a new task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, priority, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      userId: req.userId,
    });

    await task.save();
    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json({
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
