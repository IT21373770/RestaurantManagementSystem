import React from "react";
import { IoRestaurantSharp } from "react-icons/io5";
import pic4 from '../../Images/chicken2.png';
import pic3 from '../../Images/3.png';
import pic2 from '../../Images/beef.png';
import logo from '../../Images/logo.png';
import newtag from '../../Images/new.png';
import pizza from '../../Images/pizza.png';
import Header from "../../components/header";
import Footer from "../../components/Footer.jsx";
import './Homepage.css';
import { useNavigate } from "react-router-dom";

console.log(logo);



function Homepage(){

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/Menu`; 
    navigate(path);
  }

    return(
      
<div>
<Header/>
<div className="cont">
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-6">
            <img class="img-fluid"src={pizza} style={{height:"auto"}} alt="Pizza"/>
        </div>
        <div class="col-lg-6">
        <p class="text-center" style={{fontSize:"55px",color:"white"}}>Easy way to order your food</p>
          <h1 class="text-center" style={{fontSize:"100px",color:"white"}}>Tasty and<br/>Fresh Food</h1>
          <h1 class="text-center" style={{fontSize:"100px"}} id="cursive">Anytime</h1>
          <p class="text-center" style={{fontSize:"40px",color:"white"}}>Just confirm your order and enjoy our delicious fastest<br/>delivery.</p>
          <div class="col text-center">
            <button class="button-33" onClick={routeChange}>See Menu</button>
          </div>
            
        </div>
    </div>
</div>




<p class="text-center2" style={{color:"white", fontSize:"35px"}}><b><span>WHAT'S NEW</span></b></p>
    <div class="card-group" style={{margin:"-2% 3% 4% 3%"}}>
  <div class="card bg-light" style={{margin:"2%", borderRadius: "5%"}}>
    <img class="card-img-top" src={pic2} alt="Beef"/>
    <div class="card-body">
      <h5 class="card-title" >DEVILLED BEEF</h5>
      <p class="card-text" >Rs. 850 /=</p>
    </div>
    <div class="card-footer">
    <img class="card-img-new" style={{height:"50px"}} src={newtag} alt="new"/>
    <button type="button" style={{marginLeft:"60%"}} class="btn btn-success" onClick={routeChange}>Order Now</button>
    </div>
  </div>
  <div class="card bg-light" style={{margin:"2%", borderRadius: "5%"}}>
    <img class="card-img-top" src={pic3} alt="prawn"/>
    <div class="card-body">
      <h5 class="card-title">Pepper Prawns</h5>
      <p class="card-text" >Rs. 1425 /=</p>
    </div>
    <div class="card-footer">
    <img class="card-img-new" style={{height:"50px"}} src={newtag} alt="new"/>
    <button type="button" style={{marginLeft:"60%"}} class="btn btn-success" onClick={routeChange}>Order Now</button>
    </div>

  </div>
  <div class="card bg-light" style={{margin:"2%", borderRadius: "5%"}}>
    <img class="card-img-top" src={pic4} alt="Chicken"/>
    <div class="card-body">
      <h5 class="card-title">Crispy Chicken</h5>
      <p class="card-text">Rs. 790 /=</p>
    </div>
    <div class="card-footer">
    <img class="card-img-new" style={{height:"50px"}} src={newtag} alt="new"/>
    <button type="button" style={{marginLeft:"60%"}} class="btn btn-success" onClick={routeChange}>Order Now</button>
    </div>
    
  </div>
</div>


<div class="media" style={{margin:"4% 5%"}}>
  {/* <img class="rounded float-right" src={logo} style={{height:"200px"}} alt="Generic placeholder image"/> */}
  <div class="media-body">
    <h5 class="mt-0" style={{color:"white", fontSize:"35px"}}><b>About Us</b></h5><br></br>
    <p style={{color:"white", fontSize:"25px", textAlign: "center", fontFamily: "Apple Chancery, cursive"}}>Welcome to Palladium Restaurant! We are a passionate team dedicated to providing exceptional dining experiences to our valued customers. With our commitment to quality, innovation, and customer satisfaction, we strive to be the go-to destination for food enthusiasts.

<br></br>At Palladium Restaurant, we believe that great food goes beyond just taste. It is an art that encompasses flavors, textures, and presentation. Our talented chefs meticulously craft each dish using the finest ingredients, ensuring a harmonious blend of flavors that tantalize the taste buds.

Our vision is to create a warm and inviting atmosphere where guests can relax, indulge, and create lasting memories. Whether you're looking for a cozy dinner with loved ones, a business lunch, or a celebration with friends, our restaurant offers a versatile space suitable for any occasion.

We take pride in our excellent customer service. <br></br>Our friendly and attentive staff members are dedicated to providing a personalized dining experience, catering to your preferences and dietary needs. We value your feedback and continuously strive to exceed your expectations.

Furthermore, we embrace technology to enhance your dining experience. Our user-friendly online ordering system allows you to conveniently place orders for takeout, delivery, or make reservations for a delightful dine-in experience. We are committed to making your experience seamless and enjoyable from start to finish.</p>
  

<p class="mb-0" style={{color:"white", fontSize:"25px", textAlign: "center", fontFamily: "Apple Chancery, cursive"}}>Palladium is more than just a place to eat; it's a culinary journey where flavors come alive, and memories are made.Join us and embark on a gastronomic adventure that will delight your senses and leave you craving for more.

<br></br><br></br>Thank you for choosing Palladium Restaurant. We look forward to serving you and creating unforgettable moments together.</p>
<div class="cutleryicon" style={{textAlign: "center", marginTop: "3%"}}><IoRestaurantSharp color={"white"} size={50}/></div>
  </div>
</div>

</div>

<Footer/>

</div>
    )
}

export default Homepage;