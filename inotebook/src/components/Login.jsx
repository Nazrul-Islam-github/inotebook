import React, { useState } from "react";
import { useHistory } from "react-router";
import Navbar from "./Navbar";

const Login = ({showAlert}) => {
  let history = useHistory();
  const [loginData,setLoginData]=useState({email:"",password:""})

const handleonChange = (e)=>{
  setLoginData({...loginData,[e.target.name]:e.target.value})
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(loginData)
    });

    const json = await response.json();
   if(json.success){
    // save the auth token and redirect
    localStorage.setItem('token',json.authToken)
    history.push('/')
    showAlert("Successfully login","success")
   }
   else{
    showAlert("invalid info","danger")
   }
  };
  return (
    <>
   
      <div className="container my-5">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={handleonChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleonChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
