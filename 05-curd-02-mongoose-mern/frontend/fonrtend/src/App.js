import { useEffect, useState } from "react";

import UserForm from "./components/UserForm";
import Axios from "axios";
import DisplayUser from "./components/DisplayUser";
import "./style.css";

function App() {
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState([]);

  return (
    <>
      <h2>Client end</h2>
      <br />
      <p>Enter the details to send to backend </p>
      <UserForm singleUser={singleUser} setSingleUser={setSingleUser} />
      <DisplayUser />
    </>
  );
}

export default App;
