// src/components/AddMoneyPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard,Landmark,  ChevronLeft, DollarSign, Clock, AlertTriangle, Check } from 'lucide-react';
import './AddMoneyPage.css';
const AddMoneyPage = ({ user }) => {
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [transferType, setTransferType] = useState('instant');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  // Recent transactions (would normally come from props or API)
  const recentTransfers = [
    { date: 'Mar 18, 2025', amount: '$250.00', source: 'Chase Bank' },
    { date: 'Feb 27, 2025', amount: '$500.00', source: 'Bank of America' },
    { date: 'Feb 14, 2025', amount: '$120.00', source: 'Wells Fargo' }
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowSuccessMessage(true);
      
      // Redirect after success message
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1500);
  };
  
  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="page-title">Add Money</h1>
      </div>
      
      <div className="add-money-container">
        <div className="add-money-card">
          <h2 className="add-money-title">
            <DollarSign size={20} />
            Deposit Funds
          </h2>
          
          {showSuccessMessage ? (
            <div className="success-message">
              <Check size={40} />
              <h3>Transfer Initiated!</h3>
              <p>Your money is on the way. Redirecting to dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Amount ($)</label>
                <div className="input-with-icon">
                  <DollarSign size={18} />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Select Bank Account</label>
                <div className="input-with-icon">
                  <Landmark size={18} />
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
              </div>
              
              <div className="form-group">
                <label>Transfer Type</label>
                <div className="transfer-type-options">
                  <button
                    type="button"
                    className={`transfer-option ${transferType === 'instant' ? 'active' : ''}`}
                    onClick={() => setTransferType('instant')}
                  >
                    <div className="transfer-icon">
                      <DollarSign size={18} />
                    </div>
                    <div className="transfer-details">
                      <span className="transfer-name">Instant</span>
                      <span className="transfer-fee">1.5% fee</span>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    className={`transfer-option ${transferType === 'standard' ? 'active' : ''}`}
                    onClick={() => setTransferType('standard')}
                  >
                    <div className="transfer-icon">
                      <Clock size={18} />
                    </div>
                    <div className="transfer-details">
                      <span className="transfer-name">Standard (1-3 days)</span>
                      <span className="transfer-fee">No fee</span>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="notice-box">
                <AlertTriangle size={16} />
                <p>Instant transfers are immediately available but incur a 1.5% fee. Standard transfers typically take 1-3 business days to process with no fees.</p>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="primary-button" disabled={loading}>
                  {loading ? 'Processing...' : 'Add Money'}
                </button>
                
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => navigate('/CardPage')}
                >
                  <CreditCard size={16} />
                  Add a new card
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="recent-activity-card">
          <h3 className="card-subtitle">Recent Transfers</h3>
          
          {recentTransfers.length > 0 ? (
            <ul className="recent-transfers-list">
              {recentTransfers.map((transfer, index) => (
                <li key={index} className="transfer-item">
                  <div className="transfer-info">
                    <span className="transfer-date">{transfer.date}</span>
                    <span className="transfer-source">{transfer.source}</span>
                  </div>
                  <span className="transfer-amount">{transfer.amount}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data-message">No recent transfers</p>
          )}
          
          <div className="limits-info">
            <h4>Transfer Limits</h4>
            <div className="limit-item">
              <span>Daily Limit:</span>
              <span>$10,000</span>
            </div>
            <div className="limit-item">
              <span>Monthly Limit:</span>
              <span>$50,000</span>
            </div>
            <p className="limit-note">Limits are based on your verification level</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMoneyPage;