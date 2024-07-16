import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import { getAllUsers } from "./services/userService";
import UserList from "./components/UserList";

 

function App() {
   
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  
  
  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(()=>{
    fetchUsers();
  },[])


  return (
    <div>
    <h1>User Management</h1>
    <UserForm user={user} setUser={setUser} fetchUsers={fetchUsers}/>
   <UserList  setUsers={setUsers} users={users} fetchUsers={fetchUsers} />    
    </div>
  );
}

export default App;
