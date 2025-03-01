// src/components/AddMoneyPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMoneyPage = ({ user }) => {
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add money to selected bank
    console.log(`Adding $${amount} from ${selectedBank}`);
    navigate('/');
  };

  return (
    <div className="add-money-container">
      <h2 className="add-money-title">Add Money</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Bank Account</label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            required
          >
            <option value="">Select Bank</option>
            {user.linkedBanks.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="add-card-btn">
          Add Money
        </button>
        <button
      type="button"
      className="add-card-btn"
      onClick={() => navigate('/CardPage')}
    >
      Add a card
    </button>
      </form>
    </div>
  );
};

export default AddMoneyPage;
