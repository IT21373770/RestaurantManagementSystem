import React, { useEffect, useState } from "react";
import axios from "axios";
import './Index.css';
import SmallMap from "./SmallMap.jsx"
import {Link, useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useLocation} from 'react-router-dom';
import MyHistory from "./MyHistory";
//import { Toast } from "react-toastify/dist/components";

const Home = () => {

const [orders, setOrders] = useState([]);
const navigate = useNavigate();
const user = useLocation();
const [loggedUser,setLoggedUser] = useState("")
const [showHistory, setShowHistory] = useState(false);


useEffect(() => {
    try{
      axios.get("http://localhost:8070/order/").then((res) => {     
        //console.log(res.data)
        setOrders(res.data);  
      });

      const id2 = JSON.parse(localStorage.getItem('loggedUserID'));
      //const lUser2 = user.state.loggedUserID

      axios.get(`http://localhost:8070/driver/FindDriver/${id2}`).then((res) => {     
       // console.log(res.data)
      setLoggedUser(res.data); 
     
      });

    }catch(err){
      console.log(err)
    }

}, []);

  // function driverUpdater(){
  //   try{
  //     const datas = JSON.parse(localStorage.getItem('userData'));
  //     axios.get(`http://localhost:8070/driver/getNewData/${datas._id}`)
  //     .then((res) => {     
  //      // console.log(res.data)
  //       localStorage.setItem('userData',JSON.stringify(res.data))
  //       setAllDriverData(res.data)
  //      //setNewDriver(res.data)
  //      });
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  
const handleMapShow = (order) => {
  const id = order.order_id
  const sts = order.status
  var val = document.getElementById("btn"+id).innerHTML

  if(sts == "delivering" ){
    document.getElementById("tdbtn"+id).innerHTML = "View My Order"
  }

  if(val=="View on Map"){
    document.getElementById(id).hidden=false;
    document.getElementById("btn"+id).innerHTML = "Close Map"
    document.getElementById("locationTag").hidden=true;
  }else{
    document.getElementById(id).hidden=true;
    document.getElementById("btn"+id).innerHTML = "View on Map"
    document.getElementById("locationTag").hidden=false;
  }
};

function logOut () {
  const empt = "logout"
  localStorage.setItem('loggedUserID',JSON.stringify(empt))
  localStorage.setItem('orderID',JSON.stringify(empt))
  window.location.href = "/sign";
};

async function navigateToMap  (order) {
  const id2 = JSON.parse(localStorage.getItem('loggedUserID'));
  const id1 = order._id
  localStorage.setItem('orderID',JSON.stringify(id1))
  await toast.success("Redirecting");
  setTimeout( function() {  navigate('/map',{state: {loggedUserID:{id2}, orderID:{id1}}}); }, 10);
 
};
const toggleHistory = () => {
  setShowHistory(!showHistory);
};


if(!orders || !loggedUser) {
  return <div><h1>Please Log in First</h1></div>
}else
{
return (
  
  <div className="mainPage">
      <ToastContainer position="top-right" theme="colored" /> 
      <div>
      <div style={{ marginBottom:"0.5rem", backgroundColor:"orange" , padding:"0.3rem"}}>
          <h3> Welcome {loggedUser.Email} here are the pending orders </h3> 
        </div>
        <button 
            onClick={()=>logOut()} 
            className="logoutbtn"
            style={{  marginRight:"3rem", width:"10rem", margin:"Auto Auto"}}>   
            LOG OUT   
        </button>

        <button 
            onClick={toggleHistory} 
            className="logoutbtn"
            style={{ marginLeft:"3rem", width:"10rem",margin:"Auto Auto"}}>   
          {showHistory ? "HIDE HISTORY" : "MY HISTORY"}
        </button>
        {showHistory &&  <MyHistory id={loggedUser}></MyHistory>}

      </div>
     
      <table className="mainTable">
          <thead>
            <tr>
            <th id="tableHeading" hidden={true} colSpan={8} style={{textAlign:"center"}} className="del-tbl-head">My Delivery </th>
            </tr>
            <tr className="tbl-head">
                <th className="del-tbl-head">Order ID</th>
                <th className="del-tbl-head">Placed Time</th>
                <th className="del-tbl-head">Price</th>
                <th className="del-tbl-head">Customer Email</th>
                <th className="del-tbl-head">Customer Phone Number</th>          
                <th className="del-tbl-head">View on Map</th>          
                <th className="del-tbl-head"
                    style={{
                    maxHeight:"20rem", minWidth:"20rem", 
                    margin:"Auto Auto", margin:"Auto Auto",
                    maxWidth:"20rem",minHeight:"20rem"}}>Customer Location</th>
                <th className="del-tbl-head">Take Delivery</th>
                
            </tr> 
          </thead>
        <tbody>
   
          
      {orders
          .filter((val) => {
            if (val.type=="Delivery") {
              if(val.location !=null && val.location !="" ){
                if(val.phnNum !=null){
                  if(val.status =="pending" && loggedUser.status=="Idle"){
                    return val;
                  }
                  const id2 = JSON.parse(localStorage.getItem('loggedUserID'));
                  if(val.driverID== id2 && val.status =="delivering"){
                    return val;
                  }
                  
                }
              }    
            }

          }).map((order, index) => (
    
            <tr className="homeTR" key={index} >

              <td className="homeTD">{order.order_id}</td>

              <td className="homeTD">
                {order.date} - {order.time}
              </td>             
              <td className="homeTD">{order.amout}</td>
              
              <td className="homeTD">{order.cus_id}</td>

              <td className="homeTD">{order.phnNum}</td>

              <td style={{ textAlign:"center"}}>

              <button  id={"btn"+order.order_id}
              onClick={(e) => handleMapShow(order)} 
                  className="middlebtns"
                  style={{ margin:"Auto Auto"}}>   
                  View on Map
              </button> 
              </td> 
  
              <td className="homeTD" style={{ textAlign:"center", margin:"0 0 0 0"}}>
                  <span hidden={false} id="locationTag" style={{ margin:"Auto Auto"}}>{order.location}</span>
                  <div
                      id={order.order_id}
                      className="mapArea" 
                      hidden={true} 
                          style={{
                              minHeight:"20vh", minWidth:"25vh", 
                              margin:"Auto Auto", margin:"Auto Auto", paddingTop:"1rem"}}
                  >
                  <div>
                  <SmallMap id={order.location}>
                  </SmallMap>
                  </div>                                   
                  </div>
              </td>   

              <td className="homeTD" style={{ textAlign:"center"}}>

                    {/* 
                    <button 
                      className="middlebtns" 
                      onClick={()=>{navigateToMap(order)}} 
                      style={{ alignContent:"Left",  margin:"Auto Auto"}}>   
                      Take Delivery
                    </button>  */}

                    <button 
                      id={"tdbtn"+order.order_id}
                      className="middlebtns" 
                      onClick={() => {
                      const confirmBox = window.confirm(
                          "Do you wish to go tothe Detailed Map View ?"
                      )
                      if (confirmBox === true) {
                        navigateToMap(order)
                    }}}>
                      Take Delivery
                    </button>


                                  
              </td>        
            </tr>
                  
          ))}

          </tbody>
        </table>
    
  </div>

    )
  }
}
export default Home