import React, { useEffect, useState } from "react";
import Axios from "axios";

const DisplayUser = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const[editData,setEditData]=useState({name:"" , email:""})

  const handleUpdate=async()=>{
    try{

        const record=users.find(item=>item.email===editData.email)
        const id=record._id;

        console.log('editdata we found =',editData);
        
         
        

        const response= await  Axios.put( `http://localhost:5001/api/user/${id}`,editData)
        console.log('data is updated',response.data);
         
        

    }catch(error)
    {
        console.log('error while updating-->',error.message);
        
    }
  }
const handleUpdateChange=(e)=>{
    const{name,value}= e.target;

    setEditData({...editData,[name]:value})

    console.log('edited data here ',editData);
    
}




  const handleEdit = (id,name,email) => {
    setShowEdit( (show) => !show);
    console.log(id, name,email);
    editData.name=name
    editData.email=email
    setEditData(editData)
    console.log('editdata =',editData);
    
    
  };

  const handleDelete = async (id) => {
    try {
      console.log("delete is pressed");

      const response = await Axios.delete(
        `http://localhost:5001/api/user/${id}`
      );
      console.log("response of deletion", response.data);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.log("we got an error", error.message);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const ResponseUsers = await Axios.get("http://localhost:5001/api/user");
      console.log("user we got --->", ResponseUsers.data);

      setUsers(ResponseUsers.data);
    };

    fetchUsers();
  }, []);
  return (
    <div className="maindiv">
      <div className="leftdiv">
      
        <button onClick={() => setShow((show) => !show)}>
          {show ? "hide" : "show"}
        </button>
        <ul>
          {show &&
            users.map((user) => {
              return (
                <div key={user._id}>
                  <li>
                    <p>
                      {" "}
                      {user.name} - {user.email} -{user._id}
                    </p>
                    <button onClick={() => handleEdit(user._id,user.name,user.email)}>Edit</button>{" "}
                    &nbsp;
                    <button onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </li>
                  <br />
                </div>
              );
            })}
        </ul>
      </div>


      

      { showEdit&& 
        <div className="rightdiv"><div>
      
        name:<input type="text" name="name"  onChange={(e)=>handleUpdateChange(e)} value={editData.name}/><br />
        email: <input type="email" name="email" onChange={(e)=>handleUpdateChange(e)}  value={editData.email}/><br /><br />
        <button onClick={()=>handleUpdate()}>Update</button>
       </div>
      </div>
       
       }
 


    </div>
  );
};

export default DisplayUser;
