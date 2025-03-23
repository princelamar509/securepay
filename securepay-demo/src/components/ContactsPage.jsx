// src/components/ContactsPage.jsx
import React, { useState } from 'react';
import { ChevronLeft, Search, UserPlus, MoreHorizontal, Star, Phone, Mail, Edit, Trash2, X, Check, Filter, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ContactsPage.css';
const ContactsPage = ({ user }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [filterFavorites, setFilterFavorites] = useState(false);
  
  // Mock contact data - in a real app, this would come from user prop
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', favorite: true, avatar: null },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', favorite: true, avatar: null },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '(555) 246-8135', favorite: false, avatar: null },
    { id: 4, name: 'Lisa Brown', email: 'lisa@example.com', phone: '(555) 369-2514', favorite: false, avatar: null },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', phone: '(555) 159-7532', favorite: true, avatar: null }
  ]);

  // New contact form state
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    favorite: false
  });

  // Filter and sort contacts
  const filteredContacts = contacts
    .filter(contact => 
      (filterFavorites ? contact.favorite : true) &&
      (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       contact.phone.includes(searchTerm))
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'email') {
        return a.email.localeCompare(b.email);
      }
      return 0;
    });

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? {...contact, favorite: !contact.favorite} : contact
    ));
  };

  // Delete contact
  const deleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(contact => contact.id !== id));
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(null);
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({
      ...newContact,
      [name]: value
    });
  };

  // Add new contact
  const addContact = (e) => {
    e.preventDefault();
    const newId = Math.max(...contacts.map(c => c.id), 0) + 1;
    const createdContact = {
      ...newContact,
      id: newId,
      avatar: null
    };
    
    setContacts([...contacts, createdContact]);
    setNewContact({
      name: '',
      email: '',
      phone: '',
      favorite: false
    });
    setShowAddForm(false);
  };

  // Generate avatar placeholder
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="contacts-page-container">
      <div className="contacts-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="page-title">Contacts</h1>
      </div>

      <div className="contacts-wrapper">
        <div className="contacts-sidebar">
          <div className="contacts-toolbar">
            <div className="search-wrapper">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search contacts..." 
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
            
            <div className="toolbar-actions">
              <button className="action-button" onClick={() => setShowAddForm(true)}>
                <UserPlus size={18} />
              </button>
              <button 
                className={`action-button ${filterFavorites ? 'active' : ''}`} 
                onClick={() => setFilterFavorites(!filterFavorites)}
              >
                <Star size={18} />
              </button>
              <button className="action-button" onClick={() => setSortBy(sortBy === 'name' ? 'email' : 'name')}>
                <ArrowUpDown size={18} />
              </button>
            </div>
          </div>
          
          <div className="contacts-list">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className={`contact-item ${selectedContact && selectedContact.id === contact.id ? 'selected' : ''}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="contact-avatar">
                    {contact.avatar ? (
                      <img src={contact.avatar} alt={contact.name} />
                    ) : (
                      <span>{getInitials(contact.name)}</span>
                    )}
                  </div>
                  <div className="contact-info">
                    <h3 className="contact-name">{contact.name}</h3>
                    <p className="contact-email">{contact.email}</p>
                  </div>
                  <button 
                    className={`favorite-button ${contact.favorite ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(contact.id);
                    }}
                  >
                    <Star size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="no-contacts">
                <p>No contacts found</p>
                <button className="btn-primary" onClick={() => setShowAddForm(true)}>
                  <UserPlus size={18} />
                  Add Contact
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="contact-details-panel">
          {selectedContact ? (
            <div className="contact-details">
              <div className="contact-header">
                <div className="large-avatar">
                  {selectedContact.avatar ? (
                    <img src={selectedContact.avatar} alt={selectedContact.name} />
                  ) : (
                    <span>{getInitials(selectedContact.name)}</span>
                  )}
                </div>
                <h2>{selectedContact.name}</h2>
                <div className="contact-actions">
                  <button className="action-button" onClick={() => deleteContact(selectedContact.id)}>
                    <Trash2 size={18} />
                  </button>
                  <button className="action-button">
                    <Edit size={18} />
                  </button>
                  <button 
                    className={`action-button ${selectedContact.favorite ? 'active' : ''}`}
                    onClick={() => toggleFavorite(selectedContact.id)}
                  >
                    <Star size={18} />
                  </button>
                </div>
              </div>
              
              <div className="contact-body">
                <div className="contact-section">
                  <h3>Contact Information</h3>
                  <div className="contact-field">
                    <div className="field-icon">
                      <Mail size={18} />
                    </div>
                    <div className="field-content">
                      <label>Email</label>
                      <p>{selectedContact.email}</p>
                    </div>
                  </div>
                  <div className="contact-field">
                    <div className="field-icon">
                      <Phone size={18} />
                    </div>
                    <div className="field-content">
                      <label>Phone</label>
                      <p>{selectedContact.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="contact-section">
                  <h3>Recent Transactions</h3>
                  <div className="transactions-list">
                    <p className="no-transactions">No recent transactions with this contact</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <div className="illustration">
                <UserPlus size={48} />
              </div>
              <h2>No Contact Selected</h2>
              <p>Select a contact to view details or add a new contact</p>
              <button className="btn-primary" onClick={() => setShowAddForm(true)}>
                <UserPlus size={18} />
                Add New Contact
              </button>
            </div>
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="add-contact-modal">
            <div className="modal-header">
              <h2>Add New Contact</h2>
              <button className="close-button" onClick={() => setShowAddForm(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={addContact}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newContact.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newContact.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newContact.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="favorite"
                  name="favorite"
                  checked={newContact.favorite}
                  onChange={(e) => setNewContact({...newContact, favorite: e.target.checked})}
                />
                <label htmlFor="favorite">Mark as favorite</label>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;