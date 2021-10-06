import React, { useState } from "react";
import Navbar from "./Navbar";
import { useHistory } from "react-router";
const Signup = ({showAlert}) => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const history = useHistory();
  const handleonChange = (event) => {
    setSignupData({ ...signupData, [event.target.name]: event.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    // ------------Submit API Call--------------
    const url = `http://localhost:5000/api/auth/createuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(signupData)
    });

    const json = await response.json();
 
      // ------------Submit API Call End--------------

      if(json.success){
        // save the auth token and redirect
        localStorage.setItem('token',json.authToken)
        history.push('/')
        showAlert("account created successfully","success")
       }
       else{
        showAlert(json[0].msg,"danger")
       }
    
  };
  return (
    <>

      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleonChange}
              minLength={5}
              required
            />
          </div>

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
              required
              autoComplete="false"
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
              minLength={5}
              autoComplete="false"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            
          >
            Signup
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
