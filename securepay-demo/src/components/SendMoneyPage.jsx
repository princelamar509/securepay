// src/components/SendMoneyPage.jsx
import React, { useState } from 'react';
import { Camera, UploadCloud, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SendMoneyPage = ({ user }) => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientContact, setRecipientContact] = useState('');
  const [amount, setAmount] = useState('');
  const [showIDUpload, setShowIDUpload] = useState(false);
  const [frontID, setFrontID] = useState(null);
  const [backID, setBackID] = useState(null);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value);

    // Show ID verification if amount is above $1000
    if (value > 1000) {
      setShowIDUpload(true);
    } else {
      setShowIDUpload(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Transaction submitted successfully!');
    // Add transaction submission logic here, e.g., sending data to backend
    console.log(`Sending $${amount} to ${recipient}`);
    if (showIDUpload) {
      console.log('ID Front:', frontID);
      console.log('ID Back:', backID);
    }
    navigate('/');
  };

  const handleClose = () => {
    setShowMessage(true); 
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="send-money-container">
      <h2 className="page-title">Send Money</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Recipient Name </label>
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label> Email / Phone Number </label>
        <input
          type="text"
          value={recipientContact}
          onChange={(e) => setRecipientContact(e.target.value)}
          required
        />
      </div>
        <div className="form-group">
          <label>Amount ($) </label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
       <div className='form-group1'>
       <textarea className="form-group" placeholder="Enter message (optional)"></textarea>
       </div>
        {showIDUpload && (
          <div className="id-verification">
            <h3 className='id-verification-title'>ID Verification Required</h3>
            <div className="form-group">
              <label>Upload ID Front</label>
              <UploadCloud />
              <Camera />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFrontID(e.target.files[0])}
                required
              />
            </div>

            <div className="form-group">
              <label>Upload ID Back</label>
              <UploadCloud />
              <Camera />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBackID(e.target.files[0])}
                required
              />
            </div>
          </div>
        )}
        <button type="submit" className="btn-primary" >
          Send Money
        </button>
      </form>
      <div>
      <button className="btn-caution">
      <X className="icon-x" onClick={handleClose} />
      </button>
      {showMessage && (<div className="caution-section">
      <div className="attention-title">Attention!!!</div>
      <p className="attention-text">
        Before sending money to anyone, ensure they meet all criteria, especially if you’re sending money to someone new or whom you don't know.
         For any amount above $1,000, identification is required. If unsure, call our support team at (1-800) 888-5567 24/7. Stay cautious and secure!
      </p>
     
    </div>
    )}
    </div>
    </div>
  );
};

export default SendMoneyPage;
