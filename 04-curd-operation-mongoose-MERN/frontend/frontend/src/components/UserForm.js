import React, { useState } from 'react'
import { createUser, updateUserByID } from '../services/userService';

const UserForm = ({user,setUser,fetchUsers}) => {

    const [formData,setFormData]=useState(user||{name:'',email:'',password:''});

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData({...formData, [name]:value});
    }


    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(user){
            await updateUserByID(user._id,formData)
        }else{
            await createUser(formData);

        }
        setUser(null);
        fetchUsers()

    }
  return (
    <div>
      <form onSubmit={()=>handleSubmit()}>

      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required /> <br />
      <button type="submit">{user ? 'Update' : 'Create'} User</button>
      </form>
    </div>
  )
}

export default UserForm;
