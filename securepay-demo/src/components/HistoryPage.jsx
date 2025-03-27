
// src/components/HistoryPage.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Filter, Download, Calendar, Search, CreditCard, TrendingUp, TrendingDown, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './HistoryPage.css';
const HistoryPage = ({ user }) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    // In a real app, you might fetch these from an API
    if (user && user.transactionHistory) {
      // Add extra data to each transaction for display purposes
      const enhancedTransactions = user.transactionHistory.map(transaction => ({
        ...transaction,
        category: transaction.category || getRandomCategory(),
        status: transaction.status || getRandomStatus()
      }));
      setTransactions(enhancedTransactions);
      setFilteredTransactions(enhancedTransactions);
    }
  }, [user]);

  // Helper function to get random category for demo
  const getRandomCategory = () => {
    const categories = ['Shopping', 'Food', 'Transport', 'Entertainment', 'Bills', 'Other'];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  // Helper function to get random status for demo
  const getRandomStatus = () => {
    const statuses = ['Completed', 'Pending', 'Failed'];
    const weights = [0.85, 0.1, 0.05]; // 85% completed, 10% pending, 5% failed
    
    const random = Math.random();
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i];
      if (random < sum) return statuses[i];
    }
    return statuses[0];
  };

  // Apply filters and search
  useEffect(() => {
    let results = [...transactions];
    
    // Apply type filter
    if (activeFilter !== 'all') {
      results = results.filter(transaction => transaction.type === activeFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      results = results.filter(transaction => 
        transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply date range
    if (dateRange.from) {
      const fromDate = new Date(dateRange.from);
      results = results.filter(transaction => new Date(transaction.timestamp) >= fromDate);
    }
    
    if (dateRange.to) {
      const toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999); // End of the day
      results = results.filter(transaction => new Date(transaction.timestamp) <= toDate);
    }
    
    // Apply sorting
    results.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredTransactions(results);
  }, [activeFilter, searchTerm, dateRange, sortOrder, transactions]);

  // Calculate totals
  const totals = filteredTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'sent') {
      acc.sent += transaction.amount;
    } else {
      acc.received += transaction.amount;
    }
    return acc;
  }, { sent: 0, received: 0 });

  // Toggle filter panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Reset filters
  const resetFilters = () => {
    setActiveFilter('all');
    setSearchTerm('');
    setDateRange({ from: '', to: '' });
    setSortOrder('newest');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="page-title">Transaction History</h1>
      </div>
      
      <div className="history-container">
        <div className="history-summary">
          <div className="summary-card total-sent">
            <div className="summary-icon">
              <TrendingDown size={20} />
            </div>
            <div className="summary-details">
              <h3>Total Sent</h3>
              <span className="summary-amount">{formatCurrency(totals.sent)}</span>
            </div>
          </div>
          
          <div className="summary-card total-received">
            <div className="summary-icon">
              <TrendingUp size={20} />
            </div>
            <div className="summary-details">
              <h3>Total Received</h3>
              <span className="summary-amount">{formatCurrency(totals.received)}</span>
            </div>
          </div>
          
          <div className="summary-card net-amount">
            <div className="summary-icon">
              <CreditCard size={20} />
            </div>
            <div className="summary-details">
              <h3>Net Amount</h3>
              <span className="summary-amount">{formatCurrency(totals.received - totals.sent)}</span>
            </div>
          </div>
        </div>
        
        <div className="filter-controls">
          <div className="search-wrapper">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                <X size={16} />
              </button>
            )}
          </div>
          
          <button 
            className={`filter-button ${showFilters ? 'active' : ''}`} 
            onClick={toggleFilters}
          >
            <Filter size={18} />
            <span>Filter</span>
            <ChevronDown size={16} className={`chevron ${showFilters ? 'up' : ''}`} />
          </button>
          
          <button className="export-button">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-section">
              <h3>Transaction Type</h3>
              <div className="filter-options">
                <button 
                  className={`filter-option ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-option ${activeFilter === 'sent' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('sent')}
                >
                  Sent
                </button>
                <button 
                  className={`filter-option ${activeFilter === 'received' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('received')}
                >
                  Received
                </button>
              </div>
            </div>
            
            <div className="filter-section">
              <h3>Date Range</h3>
              <div className="date-filters">
                <div className="date-input-group">
                  <label>From</label>
                  <div className="date-input">
                    <Calendar size={16} />
                    <input 
                      type="date" 
                      value={dateRange.from}
                      onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="date-input-group">
                  <label>To</label>
                  <div className="date-input">
                    <Calendar size={16} />
                    <input 
                      type="date" 
                      value={dateRange.to}
                      onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="filter-section">
              <h3>Sort Order</h3>
              <div className="filter-options">
                <button 
                  className={`filter-option ${sortOrder === 'newest' ? 'active' : ''}`}
                  onClick={() => setSortOrder('newest')}
                >
                  Newest First
                </button>
                <button 
                  className={`filter-option ${sortOrder === 'oldest' ? 'active' : ''}`}
                  onClick={() => setSortOrder('oldest')}
                >
                  Oldest First
                </button>
              </div>
            </div>
            
            <div className="filter-actions">
              <button className="reset-filters" onClick={resetFilters}>Reset All</button>
            </div>
          </div>
        )}
        
        <div className="transactions-list">
          {filteredTransactions.length > 0 ? (
            <>
              <div className="transactions-header">
                <span className="header-recipient">Recipient/Sender</span>
                <span className="header-category">Category</span>
                <span className="header-date">Date</span>
                <span className="header-amount">Amount</span>
                <span className="header-status">Status</span>
              </div>
              
              {filteredTransactions.map((transaction, index) => (
                <div key={index} className={`transaction-item ${transaction.type}`}>
                  <div className="transaction-details">
                    <div className="transaction-icon">
                      {transaction.type === 'sent' ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                    </div>
                    <div className="transaction-party">
                      <span className="transaction-recipient">{transaction.recipient}</span>
                      <span className="transaction-type">
                        {transaction.type === 'sent' ? 'Money Sent' : 'Money Received'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="transaction-category">{transaction.category}</div>
                  
                  <div className="transaction-date">{transaction.timestamp}</div>
                  
                  <div className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'sent' ? '-' : '+'}{formatCurrency(transaction.amount)}
                  </div>
                  
                  <div className={`transaction-status status-${transaction.status.toLowerCase()}`}>
                    {transaction.status}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="no-transactions">
              <div className="empty-state-icon">
                <CreditCard size={40} />
              </div>
              <h3>No transactions found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
        
        {filteredTransactions.length > 0 && (
          <div className="pagination">
            <button className="pagination-button" disabled>Previous</button>
            <div className="pagination-pages">
              <button className="page-number active">1</button>
              <button className="page-number">2</button>
              <button className="page-number">3</button>
            </div>
            <button className="pagination-button">Next</button>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default HistoryPage;
