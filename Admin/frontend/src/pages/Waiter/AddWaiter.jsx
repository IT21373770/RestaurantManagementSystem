import React from "react";
import Niv from "../../components/Niv";
import "./waitercss.css";
import axios from 'axios';
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import Notification from "../../components/Notification";

const AddWAiter = () => {

  const [id , setId] = useState("");
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [address , setAddress] = useState("");
  const [phone , setPhone] = useState("");
  const [password , setPassword] = useState("");
  const [status , setStatus] = useState("");
  const history = useNavigate();

  useEffect(() => {
    setId(Math.floor(1000 + Math.random() * 9000)); // generates a random 4-digit number
  }, []);

  
  
  const handleSubmit=(e)=>{
    e.preventDefault();

    if (!id || !name || !email||!address|| !phone ) {
      toast.error("Please fill in all inputs");
    }else{

  const Waiter = {id,name,email , address , phone };

    axios.post("http://localhost:8070/waiter/add",Waiter)
    .then(()=>{
      toast.success("Waiter added successfully!");
      console.log('added')
      setId(uuidv4().split("-")[0]);
      setName('')
      setAddress('')
      setEmail('')
    
      
    })
    .catch((err)=>{
      alert(err);
      console.log(err)
    })
    history('/waiter');
  }

  }

  return (
    <div>
      <ToastContainer position="top-right" theme="colored" />
      
      <Niv name="Waiter/ AddWaiter" />
      <Notification/>
      <div className="data">
      <div className="waiterAdd">
        <header>Add Waiter</header>

        <form className="waiteraddForm" onSubmit={handleSubmit}>
        <div class="fields">
                <div class="input-field">
                  <label className="Id"> Waiter Id</label>
                  <input type="text"  placeholder="Waiter Id"  readOnly value={id}
                  onChange={(e) => setId(e.target.value)} pattern="[0-9]{3}" 
                  title="Waiter ID should be a 3-digit number" />
                  
                </div>

                <div class="input-field">
                  <label className="Name">Waiter Name</label>
                  <input type="text" placeholder=" Waiter Name"  value={name}
                  onChange={(e) => setName(e.target.value)} pattern="[a-zA-Z]{1,30}"
                  title="Name can only contain A-Z characters and should be less than or equal to 30 characters"
                   />                                    
                </div>

                <div class="input-field">
                  <label className="email">Email</label>
                  <input type="text" value={email}  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)} pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Please enter a valid email address in the format: example@domain.com"  />
                </div>

                <div class="input-field">
                  <label className="address">Address</label>
                  <input type="text" value={address}  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)} pattern="[A-Za-z0-9'\.\-\s\,]{10,100}" />
                </div>

                <div class="input-field">
                  <label className="phone">Phone Number</label>
                  <input type="text" value={phone} placeholder="Phone Number"
                  onChange={(e) => setPhone(e.target.value)} pattern="^[0-9]{10}$"
                  title="Please enter a valid 10-digit phone number" />
                </div>

            </div>

          



              <button class="waiterbtn" type="submit" >
                Add
              </button>
        </form>
          <a href="/Waiter">
          <button class="waiterbtn">
            <span>Cancel</span>
          </button>
          </a>
      </div>
      </div>
    </div>

  );
};

export default AddWAiter;
