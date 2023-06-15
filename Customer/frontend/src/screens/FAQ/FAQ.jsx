import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./faq.css";
import { BsChevronDown } from "react-icons/bs";
import { GrSend } from "react-icons/gr"
import { CiUser, CiCreditCard2, CiDeliveryTruck, CiFries } from "react-icons/ci";
import SearchBar from "./searchbar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function FAQ() {

    const currentUser = JSON.parse(localStorage.getItem("userData"));

    let navigate = useNavigate();

    const handleChatClick = () => {
        if (!currentUser) {

            let path = `/Signin`;
            navigate(path);

        }
        else {

            let path = `/Chat`;
            navigate(path);

        }
    };


    const [faq, setFaq] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredFaq, setFilteredFaq] = useState([]);
    useEffect(() => {
        function getFaq() {
            axios.get("http://localhost:8090/faq/").then((res) => {
                setFaq(res.data);
            }).catch((err) => {
                alert(err);
            })
        }
        getFaq();
    }, []);

    function handleSearch(keyword) {
        setSearchKeyword(keyword);
        const filtered = faq.filter((qa) =>
            qa.category.toLowerCase().includes(keyword.toLowerCase()) ||
            qa.question.toLowerCase().includes(keyword.toLowerCase()) ||
            qa.answer.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredFaq(filtered);
    }

    const faqList = filteredFaq.length > 0 ? filteredFaq : faq;

    const faqcats = [
        {
            name: "Account",
            icon: <CiUser />,
            arrow: <BsChevronDown />,
            filteredQuestions: faqList.filter((qa) => qa.category === "Account"),
        },
        {
            name: "Payment",
            icon: <CiCreditCard2 />,
            arrow: <BsChevronDown />,
            filteredQuestions: faqList.filter((qa) => qa.category === "Payment"),
        },
        {
            name: "Orders",
            icon: <CiFries />,
            arrow: <BsChevronDown />,
            filteredQuestions: faqList.filter((qa) => qa.category === "Orders"),
        },
        {
            name: "Delivery",
            icon: <CiDeliveryTruck />,
            arrow: <BsChevronDown />,
            filteredQuestions: faqList.filter((qa) => qa.category === "Delivery"),
        }
    ];



    return (
        <>

            <Header />


            <div className="cont">
                <div class="maintxt">
                    <h1 style={{ color: "#ffffff" }}>Frequently Asked Questions</h1>

                    <SearchBar keyword={searchKeyword} onChange={handleSearch} />

                </div>


                <div class="container">

                    {faqcats.map((faqcat, index) => (
                        faqcat.filteredQuestions.length > 0 && (
                            <div className="box" key={index}>
                                <div className="icon">{faqcat.icon}</div>
                                <div className="name">
                                    <p>{faqcat.name}</p>
                                </div>
                                <div className="expand">
                                    {faqcat.filteredQuestions.map((qa) => (
                                        <div className="text" key={qa.id}>
                                            <p>
                                                <b>{qa.question}</b>
                                            </p>
                                            <p>{qa.answer}</p>
                                            <hr className="solid"></hr>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}

                    <div className="btm">
                        <h3>Couldn't find what you're looking for?</h3>
                        {/* <a href="/Chat"> */}
                        <button className="button-2" onClick={handleChatClick}>Chat with Admin  <GrSend />

                        </button>
                        {/* </a> */}


                    </div>

                </div>




            </div>
            <Footer />

        </>
    )
}

export default FAQ;