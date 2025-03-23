// src/components/SettingsView.jsx
import React, { useState } from 'react';
import { Lock, Fingerprint, CreditCard, LogOut, Bell, User, Shield, HelpCircle, Moon, Sun, ChevronRight, Plus, Trash2, Check, X, Globe, Key } from 'lucide-react';
import { Navigate } from 'react-router';
import { toast } from 'sonner';
toast.success("Signed out successfully.");
import './SettingsView.css';
const SettingsView = ({ user, setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
const handleLogout = () => {
  localStorage.removeItem('isAuthenticated');
  setIsAuthenticated(false);
Navigate('/signin');
}
  const handleNotificationChange = (type) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // In a real app, you would apply dark mode to the entire app here
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };


  


  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2 className='settings-title'>Settings</h2>
        <p className="settings-description">Manage your account settings and preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <button 
            className={`sidebar-item ${activeTab === 'account' ? 'active' : ''}`} 
            onClick={() => setActiveTab('account')}
          >
            <User size={20} />
            <span>Account</span>
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'security' ? 'active' : ''}`} 
            onClick={() => setActiveTab('security')}
          >
            <Shield size={20} />
            <span>Security</span>
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'payment' ? 'active' : ''}`} 
            onClick={() => setActiveTab('payment')}
          >
            <CreditCard size={20} />
            <span>Payment Methods</span>
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'notifications' ? 'active' : ''}`} 
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={20} />
            <span>Notifications</span>
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'appearance' ? 'active' : ''}`} 
            onClick={() => setActiveTab('appearance')}
          >
            <Moon size={20} />
            <span>Appearance</span>
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'help' ? 'active' : ''}`} 
            onClick={() => setActiveTab('help')}
          >
            <HelpCircle size={20} />
            <span>Help & Support</span>
          </button>
          <button className="sidebar-item logout" onClick={handleLogout} >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="settings-panel">
          {activeTab === 'account' && (
            <div className="settings-section">
              <h3 className="section-title">Account Information</h3>
              
              <div className="profile-card">
                <div className="profile-avatar">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} />
                  ) : (
                    <div className="avatar-placeholder">{user.name.charAt(0)}</div>
                  )}
                </div>
                <div className="profile-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  <button className="btn-outline">Edit Profile</button>
                </div>
              </div>
              
              <div className="info-group">
                <div className="info-item">
                  <label>Full Name</label>
                  <div className="info-value">{user.name}</div>
                </div>
                
                <div className="info-item">
                  <label>Email Address</label>
                  <div className="info-value">{user.email}</div>
                </div>
                
                <div className="info-item">
                  <label>Phone Number</label>
                  <div className="info-value">{user.phoneNumber}</div>
                </div>
                
                <div className="info-item">
                  <label>Address</label>
                  <div className="info-value">
                    {user.address || '123 Main St, Anytown, USA'}
                  </div>
                </div>
                
                <div className="info-item">
                  <label>Account Created</label>
                  <div className="info-value">January 15, 2023</div>
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="btn-primary">
                  <User size={18} /> Edit Profile
                </button>
                <button className="btn-secondary">
                  <Key size={18} /> Change Email
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="settings-section">
              <h3 className="section-title">Security Settings</h3>
              
              <div className="security-option">
                <div className="option-info">
                  <h4>Password</h4>
                  <p>Last changed 3 months ago</p>
                </div>
                <button className="btn-secondary">
                  <Lock size={18} /> Change Password
                </button>
              </div>
              
              <div className="security-option">
                <div className="option-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="twoFactor" 
                    checked={twoFactorEnabled}
                    onChange={handleTwoFactorToggle}
                  />
                  <label htmlFor="twoFactor"></label>
                </div>
              </div>
              
              <div className="security-option">
                <div className="option-info">
                  <h4>Biometric Authentication</h4>
                  <p>Use your fingerprint or face for quick access</p>
                </div>
                <button className="btn-secondary">
                  <Fingerprint size={18} /> Manage
                </button>
              </div>
              
              <div className="security-option">
                <div className="option-info">
                  <h4>Session Management</h4>
                  <p>View and manage your active sessions</p>
                </div>
                <button className="btn-secondary">
                  <Shield size={18} /> View Sessions
                </button>
              </div>
              
              <div className="security-activity">
                <h4>Recent Security Activity</h4>
                <div className="activity-item">
                  <div className="activity-icon successful">
                    <Check size={16} />
                  </div>
                  <div className="activity-details">
                    <div className="activity-text">Successful login from New York</div>
                    <div className="activity-time">Today, 10:45 AM</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon failed">
                    <X size={16} />
                  </div>
                  <div className="activity-details">
                    <div className="activity-text">Failed login attempt from unknown location</div>
                    <div className="activity-time">Yesterday, 08:32 PM</div>
                  </div>
                </div>
                <button className="btn-text">View All Activity</button>
              </div>
            </div>
          )}
          
          {activeTab === 'payment' && (
            <div className="settings-section">
              <h3 className="section-title">Payment Methods</h3>
              
              <div className="payment-section">
                <h4>Linked Bank Accounts</h4>
                <div className="bank-list">
                  {user.linkedBanks.map((bank, index) => (
                    <div key={index} className="bank-item">
                      <div className="bank-icon">
                        <CreditCard size={20} />
                      </div>
                      <div className="bank-details">
                        <div className="bank-name">{bank}</div>
                        <div className="bank-info">****6789 • Added on Jan 15, 2023</div>
                      </div>
                      <button className="btn-icon">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="btn-outline add-bank">
                  <Plus size={18} /> Add New Bank
                </button>
              </div>
              
              <div className="payment-section">
                <h4>Credit & Debit Cards</h4>
                <div className="card-item">
                  <div className="card-badge visa">VISA</div>
                  <div className="card-details">
                    <div className="card-number">•••• •••• •••• 4567</div>
                    <div className="card-info">Expires 05/25</div>
                  </div>
                  <div className="card-actions">
                    <button className="btn-text">Edit</button>
                    <button className="btn-text">Remove</button>
                  </div>
                </div>
                <button className="btn-outline">
                  <Plus size={18} /> Add New Card
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h3 className="section-title">Notification Settings</h3>
              
              <div className="notification-option">
                <div className="option-info">
                  <h4>Email Notifications</h4>
                  <p>Receive transaction updates and security alerts</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="emailNotif" 
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <label htmlFor="emailNotif"></label>
                </div>
              </div>
              
              <div className="notification-option">
                <div className="option-info">
                  <h4>Push Notifications</h4>
                  <p>Get real-time alerts on your device</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="pushNotif" 
                    checked={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <label htmlFor="pushNotif"></label>
                </div>
              </div>
              
              <div className="notification-option">
                <div className="option-info">
                  <h4>Marketing Communications</h4>
                  <p>Receive promotional offers and updates</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="marketingNotif" 
                    checked={notifications.marketing}
                    onChange={() => handleNotificationChange('marketing')}
                  />
                  <label htmlFor="marketingNotif"></label>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h3 className="section-title">Appearance</h3>
              
              <div className="appearance-option">
                <div className="option-info">
                  <h4>Dark Mode</h4>
                  <p>Switch between light and dark themes</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="darkMode" 
                    checked={darkMode}
                    onChange={handleDarkModeToggle}
                  />
                  <label htmlFor="darkMode"></label>
                </div>
              </div>
              
              <div className="appearance-option">
                <div className="option-info">
                  <h4>Language</h4>
                  <p>Choose your preferred language</p>
                </div>
                <div className="language-selector">
                  <select>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                  <Globe size={18} />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'help' && (
            <div className="settings-section">
              <h3 className="section-title">Help & Support</h3>
              
              <div className="help-card">
                <h4>Frequently Asked Questions</h4>
                <div className="faq-item">
                  <div className="faq-question">
                    <span>How do I reset my password?</span>
                    <ChevronRight size={18} />
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    <span>How do I link a new bank account?</span>
                    <ChevronRight size={18} />
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    <span>Is my information secure?</span>
                    <ChevronRight size={18} />
                  </div>
                </div>
                <button className="btn-text">View All FAQs</button>
              </div>
              
              <div className="help-card">
                <h4>Contact Support</h4>
                <p>Our support team is available 24/7 to assist you with any issues.</p>
                <div className="contact-options">
                  <button className="btn-primary">Email Support</button>
                  <button className="btn-secondary">Live Chat</button>
                </div>
              </div>
              
              <div className="help-card">
                <h4>App Information</h4>
                <div className="app-info-item">
                  <span>Version</span>
                  <span>2.4.1</span>
                </div>
                <div className="app-info-item">
                  <span>Last Updated</span>
                  <span>March 15, 2025</span>
                </div>
                <div className="app-info-item">
                  <span>Terms of Service</span>
                  <ChevronRight size={18} />
                </div>
                <div className="app-info-item">
                  <span>Privacy Policy</span>
                  <ChevronRight size={18} />
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;