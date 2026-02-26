const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');

const router = express.Router();

// All task routes require authentication
router.use(auth);

router.post(
  '/',
  [body('title', 'Title is required').notEmpty()],
  taskController.createTask
);

router.get('/', taskController.getTasks);

router.get('/:id', taskController.getTaskById);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;
