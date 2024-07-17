import React, { useState, useEffect } from 'react';
import { createUser, updateUserByID } from '../services/userService';

const UserForm = ({ user, setUser, fetchUsers }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({ name: '', email: '', password: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await updateUserByID(user._id, formData);
      } else {
        await createUser(formData);
      }
      setUser(null);
      fetchUsers();
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <br />
        <br />
        <button type="submit">{user ? 'Update' : 'Create'} User</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserForm;
