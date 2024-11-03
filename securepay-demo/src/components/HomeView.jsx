// src/components/HomeView.jsx
import React from 'react';
import { Send, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeView = ({ user }) => {
  const navigate = useNavigate();

  console

  return (
    <div className="home-container">
      <div className="balance-card">
        <h2 className="text-xl">Welcome back, {user.name}</h2>
        <p>Your current balance</p>
        <div className="balance-amount">$2,459.50</div>
        <div className="action-buttons">
          <button className="btn-primary" onClick={() => navigate('/send')}>
            <Send className="icon" /> Send Money
          </button>
          <button className="btn-secondary" onClick={() => navigate('/add-money')}>
            <CreditCard className="icon" /> Add Money
          </button>
        </div>
      </div>

      <div className="quick-actions">
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div>
            {user.transactionHistory.map((tx, index) => (
              <div key={index} className="transaction-item">
                <span>{tx.recipient}</span>
                <span>${tx.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="linked-banks">
          <h3>Linked Banks</h3>
          {user.linkedBanks.map((bank, index) => (
            <div key={index} className="bank-item">
              <CreditCard className="icon" /> {bank}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
