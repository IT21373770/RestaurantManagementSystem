import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import ReactToPrint from "react-to-print";
import "./Notification.css";
import Table from './kot';
import Button from "@mui/material/Button";
import { margin } from '@mui/system';



// const print

const Notification = () => {
  const [items, setItems] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [type, setType] = useState(false);
  const [barInventory, setBarInventory] = useState([]);

  const [lowStockBar, setLowStockBar] = useState([]);
  


  useEffect(() => {
    axios.get('http://localhost:8070/barInventory/').then((response) => {
      setBarInventory(response.data);
    });
  }, []);

  useEffect(() => {
    const lowStockBar = barInventory.filter(
      (item) => parseInt(item.Quantity )< parseInt(item.Re_Order_Level)+12
    );
    setLowStockBar(lowStockBar);
  }, [barInventory]);


  useEffect(() => {
    axios.get('http://localhost:8070/resInventory/').then((res) => {
      setItems(res.data);
    });
  }, []);

  useEffect(() => {
    const lowStockItems = items.filter((item) => item.Quantity <= parseInt(item.Re_Order_Level)+10);
    setLowStockItems(lowStockItems);
  }, [items]);

  useEffect(() => {
    axios.get('http://localhost:8070/order/').then((res) => {
      const orders = res.data.filter((order) => order.type === 'Delivery' && order.status === 'pending'&& order.w_id ==='-1'      );
      setDeliveryOrders(orders);
    });
  }, []);
  
  const kot = useRef();

  function select(index){
    if (type==false){
      document.getElementById(index).hidden=false
      setType(true)
      return
    }
    else{
      document.getElementById(index).hidden=true
      setType(false)
      return
    }

  }
  return (
    
    <div className="Notification">
      
      <ul hidden id="notification">
        {deliveryOrders.map((order,index) => (
          <div>

              <li
                onClick={() => select(index) }
                key={order._id}
                className="notification-item delivery-pending"
              >
                <span className="notification-message">
                  <strong>Order {order.order_id}</strong> is pending for
                  delivery
                </span>
              </li>


<div hidden id={index}>
          <ReactToPrint
          content={() => kot.current}
            focus={true}
            trigger={() => (
              <Button>
                Print Bill
              </Button>
            )}
            // content={() => kot.current}
            onAfterPrint={() => window.location.reload(false)}
            
          />

          <div ref={kot} style={{background:"white", margin:"5px", padding:"5px"}}>
          <Table
          invoiceNumber={order.order_id}
          invoiceDate={order.date}
          time={order.time}
        
          
          
          />
          </div>

           
</div>
          </div>



        ))}
        {lowStockItems.map((item) => (
          <li key={item._id} className="notification-item low-stock">
            <span className="notification-message">
              <strong>{item.Item_Name}</strong> is low in stock ({item.Quantity}{" "}
              {item.unit} left)
            </span>
          </li>
        ))}

        {lowStockBar.map((item) => (
                  <li key={item._id} className="notification-item low-stockbar">
                    <span className="notification-message">
                      <strong>{item.Product_Name}</strong> is low in stock ({item.Quantity}  left)
                    </span>
                  </li>
                ))}
              </ul>


      
    </div>
  );
};

export default Notification;
