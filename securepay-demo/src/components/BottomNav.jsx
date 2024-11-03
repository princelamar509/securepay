// src/components/BottomNav.jsx
import React from 'react';
import { Home, Send, History, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BottomNav = ({ setCurrentView, currentView }) => {
  const navigate = useNavigate();

  const handleNavigation = (view, path) => {
    setCurrentView(view);
    navigate(path);
  };

  return (
    <div className="bottom-nav">
      <button
        onClick={() => handleNavigation('home', '/')}
        className={currentView === 'home' ? 'active' : ''}
      >
        <Home className="icon" />
        Home
      </button>
      
      <button
        onClick={() => handleNavigation('sendmoneypage', '/send')}
        className={currentView === 'sendmoneypage' ? 'active' : ''}
      >
        <Send className="icon" />
        Send
      </button>
      
      <button
        onClick={() => handleNavigation('history', '/history')}
        className={currentView === 'history' ? 'active' : ''}
      >
        <History className="icon" />
        History
      </button>
      
      <button
        onClick={() => handleNavigation('contacts', '/contacts')}
        className={currentView === 'contacts' ? 'active' : ''}
      >
        <Users className="icon" />
        Contacts
      </button>
    </div>
  );
};

export default BottomNav;

