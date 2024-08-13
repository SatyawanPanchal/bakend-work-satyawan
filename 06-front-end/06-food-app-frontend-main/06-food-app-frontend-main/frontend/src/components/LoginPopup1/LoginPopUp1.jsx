import { useContext, useState } from "react";
import "./loginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const LoginPopUp1 = ({ setShowLogin }) => {
  const { url ,setToken} = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    }
    else{
      newUrl+='/api/user/register'
    }
const response=await axios.post(newUrl,data);
if(response.data.success)
{
  setToken(response.data.token);
  localStorage.setItem('token',response.data.token)
  setShowLogin(false);
}else{
  alert(response.data.message)
}

  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => {
              setShowLogin(false);
            }}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign-Up" ? (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="your name"
              required
            />
          ) : (
            <></>
          )}

          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="your email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="  password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign-Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing , I agree the terms and conditions</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new Account ?{" "}
            <span onClick={() => setCurrState("Sign-Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an Account{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp1;
