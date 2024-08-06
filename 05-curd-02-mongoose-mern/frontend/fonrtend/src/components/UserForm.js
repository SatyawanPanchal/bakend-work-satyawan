import Axios from "axios";
import React, { useEffect, useState } from "react";

const UserForm = ({ singleUser, setSingleUser }) => {
  const [formData, setFormData] = useState({ name: " ", email: " " });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    //     { ...formData, [name]: value } is using the spread operator (...) to create a new object that contains all the properties of the current formData state, but with one modification:

    //     The property with the key of name is updated to the new value.

    // This technique ensures that only the specific field being modified is updated, while the other fields in formData remain unchanged.
  };


  async function addUser() {
    const Response = await Axios.post("http://localhost:5001/api/user", formData);
    console.log("new user is created =", Response.data);
  }


  function handleSubmit(e) {
    e.preventDefault();
    try {
      addUser();
    } catch (error) {
      console.log("error here ", error.messages);
    }
  }

  return (
    <div>
      UserForm here
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="enter name here"
        />
        <br />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Enter email here"
        />
        <br />
        <button type="submit">Create User</button>
      </form>
      <p>
        {formData.name}--{formData.email}
      </p>
    </div>
  );
};

export default UserForm;
