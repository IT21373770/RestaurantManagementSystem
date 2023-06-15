import React, {useState, useEffect}from "react";
import Header from "../../Components/header";
import Footer from "../../Components/Footer";
import "./faq.css";
import {BsChevronExpand} from "react-icons/bs";
import {GrSend} from "react-icons/gr"
import {CiUser, CiCreditCard2,CiDeliveryTruck, CiFries} from "react-icons/ci";
import SearchBar from "./searchbar";
import axios from "axios";


const faqcats = [
	{
		name: "Account",
		icon: <CiUser/>,
	},
	{
		name: "Payment",
		icon: <CiCreditCard2/>,
	},
	{
		name: "Order",
		icon: <CiFries/>,
	},
	{
		name: "Delivery",
		icon:<CiDeliveryTruck/>,
	}
];

function FAQ(){

    const [toggle, setToggle] = React.useState({});

    function toggleFunction(id) {
        setToggle({
        ...toggle,
        [id]: !toggle[id],
        });
    }

    const [faq, setFaq] = useState([]);
    useEffect(() => {
    function getFaq() {
      axios.get("http://localhost:8070/faq/").then((res) => {
        setFaq(res.data);
      }).catch((err) =>{
        alert(err);
      })
    }
    getFaq();
    }, []);


    return(
        <>
        
        <Header/>

        
        <div className="cont">
            <div class="maintxt">
            <h1 style={{color:"#ffffff"}}>Frequently Asked Questions</h1>
            
<SearchBar></SearchBar>
            {/* <div className="wrapper">
      <h2>Latest HN Stories</h2>
      {loading && <div>HackerNews frontpage stories loading...</div>}
      {error && <div>{`Problem fetching the HackeNews Stories - ${error}`}</div>}
      <SearchBar keyword={keyword} onChange={updateKeyword}/>
    </div> */}

            </div>
        

        <div class="container">

                {faqcats.map((faqcats) =>(
                    <div className="box">
                        <div className="icon">
                            {faqcats.icon}
                        </div>
                        <div className="name">
                            <p>{faqcats.name}</p>
                        </div>

                        <div className="btnE"
                            onClick={() => toggleFunction(faqcats.name)}
                        ><BsChevronExpand/></div>

                        {toggle[faqcats.name] &&
                        (
                            
                            <div className="expand">
                                {faq.filter(qa => qa.category === faqcats.name).map(filteredqa => (
                                    <div className="text">
                                    <p><b>{filteredqa.question}</b></p>
                                    <p>{filteredqa.answer}</p>
                                    <hr class="solid"></hr>
                                    </div>
                                ))}


                            </div>
                            
                        )}
                    </div>
                ))}

                <div className="btm">
                    <h3>Couldn't find what you're looking for?</h3>
                    <a href="/Chat">
                    <button className="button-2">Chat with Admin  <GrSend/>
                    </button>
                    </a>
                    
                </div>

        </div>




        </div>
        <Footer/>
        </>
    )
}

export default FAQ;