import React, { useEffect, useState } from "react";
import Axios from "axios";
import './style.css'
 

const App = () => {
  const [data, setData] = useState([]);
  const [first, setFirst] = useState(10);
  const [second, setSecond] = useState(10);
  const [result, setResult] = useState(0);

  // onclick we will send the data of two inputs to server and will fetch the result and display the same in third input
  const handleClick = () => {

    const sendRequest=async()=>{
      const response=await Axios.post("http://localhost:5000/add",
      {  firstData:first,
        secondData:second
      }
      
      );
     
      const resultgot=response.data;
      console.log('result from server',resultgot);
      
      setResult(resultgot);
    }
    sendRequest();
  }





  useEffect(() => {
    async function getData() {
      const response = await Axios.get("http://localhost:5000/about");
      setData(response.data);
    }
    getData();
  }, []);

  return (
    <div className="myform">
      Client running this side
      <h1> </h1>
      <input
      name="first"
        type="number"
        value={first}
        onChange={(e) => setFirst(e.target.value)}
      />
      <input
        name="second"
        type="number"
        value={second}
        onChange={(e) => setSecond(e.target.value)}
      />
      <button onClick={() => handleClick()}>Add these two nos</button>
      <input type="number" value={result} onChange={()=>{}} />
    </div>
  );
};

export default App;
