
import Niv from '../../components/Niv';
import { Button ,Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './foodcss.css';
import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Prev } from "react-bootstrap/esm/PageItem";
import Notification from "../../components/Notification";
import TheChart from './chart.jsx'
import {
    Chart,
    Series,
    CommonSeriesSettings,
    Legend,
    Export,
  } from "devextreme-react/chart";

   
const ViewDish = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [dishes, setDishes] = useState([]);
    const [orderDishes, setOrderDishes] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [updatedDish, setupdatedDish] = useState({});
    const [showChart, setShowChart] = useState(false);

    useEffect(() =>{
        axios
        .get("http://localhost:8070/food/viewDish")
        .then((res) => {
           // console.log(res.data);
            setDishes(res.data);
        })
        .catch((err) =>console.log(err))
    }, 
    
    []);
    
    const deleteDish = (id) => {

      axios.delete(`http://localhost:8070/food/delete/${id}`)
        .then((res)=> console.log(res))
        .catch((err) => console.log(err));
       
        window.location.reload(); 
    };

    const updateDish = (dish) => {
       // console.log(post);
        setupdatedDish(dish);
        handleShow();

    };

    const handleChange = (e) => {
        const {name , value } = e.target;
       // console.log(e);
        setupdatedDish((prev) => {
            return({
                ...prev,
                [name] : value,
            });
        });
    };

    const saveUpdatedDish = () => {
       // console.log(updatedPost);
        axios.put(`http://localhost:8070/food/update/${updatedDish._id}` , updatedDish)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        handleClose();
        window.location.reload();

    };
    const toggleChart = () => {
        setShowChart(!showChart);
      };

    return(

        <div className="dishDataDiv" style={{width:"100%" , margin:"auto auto" , textAlign :"center"}}>
            <Niv name="View Dishes" />
            <Notification/>
            {/* <h1>View all avaliable Dishes</h1> */}
            <div className='data'>
                <div>
                    <Button className='editbtn' onClick={ () => navigate("/food")}>
                        Add More Dishes
                    </Button>
                    <input
                        placeholder="Enter a dish name to search..."
                        autoComplete="off"
                        onChange={(e)=>setSearchTerm(e.target.value)}
                        style={{ padding:"1rem" , width:"30%", marginBottom:"0.5rem",marginRight:"0.5rem"}}
                        />
                    <Button className='editbtn' onClick={toggleChart}>
                    {showChart ? "Hide Chart" : " See the Favorites"}
                    </Button>
                    {showChart && <TheChart />}
                </div>
                
            
            <Modal show={show} onHide={handleClose} className="theModal" >
                <Modal.Header closeButton>
                 
                    <h3>Update the Dish</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>

                        <table className="modalTable">
                                <tr>
                                  
                                    <td className='modaltd'>
                                        <Form.Control 
                                            className="anInput"
                                            placeholder="Name" 
                                            style={{marginBottom:"1rem"}}
                                            name = "title"
                                            value = {updatedDish.title ? updatedDish.title : "" }
                                            onChange = {handleChange}
                                         />

                                    </td>
                                </tr>
                                <tr >
                            
                                    <td className='modaltd'>
                                        <Form.Control 
                                            className="anInput"
                                            placeholder="Description" 
                                            style={{marginBottom:"1rem"}}
                                            name = "description"
                                            value = {updatedDish.description ? updatedDish.description : "" }
                                            onChange = {handleChange}
                                         />

                                    </td>
                                </tr>
                                <tr>
                                    
                                    <td className='modaltd'> 
                                        <Form.Control 
                                            className="anInput"
                                            placeholder="Price" 
                                            style={{marginBottom:"1rem"}}
                                            name = "price"
                                            value = {updatedDish.price ? updatedDish.price : "" }
                                            onChange = {handleChange}
                                       />

                                    </td>
                                </tr>
                            </table>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='editbtn' onClick={handleClose}>
                         Close
                    </Button>
                    <Button className='editbtn' onClick={saveUpdatedDish}>
                         Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            
            {dishes ? (
                <div>
                    {dishes.filter((dish) =>{
                        if (searchTerm === "") {
                            return (dish);
                            } else if (
                                dish.Name.toLowerCase().includes(searchTerm.toLowerCase())
                            ) {
                                return dish;
                            }                  
                    }).map(dish => {
                        return(
                            <div key={dish._id} className="dishDataDiv " >
                                
                                <table  className="headingtable">
                                <tbody>

                                    <tr>
                                        <td id='shortTH'>Dish Name</td>
                                        <th> {dish.Name}</th>
                                    
                                    </tr>

                                    <tr>

                                        <td id='shortTH'>Description</td>
                                        <td> {dish.Description}</td>
                       
                                    </tr>

                                    <tr>

                                        <td id='shortTH'>Category</td>
                                        <td> {dish.Category}</td>
                       
                                    </tr>

                                    <tr>
                                        <td id='shortTH'>Dish Price</td>
                                        <td>{dish.Price}</td>
                                       
                                    </tr>
                                    
                                    <tr>
                                        <td id='shortTH'>
                                            <img style={{width:"100%" , padding:"1rem 1rem 1rem 1rem" , maxWidth:"20rem"}} src={dish.ImageURL} alt="" />
  
                                        </td>
                                        {/* <td>{dish.Ingredients}</td> */}

                                        <td> 
                                        <table  style={{width:"100%" , padding:"0 0 0 0" , margin:"0 0 0 0"}}>
                                         <tbody>
                                                <tr><td colSpan={4}>Ingredients </td></tr>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Name</td>
                                                    <td>Quantity</td>
                                                    <td>Unit</td>  
                                                
                                                </tr> 
                                            
                                                    {dish.Ingridients.map((ings,index)=> {
                                                return(
                                                
                                                        <tr  key={index}> 
                                                            <td > {ings.id}</td>
                                                            <td > {ings.name}</td>
                                                            <td > {ings.quantity} </td>
                                                            <td > {ings.unit} </td>
                                                        </tr>    
                                                )
                                                })} 
                                            </tbody>
                                            </table>
                                        </td>
                                        {/* <th><h3>{dish.Ingredients.name} </h3></th>
                                        <th><h3>{dish.Ingredients.quantity} </h3></th>
                                        <th><h3>{dish.Ingredients.unittype} </h3></th> */}
                                       
                                    </tr>



                                    <tr>
                                        <td>
                                    
                                                <Button 
                                                    className='editbtn' 
                                                    onClick={() => updateDish(dish)} 
                                                    style={{marginRight:"20px"}} >
                                                        UPDATE
                                                </Button>
                                        </td>
                                        <td>
                                                <Button 
                                                    className='editbtn' 
                                                   
                                                    onClick ={() => deleteDish(dish._id)} 
                                                    style={{marginRight:"20px"}}>
                                                        DELETE
                                                    </Button>
                                        </td> 

                                    </tr>
                                </tbody> 
                                </table>

                            </div>
                           
                        )
                    })}
                </div>
            ): "" }
            </div>
        </div>
        );









};

export default ViewDish;