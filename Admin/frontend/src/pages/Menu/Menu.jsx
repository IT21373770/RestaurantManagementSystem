import React, { useEffect, useState } from "react";
import axios from "axios";
import Niv from '../../components/Niv';
import "./menu.css"
import soup from './soup.jpeg'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../../components/Notification";

const Menu = () => {
  const [product, setProduct] = useState([]);
  const [name, setname] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    function getproduct() {
      axios.get("http://localhost:8070/menu/").then((res) => {
        // console.log(res.data);
        setProduct(res.data);
        // console.log(orders[1]);
      });
    }
    getproduct();
  }, []);

  function deleteRow(category_Id){
    const dlte =
    "http://localhost:8070/menu/delete/" + category_Id ;
    // alert(dlte);

    axios
      .delete(dlte)
      .then(() => {
        toast.success("deleted successfully");
        window.location.reload()
      })
      .catch(err => {
        alert("error deleting");
    });
  };
function editrow(index ,id){
  var x= document.getElementsByClassName("edit")[index].innerHTML
  if (x == "Edit") {

  document.getElementsByClassName("row")[index].disabled=false
  document.getElementsByClassName("edit")[index].innerHTML="save"
  }
  else{
    alert(name)
    const new_produst = {
      name
    };
    axios
      .put(`http://localhost:8070/menu/update/${id}`, new_produst)
      .then(() => {
        // alert("food add");
        toast.success("delete ok");
        window.location.reload()
       
      })
      .catch((err) => {
        alert(err);
      });

  }
}
    return (
        <div>
        <Niv name='Category'/>
        <Notification/>
        <div className="data">
         <h1 className='title'></h1>
        <div class="tbl-header">
        <input type="text" style={{ height: "40px", borderColor:"rgba(53, 39, 68, 1)",margin:"20px" }} placeholder=" Search Categories..." onChange={(event) => {
            setSearchTerm(event.target.value);
          }} />
          <a href="Menu/addMenu">
          <button class="add_pdct">+ New Category</button>
          </a>

          <table className="menu-tbl" cellpadding="0" cellspacing="0" border="0">
            <thead>
                <tr>
                <th className='menu-th'>Category Id</th>
                <th className='menu-th'>Category Name</th>
                <th className='menu-th'>Action</th>
                </tr>
            </thead>

            <tbody>
              {product.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.Name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            }).map((product,index) => (
              <tr>
              <td>{product.category_Id}</td>
              <td>
                { <input type="text" className="row" placeholder={product.Name} disabled 
                 onChange={(event) => {setname(event.target.value);} }/>

                 }
            </td>
              <td>
                <button className='edit' onClick={()=> editrow(index,product.category_Id)} role="button">Edit</button>
                <button className='del' onClick={(e)=> deleteRow(product.category_Id)}>Delete</button>
              </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>

  {/*<div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
        <tr>
          <td>P001</td>
          <td>
            <img src='src\pages\Menu\soup.jpeg'/>
          </td>
          <td>Soup</td>
          <td>Rs.850</td>
          <td>
            <button className='edit'>Edit</button>
            <button className='del'>Delete</button>
          </td>
        </tr>

      </tbody>
    </table>
    </div>*/}
    </div>
  </div>
    );
};

export default Menu;