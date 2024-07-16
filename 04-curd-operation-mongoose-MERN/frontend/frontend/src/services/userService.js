
import Axios from 'axios';

const API_URL='http://127.0.0.1:5000/api/users'


// query for creating a new user
const createUser = async (userData)=>{

    const Response=await Axios.post(API_URL,userData);
    return Response.data;
}

// getting all users

const getAllUsers=async ()=>{

   const Response= await Axios.get(`${API_URL}`);
   return Response.data;

}

//get user by id 

const getUserByID=async (id)=>{

    const Response= await Axios.get(`${API_URL}/${id}`);
    return Response.data;
    
 }

 // update user by id 

 const updateUserByID= async (id,updateData)=>{
    const Response=await Axios.put(`${API_URL}/${id}`,updateData);
    return Response.data;
 }

 // delete user by id

 const deleteUserByID= async (id)=>{
    const Response=await Axios.delete(`${API_URL}/${id}`);
    return Response.data;
 }


 export {createUser,getAllUsers,getUserByID,updateUserByID,deleteUserByID};