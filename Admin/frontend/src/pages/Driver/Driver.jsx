import React, { useEffect, useState } from "react";
import axios from "axios";
import Niv from '../../components/Niv';
import "./driver.css"
import { useNavigate , Link} from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import Notification from "../../components/Notification";
//import soup from './soup.jpeg'

const Driver = () => {
  const [driver, setdriver] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useNavigate();

  useEffect(() => {
    function getdriver() {
      axios.get("http://localhost:8070/driver/").then((res) => {
        // console.log(res.data);
        setdriver(res.data);
        // console.log(orders[1]);
      });
    }
    getdriver();
  }, []);

  function Finddata(index){
    // document.getElementsByClassName("data")[index].hidden=false
    document.getElementById(index).hidden=false
  }

  function deleteRow(D_Id){
    const dlte =
    "http://localhost:8070/driver/delete/" + D_Id ;
    // alert(dlte);

    axios
      .delete(dlte)
      .then(() => {
        
      })
      .catch(err => {
        alert("error deleting");
    });
    toast.success("Deleted successfully!");
  };

  return (
    <div>
    <ToastContainer position="top-right" theme="colored" />
    
    <Niv name='Driver'/>
    <Notification/>
    <div className='data'>
    <h1 className='title'>Drivers</h1>

    <input type="text" style={{ height: "40px"  , marginLeft:"30px" , background:"#edeef1 " , border:"white" , paddingLeft:"10px" }} placeholder=" Search Drivers..." onChange={(event) => {
        setSearchTerm(event.target.value);
      }} />
   
    <div class="tbl-header">
      <a href="Driver/AddDriver">
      <button class="add_driver">+ New Driver</button>
      </a>

      <table className="driver-tbl" cellpadding="0" cellspacing="0" border="0">
        <thead>
            <tr>
            <th className='driver-th'>Driver ID </th>
            <th className='driver-th'>Name</th>
            <th className='driver-th'>Email</th>
            <th className='driver-th'>Address</th>
            <th className='driver-th'>Phone Number</th>
            
           
            
            <th className='driver-th'>Action</th>
            </tr>
        </thead>

        <tbody>
            
        {driver.filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        }).map((driver,index) =>(
          <>
          <tr  onClick={()=>Finddata(index)}>
          <td>{driver.D_Id}</td>
          <td>{driver.name}</td>
          <td>{driver.Email}</td>
          <td>{driver.address}</td>
          <td>{driver.phone_no}</td>
         
          
          <td>
            <Link to={`/Driver/UpdateDriver/${driver._id} `}>
            <button className='edit'>Edit</button>
            </Link>
            <a href = "/driver" >
            <button className='del' onClick={(e)=> deleteRow(driver._id)}>Delete</button>
            </a>
          </td>
          </tr>
          
          </>
        ))}
        </tbody>
      </table>
    </div>
    </div> 
</div>
);
};

export default Driver;