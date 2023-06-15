import React from "react";
import Niv from "../../components/Niv";
import "./addMenu.css";
import axios from 'axios';
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";

const AddMenu = () => {

  const [id , setid] = useState("");
  const [name , setname] = useState("");

  const handleSubmit=(e)=>{

    if(!name){
      toast.error("Please fill all the required fields");
      return
    }

    e.preventDefault();
    let id=Cat_Id
  const Menu = {id,name,Image};
    axios.post("http://localhost:8070/menu/add",Menu)
    .then(()=>{
      toast.success("Added successfully")
      setid('')
      setname('')
    })
    .catch((err)=>{
      alert(err);
    })
  }

  const [CatId, setCategory_id] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8070/menu/CatId").then((res)=>{
      console.log(res.data)
      setCategory_id(res.data)
    });
  },[]);

  let Id = CatId.map((item) => item.category_Id);
  const Cat_Id = Number(Id)+1;

  return (
    <div>
      <ToastContainer position="top-right" theme="colored" />
      <Niv name="Menu" />
      <div className="data">
      <div className="menuAdd">
        <header>Add Category</header>

        <form className="MenuaddForm" onSubmit={handleSubmit}>
        <div class="fields">
                <div class="input-field">
                  <label className="Cat_Id">Category Id</label>
                  <input type="text" placeholder="Category Id" disabled value={Cat_Id}
                  onChange={(e) => setid(e.target.value)} />
                </div>

                <div class="input-field">
                  <label className="Cat_Name">Category Name</label>
                  <input type="text" placeholder="Category Name" value={name}
                  onChange={(e) => setname(e.target.value)} pattern="[a-zA-Z]{1,10}"
                  title="Name can only contain A-Z characters"/>
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

export default AddMenu;
