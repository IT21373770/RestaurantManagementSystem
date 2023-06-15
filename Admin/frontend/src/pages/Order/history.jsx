import React, { useEffect, useState } from "react";
import axios from "axios";
import Niv from "../../components/Niv";
import Foodlist from "./foodlist";
import Notification from "../../components/Notification";

import "./Order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    function getorder() {
      axios.get("http://localhost:8070/order/").then((res) => {
        // console.log(res.data);
        setOrders(res.data);
        // console.log(orders[1]);
      });
    }
    getorder();
  }, []);

  const [Term, setTerm] = useState(true);

  function show(id){
  if(Term==true){
      document.getElementById(id).hidden=false
      setTerm(false)
      return
  }else{
    document.getElementById(id).hidden=true
      setTerm(true)
      return
  }

  }
  return (
    <div>
      <Niv name="Order History" />
      <Notification/>
      <div className="data">
        
        <div
          style={{
            minWidth: 230,
            marginTop: "80px",
            backgroundColor: "white",
            borderRadius: "9px",
          }}
        >
          <table className="ResDelDesc">
            <thead>
              <tr className="tbl-head">
                <td className="del-tbl-head">Order ID</td>
              
                <td className="del-tbl-head">amount</td>
                <td className="del-tbl-head">Date/time</td>
                <td className="del-tbl-head">Waiter Name</td>

                <td className="del-tbl-head">type</td>
                <td className="del-tbl-head">Customer</td>
              </tr>
            </thead>

            {orders.map((order, index) => (
              <>
              <tr key={index} onClick={()=>show(index)}>
                <td>{order.order_id}</td>
               
                <td>{order.amout}</td>
                <td>
                  {order.date} - {order.time}
                </td>
                <td>{order.w_id}</td>

                <td>{order.type}</td>
                <td>{order.cus_id}</td>
              </tr>
              <tr id={index} hidden >
                 <td colSpan={6} id="his">
                  <Foodlist id={order.order_id} />
                </td>
              </tr>
              </>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
