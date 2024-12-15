// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Shield, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
 const [isSetttingsOpen, setIsSettingsOpen] = useState(false);

 const handleToggle = () => {
  if (isSetttingsOpen){
    setIsSettingsOpen(false);
  } else {
    setIsSettingsOpen(true);
    navigate('/settings')
  }
 };



  return (
    <nav className="navbar">
      <div className="nav-left">
        <Shield className="icon" size={30}   />
        <span className="name-title">SecurePay</span>
      </div>
      <div className="nav-right">
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          onBlur={() => setShowTooltip(false)}
        >
          <Bell className="icon" />
        </button>
        {showTooltip && (
          <div className="notification1">
            You have no new notifications
          </div>
        )}

        <button onClick={handleToggle} >
          <User className="icon" />
        </button>
       {
       isSetttingsOpen && (<div>
       </div>)}
        
       
  
      </div>
    </nav>
  );
};

export default Navbar;
