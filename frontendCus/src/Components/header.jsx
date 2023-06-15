import React from "react";
import '../App.css';
import logo from '../Images/logo.png';
// import { Outlet, Link } from "react-router-dom";


console.log(logo);


function Header(){


    return(
     
      <div class="container">
      
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-black" >
        <a href="/" class="navbar-brand"><img src={logo} style={{width: "300px", height: "110px", objectFit: "cover"}} alt="logo"/></a>

            
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
            <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
                <div class="navbar-nav" style={{marginLeft:"2%"}}>
                    <a href="/" class="nav-item nav-link"style={{paddingLeft:"20%", paddingRight:"20%"}}><b>HOME</b></a>
                    <a href="/Menu" class="nav-item nav-link"style={{paddingLeft:"20%", paddingRight:"20%"}} ><b>MENU</b></a>
                    <a href="/FAQs" class="nav-item nav-link"style={{paddingLeft:"20%", paddingRight:"20%"}}><b>FAQs</b></a>
                </div>

                
                <div class="navbar-nav" style={{marginLeft:"65%"}}>
                    <a href="/login" class="nav-item nav-link" ><button class="lgBtn">Sign In</button></a>
                </div> 
                
            </div>
       
    </nav>

      </div>
    )
}

export default Header;