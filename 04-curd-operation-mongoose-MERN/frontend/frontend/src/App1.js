import React from "react";
import { useState } from "react";
import "./index.css";

const App1 = () => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([
    { id: "1", name: "vishu", email: "vishu@gmail.com", password: "vs" },
    { id: "2", name: "satyawan", email: "satyawan@gmail.com", password: "sp" },
    { id: "3", name: "komal", email: "komal@gmail.com", password: "km" },
  ]);
  const [formData, setFormData] = useState(
    user || { name: "", email: "", password: "" }
  );

  const handleChange = () => {};
  const handleDelete = (userId) => {
    console.log(userId);
  };
  return (
    <>
      <h2>Roshni Public School & Academy</h2>

      <form className="userForm">
        {/* <div className="labelDiv">
          <label htmlFor="name">Name</label>
          <label htmlFor="email">Email</label>
          <label htmlFor="password">Password</label>
        </div> */}

        <div className="inputDiv">
          {/* <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="password" name="password" /> */}
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
          />{" "}
        </div>
        <br />
        <div className="buttonDiv">
          <button type="submit">{user ? "Update" : "Create"} User</button>
        </div>
      </form>

      <div className="usersListDiv">
        <ul>
          <li>
            <span className="usernameSpan">Username</span>
            <span className="emailSpan"> Email </span>
            <span className="buttonSpan">Action Buttons</span>
          </li>
          {users.map((user) => (
            <li key={user.id}>
              <span className="usernameSpan">{user.name}</span>
              <span className="emailSpan"> {user.email}</span>
              <span className="buttonSpan">
                <button onClick={() => setUser(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App1;
