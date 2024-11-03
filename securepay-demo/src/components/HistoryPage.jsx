// src/components/HistoryPage.jsx
import React from 'react';
import Footer from '../components/Footer';
const HistoryPage = ({ user }) => {
  const { transactionHistory } = user;

  return (
    <div className="history-page">
      <h2>Transaction History</h2>
      <ul>
        {transactionHistory.length > 0 ? (
          transactionHistory.map((transaction, index) => (
            <li key={index} className={`transaction-item ${transaction.type}`}>
              <p>
                <strong>{transaction.type === 'sent' ? 'Sent to' : 'Received from'}:</strong> {transaction.recipient}
              </p>
              <p>
                <strong>Amount:</strong> ${transaction.amount.toFixed(2)}
              </p>
              <p>
                <strong>Date:</strong> {transaction.timestamp}
              </p>
            </li>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </ul>

      <Footer />
    </div>
  );
};

export default HistoryPage;
