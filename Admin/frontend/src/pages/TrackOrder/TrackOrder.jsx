import React, { useEffect, useState } from "react";
import axios from "axios";
import Niv from "../../components/Niv";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from 'prop-types'
import	SmallMap from '../Map/SmallMap'
import Notification from "../../components/Notification";

const TrackOrder = props => {
  const [orders, setOrders] = useState([]);
  useEffect((event) => {
      axios.get("http://localhost:8070/order/").then((res) => {
        //console.log(res.data);
        setOrders(res.data);
        // console.log(orders[1]);
      });
  }, []);

  const deleteRecord = (id,dMail) => {

    var stat = {
      status : "Idle"
    }
    axios.delete(`http://localhost:8070/order/deleteOrderRecord/${id}`)
      .then((res)=> console.log(res))
      .catch((err) => console.log(err));

    // axios.put(`http://localhost:8070/driver/updateStatusAfterDelete/${dMail} ` , stat)
    // .then((res)=> console.log(res))
    // .catch((err) => console.log(err));
         
    toast.success("Order is yours. You have started the clock.")
    window.location.reload(); 
  };

  const handleMapShow = (order) => {
    const id = order.order_id
    var val = document.getElementById("btn"+id).innerHTML

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


  return (

    <div>
      <Niv name="Order History" />
      <Notification/>
      <div className="data">
      <ToastContainer position="top-right" theme="colored" /> 
        <table className="ResDelDesc">
          <thead>
            <tr className="tbl-head">
              <td className="del-tbl-head">Order ID</td>
              <td className="del-tbl-head">Customer Name</td>
              <td className="del-tbl-head">Price</td>
               <td className="del-tbl-head">Date/time</td>
               
              {/* <td className="del-tbl-head">Diliver Location</td>
              <td className="del-tbl-head">Avg Distance</td>
              <td className="del-tbl-head">Avg Time for Trip</td> */}
               <td className="del-tbl-head">View Location</td>

              <td className="del-tbl-head">Picked up at</td>
              <td className="del-tbl-head">Delivered at</td>
              <td className="del-tbl-head">Status</td>
              <td className="del-tbl-head">Delivery Person </td>
              <td className="del-tbl-head">Delivery Person P.N</td>
              <td className="del-tbl-head">Delivery Start Code</td>
              <td className="del-tbl-head">Delivery End Code</td>
              <td className="del-tbl-head">Delete</td>
            </tr>
          </thead>
          <tbody>
            {orders .filter((val) => {
                if(val.location !=null && val.location !="" ){
                  if(val.phnNum !=null){
                      return val;
                  } 
              }    
          
          }).map((order, index) => (
             
              <tr key={index}>
                <td>{order.order_id}</td>
                <td>{order.cus_id}</td>
                <td>{order.amout}</td>
                <td>
                  {order.date} - {order.time}
                </td>
                {/* <td>{order.location}</td>
                <td>{order.distance}</td>
                <td>{order.duration}</td> */}

                <td>
                  <p hidden={false} id="locationTag">{order.location}</p>
                  <button  id={"btn"+order.order_id}
                    onClick={(e) => handleMapShow(order)} 
                    className="middlebtns"
                    style={{ margin:"Auto Auto" }}>   
                    View on Map
                  </button> 

                  <div  
                    id={order.order_id}
                    className="mapArea" 
                    hidden={true} >
                    <SmallMap id={order.location}></SmallMap>
                  </div>
                </td>

                <td>{order.startTime}</td>
                <td>{order.endTime}</td>
                
                <td>{order.status}</td>
                <td>{order.deliverPersonEmail}</td>

                <td>{order.deliverPersonPhn}</td>
                <td>{order.startCode}</td>
                <td>{order.endCode}</td>

                <td>
                  <button
                      className='middlebtns' 
                      type="button"
                      onClick ={() => deleteRecord(order._id,order.deliverPersonEmail)} 
                      style={{marginRight:"20px"}}>
                        DELETE
                  </button>
                </td>
                
              </tr>
              
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

TrackOrder.propTypes = {}

export default TrackOrder