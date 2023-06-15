import React, { useEffect, useState } from 'react';
import Niv from '../../components/Niv';
import "./faq.css";
// import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsEnvelope, BsPlusLg } from 'react-icons/bs';
import axios from "axios";
import EditRowPopup from './popup';
import Notification from "../../components/Notification";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QandA = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [popupRowIndex, setPopupRowIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const handleEditClick = (data, index) => {
    setRowData(data);
    setShowPopup(true);
    setPopupRowIndex(index);
  }

  const handleSave = (updatedData) => {

    //update the data in the table
    axios.put(`http://localhost:8070/faq/update/${updatedData.id}`, updatedData)
      .then(() => {
        alert("FAQ Updated");
        window.location.reload()

      })
      .catch((err) => {
        alert("Error");
      });

    setShowPopup(false);
    setPopupRowIndex(null);
  }

  const handleClose = () => {
    setShowPopup(false);
    setPopupRowIndex(null);
  }

  const [faq, setFaq] = useState([]);
  useEffect(() => {
    function getFaq() {
      axios.get("http://localhost:8070/faq/").then((res) => {
        setFaq(res.data);
      }).catch((err) => {
        alert(err);
      })
    }
    getFaq();
  }, []);

  const [category, setcategory] = useState("");
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");

  const validateForm = () => {
    if (!category || !question || !answer) {
      //alert('Please select a Category and include the FAQ and Answer');
      toast.error("Please select a Category and include the FAQ and Answer");
      return false;
    }
    return true;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const faq = { category, question, answer };

      axios.post("http://localhost:8070/faq/add/", faq).then(() => {
        alert("New FAQ added!");
        toast.success("FAQ added!")
        window.location.reload(false);
        setcategory('')
        setquestion('')
        setanswer('')
      }).catch((err) => {
        alert(err);
      })
    }
  }

  function deleteFaq(_id) {
    const del = "http://localhost:8070/faq/delete/" + _id;

    axios.delete(del).then(() => {
      alert("FAQ Deleted");
      toast.success("FAQ deleted!")
      window.location.reload(false);
    }).catch(err => {
      alert("Could not Delete");
    });
  };






  return (
    <div>
      <ToastContainer position="top-right" theme="colored" />
      <Niv name='Frquently Asked Questions' />
      <Notification/>
      <div className='data'>
        <a href='/QandA/chat'>
          <button class="btn12"><BsEnvelope size={20} />&nbsp;&nbsp;Check Customer Messages</button>
        </a>

        <form className="FormFAQ" onSubmit={handleSubmit}>
          <div class="formfiels">
            <div class="txta">

              <label className="lbl">FAQ Category</label><br />
              <input type="radio" value="Orders" name="category" onChange={(e) => setcategory(e.target.value)} /> Orders<br />
              <input type="radio" value="Account" name="category" onChange={(e) => setcategory(e.target.value)} /> Account<br />
              <input type="radio" value="Payment" name="category" onChange={(e) => setcategory(e.target.value)} /> Payment<br />
              <input type="radio" value="Delivery" name="category" onChange={(e) => setcategory(e.target.value)} /> Delivery<br />
              {/* <textarea rows="1" cols="110" style={{resize:'none'}} placeholder="Category" value={category} onChange={(e) => setcategory(e.target.value)}/> */}
            </div>





            <div class="txta">
              <label className="lbl">Question</label><br />
              <textarea rows="2" cols="108" style={{ resize: 'none' }} placeholder="Question" value={question} onChange={(e) => setquestion(e.target.value)} />
            </div>

            <div class="txta">
              <label className="lbl">Answer</label><br />
              <textarea rows="2" cols="108" style={{ resize: 'none' }} placeholder="Answer" value={answer} onChange={(e) => setanswer(e.target.value)} />
            </div>
          </div>
          <br />
          <button class="btn1" type="submit" >
            <span><BsPlusLg />&nbsp;&nbsp;Add new FAQ</span>
          </button>
        </form>



        <div className="searchbar">
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." />
        </div>


        <table className="frmtable">
          <thead>

            <td className="thd">Category</td>
            <td className="thd">FAQ</td>
            <td className="thd">Answer</td>
            <td className="thd">Edit</td>
            <td className="thd">Delete</td>

          </thead>
          <tbody>
            {faq
              .filter(faq => {
                const searchTermLowerCase = searchTerm.toLowerCase();
                return (
                  faq.category.toLowerCase().includes(searchTermLowerCase) ||
                  faq.question.toLowerCase().includes(searchTermLowerCase) ||
                  faq.answer.toLowerCase().includes(searchTermLowerCase)
                );
              })
              .map((faq, index) => (
                <tr key={faq._id}>
                  <td >{faq.category}</td>
                  <td >{faq.question}</td>
                  <td >{faq.answer}</td>

                  <td><button class="editf" onClick={() => handleEditClick(faq, index)}>Edit</button></td>
                  <td><button class="deletef" onClick={(e) => deleteFaq(faq._id)}>Delete</button></td>
                  {popupRowIndex === index && showPopup && <EditRowPopup key={faq._id} rowData={faq} onSave={handleSave} onClose={handleClose} />}
                </tr>
              ))}
          </tbody>

        </table>
      </div>




    </div>


  );
};

export default QandA;