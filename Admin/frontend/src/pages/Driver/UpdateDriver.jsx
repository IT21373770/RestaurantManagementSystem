import React from "react";
import Niv from "../../components/Niv";
import "./addDriver.css";
import axios from 'axios';
import { useState, useRef, useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";

const UpdateDriver = () => {

  const [D_Id , setid] = useState("");
  const [name , setname] = useState("");
  const [Email , setemail] = useState("");
  const [address , setaddress] = useState("");
  const [phone_no , setphone_no] = useState("");
  
  const history = useNavigate();

  const{id} = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:8070/driver/${id} `).then((res)=>{
      setid(res.data.D_Id)
      setname(res.data.name)
      setemail(res.data.Email)
      setaddress(res.data.address)
      setphone_no(res.data.phone_no)
      
    })
   } ,[]);
 
   const driver ={ D_Id , name , Email , phone_no  , address  }
  
  function Update(e){
      e.preventDefault()
      axios.put(`http://localhost:8070/driver/update/${id} ` ,driver ).then(()=>{
        toast.success("Driver Updated successfully!");
     
      })
      history('/driver')
  }


  return (
    <div>
      <Niv name="Driver/ Update Driver" />
      <div className="data">
      <div className="menuAdd">
        <header>Update Driver</header>

        <form className="MenuaddForm" onSubmit={Update}>
        <div class="fields">
                <div class="input-field">
                  <label className="D_Id">Driver Id</label>
                  <input type="text" placeholder="Driver Id" value={D_Id}
                  onChange={(e) => setid(e.target.value)} readOnly/>
                </div>

                <div class="input-field">
                  <label className="D_name">Driver Name</label>
                  <input type="text" placeholder="Driver Name" value={name}
                  onChange={(e) => setname(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="D_email">Email</label>
                  <input type="text" placeholder="Email" value={Email}
                  onChange={(e) => setemail(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="D_address">Address</label>
                  <input type="text" placeholder="Address" value={address}
                  onChange={(e) => setaddress(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="D_phone">Phone Number</label>
                  <input type="text" placeholder="Phone Number" value={phone_no}
                  onChange={(e) => setphone_no(e.target.value)}/>
                </div>

                

            </div>

              <button class="Menubtn" type="submit" >
                <span>Update</span>
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

export default UpdateDriver;
