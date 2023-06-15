import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Foodlist = (props) => {
  
  const id=props.id;
  const url="http://localhost:8070/orderfood/findone/"+id
  const[foodlists,setFoodlists] = useState([]);
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
    <div>
      <center>
           <table>
                 <thead className="stk-tbl-head">
                <tr>
                  <th className="stk-view-tbl">Food Name</th>
                  <th className="stk-view-tbl">Quantity</th>
                 
                </tr>
            {foodlists.map((foodlists, index) => (
                 <>
            
                <tr>
                  <td>{foodlists.food_id}</td>
                  <td>{foodlists.qty}</td>
                </tr>
              
                  
                     </>
                 
                ))}
       </thead>
                 </table>
                 </center>
      
      
        </div>
      
  );
};

export default Foodlist ;
