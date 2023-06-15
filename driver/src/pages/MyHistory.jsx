import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import axios from "axios";
import './Index.css';

const MyHistory = props => {
const [user,setUser] = useState("")
const [orders, setOrders] = useState([]);

useEffect((props) => {
    if(props!=null){
        setUser(props)
    }  
    try{
        axios.get("http://localhost:8070/order/").then((res) => {     
            //console.log(res.data)
            setOrders(res.data);  
        });
    }catch(err){
        console.log(err)
      }
  }, [props]);

  return (
      <div> 
        <h3>
            MyHistory
        </h3>
        <table  className="mainTable">

            <thead>
                <tr>
                    <th  className="del-tbl-head">Order ID</th>
                    <th className="del-tbl-head">Date</th>
                    <th className="del-tbl-head">Location</th>
                    <th className="del-tbl-head">Distance</th>
                    <th className="del-tbl-head">Duration</th>
                    <th className="del-tbl-head">Start Time</th>
                    <th className="del-tbl-head">End Time</th>
                    <th className="del-tbl-head">Completion Time</th>
                 
                </tr>
            </thead>
            <tbody>
        {orders
          .filter((val) => {
           
            if (val.type=="Delivery") {
                if(val.status =="delivered" ){
                    if (val.driverID == props.id._id){
                        return val;
                    }
                }     
              }
          }).map((order, index) => {
            const endtimeString = order.endTime
            const starttimeString = order.startTime
            const [endhours, endminutes] = endtimeString.split(":").map((time) => parseInt(time, 10));
            const [starthours, startminutes] = starttimeString.split(":").map((time) => parseInt(time, 10));
            const hours = endhours - starthours
            const minutes = endminutes - startminutes
            return (
                <tr key={index}
                style={{backgroundColor:"white"}}
                >
                    <td className="homeTD">{order.order_id}</td>
                    <td className="homeTD">{order.date}</td>
                    <td className="homeTD">{order.location}</td>
                    <td className="homeTD">{order.distance}</td>
                    <td className="homeTD">{order.duration}</td>
                    <td className="homeTD">{order.startTime}</td>
                    <td className="homeTD">{order.endTime}</td>
                    <td className="homeTD">{`${hours} hours ${minutes} minutes`}</td>
                </tr>
            );
        })}
        </tbody>
        </table>
    </div>
  )
}

MyHistory.propTypes = {}

export default MyHistory