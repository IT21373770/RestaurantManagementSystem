import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {GeoCoder, GoogleMap, Marker, useJsApiLoader, Autocomplete,DirectionsRenderer } from '@react-google-maps/api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./map.css"
import {useLocation} from 'react-router-dom';
import { Loader } from "@googlemaps/js-api-loader";
import emailJS from "@emailjs/browser"

export default function DriverMap() {

    const [loggedUser,setLoggedUser] = useState("")
    const [map,setMap] = useState(/** @type google.maps.Map  */ (null))
    const [directionResponse, setDirectionResponse] = useState("")
    const [orderDetails,setOrderDetails] = useState([])
    const center2 = {lat:6.949,lng:80.789};
    const locationComp = useLocation();
    const[checkStartCode,setCheckStartCode] = useState("")
    const[checkEndCode,setCheckEndCode] = useState("")

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()   
    const permOrigin = "Nuwara Eliya, Sri Lanka"

     /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef()
    const center = useMemo(() => ({lat:6.949632874163033,lng:80.78905943343568}), []);

    useEffect  (() => {
        const id2 = JSON.parse(localStorage.getItem('loggedUserID'));
        if (id2 == "logout"){
            return
        }else{
            axios.get(`http://localhost:8070/driver/FindDriver/${id2}`).then((res) => {     
               //console.log(res.data)
                setLoggedUser(res.data); 
        });

            const id = JSON.parse(localStorage.getItem('orderID'));
            axios.get(`http://localhost:8070/order/FindOrder/${id}`).then((res) => {     
              //  console.log(res.data)
                setOrderDetails(res.data); 

        });

        }


    }, []);
    
    const {isLoaded} = useJsApiLoader({  
      googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API_KEY ,
      libraries:['places']
    });

    async function upDateDriverOrderDilEnd(e) {
        e.preventDefault()

        if(checkEndCode == null){
            toast.error("Please enter the trip end code first...")
            return
        }
        if(checkEndCode =="" ){
            toast.error("Please enter the trip end code first...")
            return
        }
        if(checkEndCode.length>5 ){
            toast.error("Trip end code length does not match. Please enter the correct code.")
            return
        }
        if(checkEndCode != orderDetails.endCode){
            toast.error("Trip end code does not match. Please enter the correct code.")
            return
        }
        if(checkEndCode == orderDetails.endCode){
            toast.success("Codes does match.Please wait...")

            var today = new Date(),
            endTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

            const datas = {
                status:"delivered",
                endTime:endTime
            }

            const sts ={
                status:"Idle"
            }
            await axios.put(`http://localhost:8070/order/updateOrderRecord/${orderDetails._id}` ,datas )
                .then((res) => {
                    // console.log(res.data);
                    setOrderDetails(res.data)
                    // window.location.reload()
                })
                .catch((err) => console.log(err));
                //console.log(driverDetails.loggedUser.status);
                
            await axios.put(`http://localhost:8070/driver/update/${loggedUser._id} ` ,sts)
                .then((res) => { 
                    //console.log(res.data);
                    setLoggedUser(res.data)

                })
                .catch((err) => console.log(err)); 
                    
                
            toast.success("Delivery is completed. Thank you.")
            setTimeout( function() {  orderComp() }, 3000);     

    }
    };

    async function calculateRoute(event){

        event.preventDefault()

        if(checkStartCode == null && orderDetails.status !="delivering"){
            toast.error("Please enter the Trip start code...")
            return
        }
        if(checkStartCode =="" && orderDetails.status !="delivering"){
            toast.error("Please enter the Trip start code...")
            return
        }
        if(checkStartCode.length>5 && orderDetails.status !="delivering"){
            toast.error("Trip start code length does not match. Please enter the correct code.")
            return
        }
        if(checkStartCode!= orderDetails.startCode && orderDetails.status !="delivering"){
            toast.error("Trip start code does not match. Please enter the correct code.")
            return
        }
        
        toast.info("Adjusting map...")

        //eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService()
        const results = await directionService.route({
            origin:  permOrigin ,
            
           // origin: originRef.current.value,
           // destination: destinationRef.current.value,
            destination:orderDetails.location,
            //eslint-disable-next-line no-undef
            travelMode : google.maps.TravelMode.DRIVING

        })
        setDirectionResponse(results)
        const dis = results.routes[0].legs[0].distance.text
        const dura = results.routes[0].legs[0].duration.text
        
        try{
           await upDateDriverOrder(event,dis,dura)
        }catch (err) {
            console.log(err.message);
       
        } 
    }
      
    async function upDateDriverOrder (e,dis,dura) {
        e.preventDefault()
        if(orderDetails.status =="delivering"){
            toast.warn("You already owns this delivery.No need to try and enter start code again.")
            return
        }

            var today = new Date(),
            startTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

            var status = "delivering"
            var deliverPersonEmail = loggedUser.Email
            var deliverPersonPhn = loggedUser.phone_no
            var distance = dis
            var duration = dura
            var driverID= loggedUser._id

            const datas = {
                status,
                deliverPersonEmail,
                deliverPersonPhn,
                distance,
                duration,
                driverID : driverID,
                startTime:startTime
            }

            const sts ={
                status:"delivering"
            }
            await axios.put(`http://localhost:8070/order/updateOrderRecord/${orderDetails._id}` ,datas )
                .then((res) => {
                    console.log(res.data);
                    setOrderDetails(res.data)
               
                   // window.location.reload()
                })
                .catch((err) => console.log(err));
                //console.log(driverDetails.loggedUser.status);
                
            await axios.put(`http://localhost:8070/driver/update/${loggedUser._id} ` ,sts)
                .then((res) => { 
                    console.log(res.data);
                    setLoggedUser(res.data)

                })
                .catch((err) => console.log(err)); 

            await codeSender (e)
             
            toast.success("Order is yours. You have started the clock.")
            setTimeout( function() {  window.location.reload() }, 3000);     


    };

    function logOut () {
        const empt = "logout"
        localStorage.setItem('loggedUserID',JSON.stringify(empt))
        localStorage.setItem('orderID',JSON.stringify(empt))
        window.location.href = "/sign";
    };

    function orderComp(){
        const empt = "logout"
        localStorage.setItem('orderID',JSON.stringify(empt))
        window.location.href = "/home";
    }

    async function codeSender (event){

        event.preventDefault()

        const dc = parseInt(orderDetails.distance) *10
        const tc =  dc +  parseInt(orderDetails.amout)
       
        const msg2 = {
            from_name:"Paladium Restaurent",
            to_name: orderDetails.cusEmail,
            message:`Your order has been dispatched. 

                    ID is ${orderDetails.order_id}. 

                    Delivery person contact is ${loggedUser.phone_no}

                    After you have received your order,please give this OTP code to the dilivery person, 
                    OTP is ${orderDetails.endCode}.

                    Order price ${orderDetails.amout} + Delivery Charge is ${dc}

                    Total ammount to be paid is ${tc}`

        }

    
       await emailJS.
       send(process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID ,msg2,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY )
       .then(()=>{
            toast.info("Customer has been notified...")
       }).catch((err)=>{
            console.log(err)
       }) 

    }

    if(!isLoaded) return <div><h1>Loading</h1></div>;
    if(!orderDetails && !loggedUser) return <div><h1>Loading</h1></div>;
    if(JSON.parse(localStorage.getItem('loggedUserID'))=="logout") return <div><h1>Please Login </h1></div>;
    // if(logStat==" ") return <div><h1>Please Login ...</h1></div>;

    return(
        <>
            <ToastContainer position="top-right" theme="colored" /> 
            <div className="data">
            <script src="https://smtpjs.com/v3/smtp.js"></script>
               
                <table border={0} style={{ backgroundColor:"lightgrey",width:"95%",margin:"auto auto", marginTop:"5rem" ,minWidth:"70vh"}}>
                    <tbody>
                        <tr>
                            <td rowSpan={11} style={{ margin:"auto auto" , minWidth:"10vh" ,paddingRight:"1rem" , paddingLeft:"1rem"}} >
                                <div className="positionDiv" style={{margin:"auto auto"}}>
                                {/* eslint-disable-next-line no-undef */}
                                <GoogleMap 
                                    zoom={8} 
                                    center={center2} 
                                    mapContainerClassName="mapContainer" 
                                    id="map"
                                    mapContainerStyle={{margin:"äuto auto"}}
                                    onLoad={map => setMap(map)}
                                    options={{
                                    
                                        streetViewControl:false,
                                        mapTypeControl:false,
                                        fullscreenControl:false

                                    }}>   
                                        <Marker position={center2} />
                                        {/* <Marker position={orderDetails.deliverCenter} /> */}
                                    {directionResponse && <DirectionsRenderer directions={directionResponse}/>} 
                                {/* eslint-disable-next-line no-undef */}
                                </GoogleMap>
                                </div>
                            </td>
                        </tr>

                        <tr style={{ btextAlign:"left",paddingRight:"1rem"}}>
                            <td id="trs" 
                                colSpan={2} 
                                style={{ textAlign:"left",paddingRight:"1rem"}}
                            >
                                <p>Your Email : {loggedUser.Email}</p>
                            </td>
                        </tr> 

                        <tr>
                            <td id="trs"  colSpan={2} style={{ textAlign:"left"}}>
                                <p>Customer Name : {orderDetails.cus_id}</p>
                            </td>
                        </tr>

                        <tr>
                            <td id="trs" colSpan={2} style={{ textAlign:"left"}}>
                                <p>Order ID : {orderDetails.order_id}</p>
                            </td>
                        </tr>

                        <tr>
                            <td id="trs" colSpan={2} style={{ textAlign:"left"}}>
                            {/* <Autocomplete>
                                <input type="text" 
                                    placeholder="Enter your pickup point..."  
                                    style={{height:"4rem", padding:"2rem 2rem 2rem 2rem ", width:"100%"}}
                                    ref={originRef}/>
                            </Autocomplete>    */}
                            
                            <p>PickUp Location : {permOrigin}</p>
                            </td> 
                        </tr>

                        <tr>
                            <td id="trs"  colSpan={2} style={{ textAlign:"left"}}>
                            <p>Delivery Location ; {orderDetails.location}</p>
                            {/* <Autocomplete>
                                <input type="text"  
                                placeholder="Enter your drop point..."  
                                style={{padding:"2rem 2rem 2rem 2rem "}}
                                defaultValue={orderDetails.location}
                                ref={destinationRef}
                               />
                            </Autocomplete> */}
                            </td>
                        </tr>
                             
                        <tr  style={{ textAlign:"left",paddingRight:"1rem"}}>
                            <td id="trs" >
                            <p>Distance : {orderDetails.distance}</p></td>
                            <td id="trs" > <p>Duration : {orderDetails.duration}</p></td> 
                        </tr>

                        <tr style={{ textAlign:"left",paddingRight:"1rem"}}>
                            <td id="trs"  colSpan={2}>
                                <p>Order Status: {orderDetails.status}</p>
                            </td>  
                        </tr>

                        <tr>
                            <td>
                            <button 
                                className="middlebtns" 
                                onClick={(e)=>calculateRoute(e)}
                                >   
                                Proceed
                            </button>  
                            </td>

                            <td>
                            <input
                                placeholder="Enter the Delivery start code"
                                autoComplete="off"
                                onChange={(e)=>setCheckStartCode(e.target.value)}
                                style={{ padding:"1rem" }}
                              />
                            </td>

                        </tr>

                        <tr>
                            <td>
                                <button 
                                    onClick={(e)=> upDateDriverOrderDilEnd(e)}  
                                    className="middlebtns" >   
                                    Delivered
                                </button>  
                            </td>
                            <td>
                           
                            <input
                                placeholder="Enter the Delivery end code"
                                autoComplete="off"
                                onChange={(e)=>setCheckEndCode(e.target.value)}
                                style={{ padding:"1rem" }}
                              />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <button 
                                    className="middlebtns" 
                                    onClick={() => map.panTo(center)}
                                >   
                                   Center
                                </button>  
                            </td>
                            <td>
                                <button 
                                
                                    onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Confirm logout. To view this page you need to login again."
                                        )
                                        if (confirmBox === true) {
                                           logOut()
                                        }}}
                                        className="logoutbtn"
                                        style={{  margin:"Auto Auto"}}>   
                                        LOG OUT  : 
                                    <div style={{   backgroundColor:"orange" , padding:"0.5rem"}}>
                                        {loggedUser.Email}
                                    </div>
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </>
    )
}
