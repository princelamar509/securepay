// src/components/SettingsView.jsx
import React from 'react';
import { Lock, Fingerprint, CreditCard, LogOut } from 'lucide-react';

const SettingsView = ({ user }) => {
  return (
    <div className="settings-container">
      <h2 className='settings-title'>Settings</h2>

      <div className="account-info">
        <h3>Account Information</h3>
        <div>
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
          <div>Phone: {user.phoneNumber}</div>
        </div>
      </div>

      <div className="security-settings">
        <h3>Security Settings</h3>
        <button className="btn-secondary">
          <Lock className="icon" /> Change Password
        </button>
        <button className="btn-secondary">
          <Fingerprint className="icon" /> Manage Biometric Authentication
        </button>
      </div>

      <div className="linked-banks">
        <h3>Linked Banks</h3>
        {user.linkedBanks.map((bank, index) => (
          <div key={index} className="bank-item">
            <CreditCard className="icon" /> {bank}
          </div>
        ))}
      </div>

      <button className="btn-logout">
        <LogOut className="icon" /> Sign Out
      </button>
    </div>
  );
};

export default SettingsView;
