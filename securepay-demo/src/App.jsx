import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import BottomNav from './components/shared/BottomNav';
import HomeView from './components/dashboard/HomeView';
import SettingsView from './components/SettingsView';
import SendMoneyPage from './components/transfers/SendMoneyPage';
import AddMoneyPage from './components/transfers/AddMoneyPage';
import HistoryPage from './components/HistoryPage';
import ContactsPage from './components/ContactsPage';
import LoginForm from './components/auth/LoginForm';

import Message from './components/shared/Message';




const mockUsers = {
  user123: {
    id: 'user123',
    name: 'James Mathis',
    email: 'john@example.com',
    phoneNumber: '+1234567890',
    accountCreated: '2023-01-15',
    verificationStatus: 'verified',
    transactionHistory: [
      { recipient: 'Jane Smith', amount: 250, timestamp: '2024-03-15', type: 'sent' },
      { recipient: 'Dunkin Donuts', amount: 14.57, timestamp: '2024-03-14', type: 'sent' },
      { recipient: 'Bob Wilson', amount: 100, timestamp: '2024-03-13', type: 'received' },
      { recipient: 'Jams Maus', amount: 250, timestamp: '2024-03-12', type: 'received' },
      { recipient: 'Marie Louise', amount: 300, timestamp: '2024-03-11', type: 'sent' },
      { recipient: 'Joe Steifel', amount: 400, timestamp: '2024-03-10', type: 'received' },
    ],
    linkedBanks: ['Chase', 'Bank of America','Debit Card Ending in 1122'],
    frequentContacts: ['user456', 'user789'],
  },
};

const currentUser = mockUsers.user123;


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const currentUser = mockUsers.user123;
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const login = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Check localStorage AFTER "loading"
      const savedAuth = localStorage.getItem('isAuthenticated') === "true";
      setIsAuthenticated(savedAuth);
      setLoading(false); 
    };
  
    login();
  }, []);
  

  const PrivateRoute = ({  children }) => {
    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

  return (
   
    <Router>
     {loading ? (
        <Message /> 
      ) : (
      <div className="app-container">
     
        {isAuthenticated && <Navbar setCurrentView={setCurrentView} />}
        
        <main>
          <Routes>
            {/* Login route */}
            <Route
              path="/signin"
              element={<LoginForm setIsAuthenticated={setIsAuthenticated} />}
             
            />  

            {/* Protected Routes */}
            <Route
              path="/homeview"
              element={
                <PrivateRoute>
                  <HomeView user={currentUser} />
                </PrivateRoute>
              }
            />
           <Route
            path="/settings"
            element={
           <PrivateRoute>
           <SettingsView user={currentUser} setIsAuthenticated={setIsAuthenticated} />
           </PrivateRoute>
           }
        />

            <Route
              path="/send"
              element={
                <PrivateRoute>
                  <SendMoneyPage user={currentUser} />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-money"
              element={
                <PrivateRoute>
                  <AddMoneyPage user={currentUser} />
                </PrivateRoute>
              }
            />
         
            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <HistoryPage user={currentUser} />
                </PrivateRoute>
              }
            />
         
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactsPage user={currentUser} />
                </PrivateRoute>
              }
            />
          
            <Route path="*" element={<Navigate to={isAuthenticated ? "/homeview" : "/signin"} />} />
          </Routes>
        </main>

        {/* Conditionally render BottomNav only if authenticated */}
        {isAuthenticated && <BottomNav setCurrentView={setCurrentView} currentView={currentView} />}
      </div>
      )}
    </Router>
   
  );
}

export default App;
