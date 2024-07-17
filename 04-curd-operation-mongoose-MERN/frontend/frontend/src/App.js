import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import { getAllUsers } from "./services/userService";
import UserList from "./components/UserList";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState(null);

  const fetchUsers = async () => {
     const response = await axios.get("http://127.0.0.1:5000/api/users");
    
     console.log('data we got =',response.data);
     
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      <h1>{display}</h1>
      <UserForm user={user} setUser={setUser} fetchUsers={fetchUsers} />
      <UserList setUsers={setUsers} users={users} fetchUsers={fetchUsers} />
    </div>
  );
}

export default App;
