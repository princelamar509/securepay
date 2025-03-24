// src/components/SendMoneyPage.jsx
import React, { useState, useEffect } from 'react';
import { Camera, UploadCloud, X, ChevronLeft, DollarSign, AlertCircle, Clock, CheckCircle, Star, Users, CreditCard, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SendMoneyPage.css';
const SendMoneyPage = ({ user }) => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientContact, setRecipientContact] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [showIDUpload, setShowIDUpload] = useState(false);
  const [frontID, setFrontID] = useState(null);
  const [backID, setBackID] = useState(null);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentContacts, setRecentContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  
  const navigate = useNavigate();

  // Mock recent contacts data
  useEffect(() => {
    // This would normally come from an API
    const mockContacts = [
      { id: 1, name: 'John Doe', contact: 'john@example.com', recent: true },
      { id: 2, name: 'Jane Smith', contact: '555-123-4567', recent: true },
      { id: 3, name: 'Robert Johnson', contact: 'robert@example.com', recent: false },
      { id: 4, name: 'Emily Davis', contact: '555-987-6543', recent: true }
    ];
    setRecentContacts(mockContacts);
    setFilteredContacts(mockContacts.filter(c => c.recent));
  }, []);

  // Filter contacts based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = recentContacts.filter(
        contact => 
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          contact.contact.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(recentContacts.filter(c => c.recent));
    }
  }, [searchTerm, recentContacts]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  
    // Show ID verification if amount is equal or above $1000
    if (parseFloat(value) >= 1000) {
      setShowIDUpload(true);
    } else {
      setShowIDUpload(false);
    }
  };

  const handleContactSelect = (contact) => {
    setRecipientName(contact.name);
    setRecipientContact(contact.contact);
    setSearchTerm('');
  };

  const handleFrontIDUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFrontID(e.target.files[0]);
    }
  };

  const handleBackIDUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBackID(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Reset form after brief success message
      setTimeout(() => {
        setAmount('');
        setRecipientContact('');
        setRecipientName('');
        setMessage('');
        setFrontID(null);
        setBackID(null);
        setShowSuccess(false);
        navigate('/');
      }, 2000);
    }, 1500);
  };

  const handleToggleMessage = () => {
    setShowMessage((prevState) => !prevState);
  };

  const formatAsCurrency = (val) => {
    if (!val) return '';
    return parseFloat(val).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="page-title">Send Money</h1>
      </div>

      <div className="send-money-container">
        <div className="transfer-options">
          <div className="search-contacts">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="contact-search"
            />
            {searchTerm && (
              <div className="contact-results">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map(contact => (
                    <div 
                      key={contact.id} 
                      className="contact-item"
                      onClick={() => handleContactSelect(contact)}
                    >
                      <div className="contact-avatar">
                        {contact.name.charAt(0)}
                      </div>
                      <div className="contact-details">
                        <div className="contact-name">{contact.name}</div>
                        <div className="contact-info">{contact.contact}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">No matching contacts found</div>
                )}
              </div>
            )}
          </div>

          <div className="recent-contacts">
            <h3>Recent</h3>
            <div className="contacts-list">
              {recentContacts
                .filter(c => c.recent)
                .map(contact => (
                  <div 
                    key={contact.id} 
                    className="contact-bubble"
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="contact-initial">{contact.name.charAt(0)}</div>
                    <div className="contact-shortname">{contact.name.split(' ')[0]}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {showSuccess ? (
          <div className="success-panel">
            <div className="success-icon">
              <CheckCircle size={48} />
            </div>
            <h2>Transfer Successful!</h2>
            <p>Your money is on its way to {recipientName}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="transfer-form">
            <div className="form-group">
              <label>Recipient Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter recipient's name"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email / Phone Number</label>
              <input
                type="text"
                value={recipientContact}
                onChange={(e) => setRecipientContact(e.target.value)}
                placeholder="Enter email or phone number"
                required
              />
            </div>
            
            <div className="form-group amount-group">
              <label>Amount</label>
              <div className="amount-input">
                <DollarSign size={20} className="currency-icon" />
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  required
                  step="0.01"
                  min="1"
                />
              </div>
              {amount && (
                <div className="amount-display">
                  ${formatAsCurrency(amount)}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <div className="payment-options">
                <div 
                  className={`payment-option ${paymentMethod === 'wallet' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <DollarSign size={20} />
                  <div className="payment-details">
                    <span>Wallet Balance</span>
                    <small>$2,459.50 available</small>
                  </div>
                </div>
                
                <div 
                  className={`payment-option ${paymentMethod === 'bank' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('bank')}
                >
                  <CreditCard size={20} />
                  <div className="payment-details">
                    <span>Bank Account</span>
                    <small>Linked accounts</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label>Message (Optional)</label>
              <textarea 
                placeholder="Add a note"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="message-input"
              ></textarea>
            </div>

            {showIDUpload && (
              <div className="id-verification">
                <div className="verification-header">
                  <Shield size={20} />
                  <h3>ID Verification Required</h3>
                </div>
                
                <p className="verification-note">
                  For transfers of $1,000 or more, we require ID verification for security purposes.
                </p>
                
                <div className="upload-container">
                  <div className="upload-section">
                    <label>Front of ID</label>
                    <div className={`upload-area ${frontID ? 'has-file' : ''}`}>
                      {!frontID ? (
                        <>
                          <UploadCloud size={24} />
                          <p>Drag & drop or click to upload</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFrontIDUpload}
                            required={showIDUpload}
                            className="file-input"
                          />
                        </>
                      ) : (
                        <div className="file-preview">
                          <CheckCircle size={20} className="file-icon" />
                          <span className="file-name">{frontID.name}</span>
                          <button 
                            type="button" 
                            className="remove-file"
                            onClick={() => setFrontID(null)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="upload-section">
                    <label>Back of ID</label>
                    <div className={`upload-area ${backID ? 'has-file' : ''}`}>
                      {!backID ? (
                        <>
                          <UploadCloud size={24} />
                          <p>Drag & drop or click to upload</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBackIDUpload}
                            required={showIDUpload}
                            className="file-input"
                          />
                        </>
                      ) : (
                        <div className="file-preview">
                          <CheckCircle size={20} className="file-icon" />
                          <span className="file-name">{backID.name}</span>
                          <button 
                            type="button"
                            className="remove-file"
                            onClick={() => setBackID(null)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="transfer-summary">
              <div className="summary-detail">
                <span>Transfer Fee</span>
                <span>$0.00</span>
              </div>
              <div className="summary-detail">
                <span>Estimated Arrival</span>
                <span>Instant</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${amount ? formatAsCurrency(amount) : '0.00'}</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Send Money'}
            </button>
          </form>
        )}

        {showMessage && (
          <div className="caution-section">
            <div className="caution-header">
              <AlertCircle size={20} />
              <h3>Safety Tips</h3>
              <button className="btn-close" onClick={handleToggleMessage}>
                <X size={16} />
              </button>
            </div>
            <ul className="caution-list">
              <li>Only send money to people you know and trust</li>
              <li>Verify recipient information before sending</li>
              <li>For amounts equal to or above $1,000, ID verification is required</li>
              <li>Need help? Contact our support team at (1-800) 888-5567</li>
            </ul>
          </div>
        )}
      </div>

      <div className="transfer-benefits">
        <div className="benefit-item">
          <Clock size={20} />
          <div className="benefit-text">
            <h4>Fast Transfers</h4>
            <p>Most transfers arrive instantly</p>
          </div>
        </div>
        <div className="benefit-item">
          <Shield size={20} />
          <div className="benefit-text">
            <h4>Secure & Protected</h4>
            <p>Industry-leading security protocols</p>
          </div>
        </div>
        <div className="benefit-item">
          <Star size={20} />
          <div className="benefit-text">
            <h4>Low Fees</h4>
            <p>No fees for standard transfers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyPage;