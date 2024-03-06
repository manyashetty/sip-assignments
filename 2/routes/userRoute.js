const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticateUser } = require('../middleware/Authentication');
const {
  validateLogin,
  validateRegistration,
  validateInputs,
} = require('../middleware/validation');

router.post('/login', validateLogin, validateInputs, UserController.login);
router.post('/register', validateRegistration, validateInputs, UserController.register);
router.get('/users', authenticateUser, UserController.getAllUsers);
router.delete('/users/:id', authenticateUser, UserController.deleteUser);
router.get('/users/:id', authenticateUser, UserController.getUserById);

module.exports = router;
