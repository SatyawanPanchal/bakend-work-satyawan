 Mongoose CRUD Operations Example
July 15, 2024 please give me mern app using Curd operations using mongoose
 
Creating a full MERN (MongoDB, Express, React, Node.js) app with CRUD operations using Mongoose involves several steps. Here’s a step-by-step guide to help you get started:
Step 1: Set Up the Backend
1.1. Install Dependencies
npm init -y
npm install express mongoose dotenv cors
npm install nodemon --save-dev
1.2. Create Directory Structure
backend/
├── models/
│   └── User.js
├── controllers/
│   └── userController.js
├── routes/
│   └── userRoutes.js
├── .env
├── server.js
└── package.json
1.3. Define the Mongoose Model
models/User.js
 const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
 

 
module.exports = User;






1.4. Implement CRUD Operations in Controller
controllers/userController.js
javascript
const User = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: 'User deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
1.5. Set Up Routes
routes/userRoutes.js
javascript
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
1.6. Set Up Server
server.js
javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const dbUri = process.env.MONGODB_URI;
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
.env
plaintext
MONGODB_URI=your_mongodb_connection_string
PORT=5000
package.json
json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "mongoose": "^5.13.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.12"
  }
}
Step 2: Set Up the Frontend
2.1. Create React App
bash
npx create-react-app frontend
2.2. Install Axios
bash
cd frontend
npm install axios
2.3. Set Up Directory Structure
css
frontend/
├── src/
│   ├── components/
│   │   └── UserForm.js
│   │   └── UserList.js
│   ├── services/
│   │   └── userService.js
│   ├── App.js
│   └── index.js
2.4. Create User Service
src/services/userService.js
javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const updateUserById = async (id, updateData) => {
  const response = await axios.put(`${API_URL}/${id}`, updateData);
  return response.data;
};

const deleteUserById = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export { createUser, getAllUsers, getUserById, updateUserById, deleteUserById };
2.5. Create UserForm Component
src/components/UserForm.js
javascript
import React, { useState } from 'react';
import { createUser, updateUserById } from '../services/userService';

const UserForm = ({ user, setUser, fetchUsers }) => {
  const [formData, setFormData] = useState(user || { name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await updateUserById(user._id, formData);
    } else {
      await createUser(formData);
    }
    setUser(null);
    fetchUsers();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">{user ? 'Update' : 'Create'} User</button>
    </form>
  );
};

export default UserForm;
2.6. Create UserList Component
src/components/UserList.js
javascript
import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUserById } from '../services/userService';

const UserList = ({ setUser }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUserById(id);
    fetchUsers();
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => setUser(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
2.7. Set Up Main App Component
src/App.js
javascript
import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <h1>User Management</h1>
      <UserForm user={user} setUser={setUser} fetchUsers={fetchUsers} />
      <UserList setUser={setUser} />
    </div>
  );
};

export default App;
2.8. Run the Application
In the backend directory, start the backend server:
bash
npm run dev
In the frontend directory, start the React app:
bash
npm start
Your full MERN app should now be running with CRUD operations implemented using Mongoose. You can navigate to http://localhost:3000 to interact with the application.

Get started with ChatGPT

|Terms of use|Privacy policy|
Mongoose CRUD Operations Example

