import React, { useState } from 'react';
import './style.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRowPopup = ({rowData, onSave, onClose}) => {
  const [question, setQuestion] = useState(rowData.question);
  const [answer, setAnswer] = useState(rowData.answer);
  const [category, setCategory] = useState(rowData.category);

  const handleSave = () => {
    if (!category || !question || !answer) {
      toast.error("Fields cannot be empty!")
      return;
    }
    onSave({id:rowData._id, category, question, answer});
    onClose();
  }


  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Update FAQ</h2>
        <div>
            <label className="lbl"> FAQ Category</label><br/>
          <label>
            <input type="radio" value="Orders" checked={category === "Orders"} onChange={(e) => setCategory(e.target.value)} />
            Orders<br/>
          </label>
          <label>
            <input type="radio" value="Account" checked={category === "Account"} onChange={(e) => setCategory(e.target.value)} />
            Account<br/>
          </label>
          <label>
            <input type="radio" value="Payment" checked={category === "Payment"} onChange={(e) => setCategory(e.target.value)} />
            Payment<br/>
          </label>
          <label>
            <input type="radio" value="Delivery" checked={category === "Delivery"} onChange={(e) => setCategory(e.target.value)} />
            Delivery<br/>
          </label>
        </div>
        <div>
          <label className="lbl">
            Question<br/></label>
            <textarea rows="2" cols="60" style={{resize:'none'}} value={question} onChange={(e) => setQuestion(e.target.value)} />
          
        </div>
        <div>
          <label className="lbl">
            Answer<br/></label>
            <textarea rows="2" cols="60" style={{resize:'none'}} value={answer} onChange={(e) => setAnswer(e.target.value)}/>
          
        </div>
        <div>
          <button class="btnup" onClick={handleSave}>Save</button>
          <button class="btnup" onClick={onClose}>Cancel</button>
        </div>
        {/* <ToastContainer theme="colored"/> */}
      </div>
    </div>
  );
}

export default EditRowPopup;
