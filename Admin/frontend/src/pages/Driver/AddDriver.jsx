import React from "react";
import Niv from "../../components/Niv";
import "./addDriver.css";
import axios from 'axios';
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";

const AddDriver = () => {

  const [id , setid] = useState("");
  const [name , setname] = useState("");
  const [email , setemail] = useState("");
  const [address , setaddress] = useState("");
  const [phone_no , setphone_no] = useState("");
  
  const history = useNavigate();

  
  useEffect(() => {
    setid(Math.floor(1000 + Math.random() * 9000)); // generates a random 4-digit number
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault();

    if (!id || !name || !email||!address|| !phone_no) {
      toast.error("Please fill in all inputs");}
    else{
      const Driver = {id,name,email,address,phone_no};
    axios.post("http://localhost:8070/driver/add",Driver)
    .then(()=>{
      toast.success("Driver added successfully!");
      setid(uuidv4().split("-")[0]);
      setname('')
      setemail('')
      setaddress('')
      setphone_no('')
      
      
    })
    .catch((err)=>{
      alert(err);
    })
    history('/driver');
    }
  
  }

  return (
    <div>
      <ToastContainer position="top-right" theme="colored" />
      <Niv name="Driver/ Add Driver" />
      <div className="data">
      <div className="menuAdd">
        <header>New Driver</header>

        <form className="MenuaddForm" onSubmit={handleSubmit}>
        <div class="fields">
                <div class="input-field">
                  <label className="D_Id">Driver Id</label>
                  <input type="text" placeholder="Driver Id" readOnly value={id}
                  onChange={(e) => setid(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="D_name">Driver Name</label>
                  <input type="text" placeholder="Driver Name" value={name}
                  onChange={(e) => setname(e.target.value)} pattern="[a-zA-Z]{1,30}"
                  title="Name can only contain A-Z characters and should be less than or equal to 30 characters" />
                </div>

                <div class="input-field">
                  <label className="D_email">Email</label>
                  <input type="text" placeholder="Email" value={email}
                  onChange={(e) => setemail(e.target.value)} pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Please enter a valid email address in the format: example@domain.com" />
                </div>

                <div class="input-field">
                  <label className="D_address">Address</label>
                  <input type="text" placeholder="Address" value={address}
                  onChange={(e) => setaddress(e.target.value)} pattern="[A-Za-z0-9'\.\-\s\,]{10,100}" />
                </div>

                <div class="input-field">
                  <label className="D_phone">Phone Number</label>
                  <input type="text" placeholder="Phone Number" value={phone_no}
                  onChange={(e) => setphone_no(e.target.value)} pattern="^[0-9]{10}$"
                  title="Please enter a valid 10-digit phone number" />
                </div>

                

            </div>

              <button class="Menubtn" type="submit" >
                <span>Add</span>
              </button>
        </form>
          <a href="/Menu">
          <button class="Menubtn">
            <span>Cancel</span>
          </button>
          </a>
      </div>
      </div>
    </div>

  );
};

export default AddDriver;
