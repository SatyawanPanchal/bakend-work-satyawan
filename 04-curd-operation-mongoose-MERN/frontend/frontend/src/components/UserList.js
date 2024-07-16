import React from 'react';
import { deleteUserByID } from '../services/userService';
 

const UserList = ({ setUser, users, fetchUsers }) => {

  const handleDelete = async (id) => {
    await deleteUserByID(id);
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
