import React from "react";
import Niv from "../../components/Niv";
//import "./addWaiter.css";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import Notification from "../../components/Notification";


const UpdateWaiter = () => {

  

    const [W_Id , setWid] = useState("");
    const [name , setName] = useState("");
    const [Email , setEmail] = useState("");
    const [address , setAddress] = useState("");
    const [phone_no , setPhone] = useState("");
    
    const history = useNavigate();

   const{id} = useParams();
   
    

    /* */
   
   useEffect(()=>{
    axios.get(`http://localhost:8070/waiter/${id} `).then((res)=>{
      setWid(res.data.W_Id)
      setName(res.data.name)
      setEmail(res.data.Email)
      setAddress(res.data.address)
      setPhone(res.data.phone_no)
      
    })
   } ,[]);
   
   
  /**/
   
  
  
  function Update(e) {
    e.preventDefault();
    
    const waiter = { W_Id, name, Email, phone_no, address};
  
    
      axios.put(`http://localhost:8070/waiter/update/${id}`, waiter).then(() => {
        toast.success("updated  successfully!");
        
        
      
      });
    
    history("/waiter");
  }



  return (
    <div>
      <ToastContainer position="top-right" theme="colored" />
      
    <Niv name="Waiter/ UpdateWaiter" />
    <Notification/>
    <div className="data">
    <div className="waiterAdd">
      <header>Update Waiter</header>

      <form className="waiteraddForm" onSubmit={Update}>
      <div class="fields">
              <div class="input-field">
                <label className="Id"> Waiter Id</label>
                <input type="text" placeholder="Waiter Id" readOnly  value={ W_Id}
                onChange={(e) => setWid(e.target.value)} required />
              </div>

              <div class="input-field">
                <label className="Name">Waiter Name</label>
                <input type="text" placeholder=" Waiter Name" value={name}
                onChange={(e) => setName(e.target.value)} pattern="[a-zA-Z]{1,30}"
                title="Name can only contain A-Z characters and should be less than or equal to 30 characters" required/>
              </div>

              <div class="input-field">
                <label className="email">Email</label>
                <input type="text" value={Email}  placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid email address in the format: example@domain.com"
                 required/>
              </div>

              <div class="input-field">
                <label className="address">Address</label>
                <input type="text" value={address}  placeholder="Address"
                onChange={(e) => setAddress(e.target.value)} pattern="[A-Za-z0-9'\.\-\s\,]{10,100}" required/>
              </div>

              <div class="input-field">
                <label className="phone">Phone Number</label>
                <input type="text" value={phone_no} placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)} 
                pattern="^[0-9]{10}$" title="Please enter a valid 10-digit phone number" required/>
              </div>

              

              

          </div>

         
        <button class="waiterbtn" type="submit">
          <span>Update</span>
        </button>
        
            
      </form>
        <a href="/Waiter">
        <button class="waiterbtn">
          <span>Back</span>
        </button>
        </a>
    </div>
    </div>
  </div>


  );
};

export default UpdateWaiter;
