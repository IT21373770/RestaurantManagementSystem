
import React from "react";
import "../pages/Order/Order.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Table({  invoiceNumber, invoiceDate ,time}) {


    const url="http://localhost:8070/orderfood/findone/"+invoiceNumber
    const[foodlist,setFoodlists] = useState([]);
    useEffect(() => {
        function getfoodlist(){
            axios.get(url).then(res=>{
              console.log(res.data);
              setFoodlists(res.data);
            // console.log (orders[1])
              
            });
        }
        getfoodlist();
    },[])


  return (

    
    <div style={{ maxWidth: "174px", fontSize: "12px" }}>
     <br/><br/>
     <center>
     ########<b>Delivery</b>########
     </center>
     <p>
      No :{invoiceNumber} <br/>
      
      Printed : {invoiceDate} - {time} <br/>
      <label htmlFor="" style={{fontSize:"15px"}}>ITEM NAME</label>
      <label htmlFor="" style={{fontSize:"15px",paddingLeft:"60px"}}>UNIT</label>
     </p>


      <table style={{ fontSize: "11px" }}>
       
        {foodlist.map((item) => (
          <>
          <React.Fragment >
          
           
          <div style={{ display: "flex", position: "relative", minWidth:"160px",fontSize:"15px"}}>
                <div>
                  <label htmlFor="invoiceNumber">
                  {item.food_id}
                  </label>
                </div>

                <div style={{ position: "absolute", right: "0px" }}>
                  <label htmlFor="invoiceDate">
                  {item.qty}
                  </label>
                </div>
              </div>
           
          </React.Fragment>
          
          </>
        ))} 
      </table>
      
      
    </div>
  );
}