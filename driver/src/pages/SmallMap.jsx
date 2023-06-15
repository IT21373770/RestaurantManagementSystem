import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { GeoCoder,GoogleMap, Marker, useJsApiLoader, Autocomplete,DirectionsRenderer } from '@react-google-maps/api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./smallMap.css"

const center2 = {lat:6.949,lng:80.789};
 
const SmallMap = (receviedLocationFromHome) => {
   
    useEffect((receviedLocationFromHome) => {
        if(receviedLocationFromHome!=null){
           // lanLongGetter()
        }  
      }, []);

    const [map,setMap] = useState(/** @type google.maps.Map  */ (null))
    const [directionResponse, setDirectionResponse] = useState("")
    const [distance,setDistance] = useState("")
    const [duration,setDuration] = useState("")
    const receviedLocation = receviedLocationFromHome.id

    //console.log(receviedLocation)
    //console.log(receviedLocationFromHome)

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()

    const permOrigin = "Nuwara Eliya, Sri Lanka"

     /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef()

    const center = useMemo(() => ({lat:6.949632874163033,lng:80.78905943343568}), []);

    const {isLoaded} = useJsApiLoader({  
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API_KEY ,
        libraries:['places']
      });

    //  //eslint-disable-next-line no-undef
    //  var geocoder = new google.maps.Geocoder();
    //  //eslint-disable-next-line no-undef

    // function lanLongGetter() {
    //     var address = receviedLocation
    //     geocoder.geocode( { 'address': address}, function(results, status) {
    //       if (status == 'OK') {
    //         map.setCenter(results[0].geometry.location);

    //          //eslint-disable-next-line no-undef
    //         var marker3 = new google.maps.Marker({
    //         //eslint-disable-next-line no-undef
    //             map: map,
    //             position: results[0].geometry.location
               
    //         });
    //         console.log(marker3)
    //       } else {
    //         alert('Geocode was not successful for the following reason: ' + status);
    //       }
    //     });
    //   }
  
    const goBack = () => {
        toast.success("Logging in............")
        window.location.href = "/Home";
  };
    async function calculateRoute(event){
       
        event.preventDefault()
        // if(originRef.current.value === '' || destinationRef.current.value ===''){
        //     toast.error("Please enter both pickup and deliver locations...")
        //     return
        // }
    

        // if(destinationRef.current.value ===''){
        //     toast.error("Please enter deliver locations...")
        //     return
        // }

        
        // if(receviedLocation ===''){
        //     toast.error("Please enter deliver location...")
        //     return
        // }

         //eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService()
        const results = await directionService.route({
            origin:  permOrigin ,
           // origin: originRef.current.value,
            destination:receviedLocation,
            //eslint-disable-next-line no-undef
            travelMode : google.maps.TravelMode.DRIVING

        })
        setDirectionResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
       
     }



    if(!isLoaded) return <div><h1>Loading</h1></div>;


        return(
            <div>
            
            <ToastContainer position="top-right" theme="colored" /> 
          
               
              <table border={0} style={{paddingTop:"1rem", borderSpacing:"0", margin:"auto auto", backgroundColor:"antiquewhite" , border:"none"}}>
                    <tbody>
                        <tr>
                        <td colSpan={3} className="t1" >
                            <div className="mainContiner2" style={{margin:"auto auto"}}>
                            {/*eslint-disable-next-line no-undef */}
                            <GoogleMap 
                                zoom={15} 
                                center={center2} 
                                mapContainerClassName="mapContainer2" 
                                id="map"
                                mapContainerStyle={{margin:"äuto auto"}}
                                onLoad={map => setMap(map)}
                                options={{
                                
                                    streetViewControl:false,
                                    mapTypeControl:false,
                                    fullscreenControl:false

                                }}>   
                                  {/*eslint-disable-next-line no-undef */} 
                                <Marker position={center2} />

                                {directionResponse && <DirectionsRenderer directions={directionResponse}/>} 
                            {/*eslint-disable-next-line no-undef */}
                            </GoogleMap>
                            </div>
                            </td>                     
                            
                        </tr>
                        <tr>
                        <td style={{paddingTop:"1rem", paddingLeft:"1rem", textAlign:"left"}} colSpan={2}>
                            {/* <Autocomplete>
                                <input type="text" 
                                    placeholder="Enter your pickup point..."  
                                    style={{height:"4rem", padding:"2rem 2rem 2rem 2rem ", width:"100%"}}
                                    ref={originRef}/>
                            </Autocomplete>    */}

                            PickUp : {permOrigin}
                        
                        
                        </td>
                        </tr>
                        <tr>
                        <td colSpan={2} style={{paddingTop:"1rem",paddingLeft:"1rem", textAlign:"left"}}>
                            Deliver To : {receviedLocation}</td>                     
                        </tr>
                        {/* <tr>  
                            <td style={{textAlign:"center"}}>
                            <Autocomplete>
                                <input type="text"  
                                placeholder="Enter your drop point..."  
                                ref={destinationRef}/>
                            </Autocomplete>
                            </td>
                        </tr> */}
                      
                    <tr>
                        <td style={{paddingTop:"1rem",paddingLeft:"1rem", textAlign:"left"}}>Distance : {distance}</td>
                    
                        <td style={{paddingTop:"1rem",paddingLeft:"1rem", textAlign:"left"}}>Duration : {duration}</td>                     
                    </tr>
                    <tr>
                    <td colSpan={2} style={{ textAlign:"center"}}>
                        <button  
                            className="middlebtns" 
                            onClick={calculateRoute}>   
                            Calculate Route
                        </button>  
                        </td>
                    </tr>
                                            
                    </tbody>
                </table>
           
        </div>
    )
}

export default SmallMap ;
         

//   function Map(){
//     const center = useMemo(() => ({lat:6.949,lng:80.789}), []);
   
//     return (
        

//     )
// }


