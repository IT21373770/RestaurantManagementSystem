import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {Link, useNavigate} from 'react-router-dom';
import "../styles/authScreens.css";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const customStyle = { marginTop: "30px" };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [driver, setdriver] = useState([]);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {

    function getdriver() {
      axios.get("http://localhost:8070/driver/").then((res) => {
        setdriver(res.data);
      });
    }
    getdriver();
  }, []);

  
  function  handleButtonClick  ()  {
 
    if (username.length>=1&& password.length>=1){
    driver.filter((val) => {
      if (val.Email.includes(username) && val.password.includes(password)) {
        const id = val._id
        localStorage.setItem('loggedUserID',JSON.stringify(id))
        navigate('/home',{state: {loggedUserID : id}});
        setError("Loging in.....");
      }else{
         setError("Waiting......");
         setTimeout( function() { setError("Looks like credentials are invalid. Please check again.") }, 3000);
      }
    })
  }
  else{
    setError("please set correct username and password");
  }

  };

  useEffect(() => {
    let loginInfo = localStorage.getItem("loginInfo");
    if (!loginInfo)
      localStorage.setItem(
        "loginInfo",
        JSON.stringify({
          email: "user@email.com",
          password: "1234",
          name: "User",
        })
      );
  }, []);

  
  return (
    <div className="container">
      <ToastContainer position="top-right" theme="colored" /> 
      <div className="card-wrapper">
        <div className="content-card">
          <div className="side">
            <div className="form-container">
              <TextInput
                label="Email"
                type="email"
                placeholder="john@xyz.com"
                action={handleEmailChange}
               
              />
              <TextInput
                label="Password"
                type="password"
                placeholder="******"
                action={handlePasswordChange}
                error={error}
                
              />
             
              <Button
                text="Sign In"
                customStyle={customStyle}
                action={handleButtonClick}
              />
              
            </div>
          </div>
          <div className="side image-side">
            <div className="image-side-content">
              <span className="title">Sign In</span>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
