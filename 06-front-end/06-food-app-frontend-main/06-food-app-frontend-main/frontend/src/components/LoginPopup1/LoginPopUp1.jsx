import { useState } from "react";
import "./loginPopUp.css";
import { assets } from "../../assets/assets";

// eslint-disable-next-line react/prop-types
const LoginPopUp1 = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container">
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
            <input type="text" placeholder="your name" required />
          ) : (
            <></>
          )}

          <input type="email" placeholder="your email" required />
          <input type="password" placeholder="  password" required />
        </div>
        <button>{currState === "Sign-Up" ? "Create Account" : "Login"}</button>
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
