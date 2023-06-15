import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { MdInventory} from "react-icons/md"


const Customer = () => {
    const [ressum, setRessum] = useState();
    const [barsum, setbarsum] = useState();
  useEffect(() => {
    function getcount() {
      axios.get("http://localhost:8070/resInventory/sum").then((res) => {
        // console.log(res.data);
        setRessum(res.data[0].price);
        // console.log(orders[1]);
      });
    }
    getcount();
  }, []);

  useEffect(() => {
    function getcount() {
      axios.get("http://localhost:8070/BarInventory/sum").then((res) => {
        // console.log(res.data);
        setbarsum(res.data[0].price);
        // console.log(orders[1]);
      });
    }
    getcount();
  }, []);


    return (
        <div style={{display:"flex"}}>
        <div style={{flexGrow: '6',minWidth:'25%',maxWidth:'40%'}}><MdInventory style={{fontSize:'65px',marginTop:'15px',marginLeft:'13px'}}/></div>
        <div style={{flexGrow: '1'}}>
        <Card.Title><label style={{fontSize:'20px'}}>Inventory stock</label></Card.Title>
        <Card.Text>
        <label style={{fontSize:'14px'}}>
            Restaurant   : Rs.{ressum}/= <br/>
            Bar         : Rs.{barsum}/=<br/>
            <div style={{color:'#7A2FF8'}}> Total stock : Rs.{ressum+barsum}/=</div>
        </label>
        </Card.Text>
        </div>
    </div>
  )
};
export default Customer;