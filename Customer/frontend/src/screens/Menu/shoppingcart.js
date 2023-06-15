import React from "react";
import "./shoppingcart.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import CartItem from "../../components/CartItem";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {
	useJsApiLoader,
	Autocomplete,
} from "@react-google-maps/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const libraries = ["places"];

function ShoppingCart({
	visibilty,
	products,
	onProductRemove,
	onClose,
	onQuantityChange}) {
	const [isprofile, setprofil] = useState(false);
	const [user, setUser] = useState({});
	const [phone, setPhone] = useState("");
	const [orderid, setorderid] = useState([]);
	const [address, setAddress] = useState("");
	const[sendOrder,setSendOrder] = useState("")
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API_KEY,
		libraries,
	});
	const autocompleteRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
	  const autocomplete = autocompleteRef.current;
	  if (autocomplete) {
		autocomplete.setFields(["formatted_address"]);
	  }
	}, []);

	useEffect(() => {
		axios.get("http://localhost:8070/order/orderId").then((res) => {
			//console.log(res.data[0].order_id);
			setorderid(res.data[0].order_id)
		});

	}, []);

	useEffect(() => {
		let res = JSON.parse(localStorage.getItem("userData"));
		if (!res) {
		//   alert("Please Login")
		}
		else{
			setprofil(true)
		
			setUser(res);
		}
	  }, []);

	function addOrder(event){
		if(address==null || phone==null){
			toast.error("Please fill all the fields!")
			return
		}

		if(address=="" || phone==""){
			toast.error("Please fill all the fields!")
			return
		}

		if(phone.length<9 || phone.length>12 ){
			toast.error("Invalid phone number!")
			return
		}
		if(address.length<5){
			toast.error("Invalid Address")
			return
		}

		var tot = 0
		products.map((item)=>{
			tot += (item.Price * item.count)
		})
		
		var id = parseInt(orderid) + 1
		const neworder = {
			order_id: id,
			w_id:-1,
			cus_id:user.user._id,
			type:"Delivery",
			total:tot,
			address:address,
			phone:phone,
			email:user.user.email,
			phnNum:phone,
		  };
		//console.log(neworder);
		localStorage.setItem('AllOrderDetails',JSON.stringify(neworder))
		localStorage.setItem('AllProductDetails',JSON.stringify(products))
		AddtoOrderFood()
		axios
        .post("http://localhost:8070/order/add", neworder)
        .then(async () => {
			AddtoOrderFood()
			toast.success("Order has been placed. We will notify when it's on the way...")
        })
        .catch((err) => {
			console.log(err)
			toast.error("Error occured. Please try again")
        });		

	}
	function handlePlaceSelect() {
		const addressObject = autocompleteRef.current.getPlace();
		if (addressObject) {
		  const selectedAddress = addressObject.formatted_address;
		  setAddress(selectedAddress);
		}
	  }
	  
	async function AddtoOrderFood(){ 
		var id = parseInt(orderid) + 1
		
		products.map(async (items)=>{
			//console.log(items)
			const neworder_food = {
				order_id:id,
				description:items.Description,
				quantity:items.count,
			  };
		//console.log(neworder_food)
		
		await axios
		.post("http://localhost:8070/orderfood/add", neworder_food)
		.then(() => {
			
		})
		.catch((err) => {
		  alert(err);
		});
		
	})
	toast.success("Items added to the order ");
	setTimeout(() => {
		//navigate('OrderSummary')
		navigate('/OrderSummary',{state: {order:{sendOrder}, foods:{products}}});
	  }, 2000);
	
	}
	
	if(!isLoaded) return <div><h1>Loading</h1></div>;
	return (
		<div
			className="model"
			style={{
				display: visibilty
					? "block"
					: "none",
			}}>
			<ToastContainer position="top-right" theme="colored" /> 
			<div className="shoppingCart">
				<div className="header">
					<h2>Shopping cart</h2>
					<button
						className="btn close-btn"
						onClick={onClose}>
						<IoMdCloseCircle
							size={30}
						/>
					</button>
				</div>
				<div className="cart-products">
					{products.length === 0 && (
						<span className="empty-text">
							Your cart is
							currently empty
						</span>
					)}
					{products.map((product,index) => (
						<CartItem product={product} key={index} onQuantityChange={onQuantityChange} onProductRemove={onProductRemove}/>
					))}
					<hr/>
				<div style={{textAlign:"center",margin:"auto auto"}}>
						
					<label style={{color: "white"}}>Enter your phone no:</label><br></br>	
					<input 
						style={{ padding: "1rem" , backgroundColor:"white", color:"black" , margin:"auto auto", borderRadius: "10px", marginBottom: "5%"}}
						type="text" placeholder="Enter Your Phone Number" pattern="[0-9]{10}" maxLength={15}
						title="Enter valid phone number" onChange={(e)=>setPhone(e.target.value)}/> <br></br><br></br>

					<label style={{color: "white"}}>Pick your drop-off location:</label><br></br>
					 <Autocomplete		
						z-index={50}
						onChange={(e) => setAddress(e.target.value)}
						onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
						onPlaceChanged={handlePlaceSelect}
						
						style={{padding: "1rem" , backgroundColor:"white", color:"black" }}>
                               <input
							   z-index-={101}
                                  type="text"
                                  hidden={false}
                                  id="locationInputs"
                                  style={{ padding: "1rem" , backgroundColor:"white", color:"black", borderRadius: "10px", marginBottom: "5%"}}
                                  placeholder="Enter your Drop Point..."
                                  onClick={(e) => setAddress(e.target.value)}  
								  onChange={(e) => setAddress(e.target.value)}  
								  onMouseMove={(e) => setAddress(e.target.value)}  
								  defaultValue={address}    /> 

                     </Autocomplete> 
					</div>
					{/* <button className="btn checkout-btn" onClick={(event)=>checkData()}>
							Test btn
					</button> */}

					<div style={{margin:"auto auto"}}>
					{products.length > 0 && (
						
						<button className="btn checkout-btn" onClick={(event)=>addOrder(event)}>
							Proceed to checkout
						</button>
						
						// <a href="/OrderSummary">
						// </a>
					)}
						
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;
