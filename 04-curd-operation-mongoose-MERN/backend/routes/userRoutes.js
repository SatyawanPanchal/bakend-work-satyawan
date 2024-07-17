const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/userController');

 




// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Update a user by ID
router.put('/:id', updateUserById);

// Delete a user by ID
router.delete('/:id', deleteUserById);

module.exports = router;
