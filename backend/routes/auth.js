const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Email is required').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  authController.register
);

router.post(
  '/login',
  [
    body('email', 'Email is required').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  authController.login
);

router.get('/me', require('../middleware/auth'), authController.getCurrentUser);

module.exports = router;
