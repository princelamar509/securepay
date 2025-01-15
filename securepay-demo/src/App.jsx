import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import HomeView from './components/HomeView';
import SettingsView from './components/SettingsView';
import SendMoneyPage from './components/SendMoneyPage';
import AddMoneyPage from './components/AddMoneyPage';
import HistoryPage from './components/HistoryPage';
import ContactsPage from './components/ContactsPage';
import LoginForm from './components/LoginForm';
import CardPage from './components/CardPage'
import Message from './components/Message';

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
      { recipient: 'Jams Madeus', amount: 250, timestamp: '2024-03-12', type: 'received' },
      { recipient: 'Marie Louise', amount: 300, timestamp: '2024-03-11', type: 'sent' },
      { recipient: 'Joe Steifel', amount: 400, timestamp: '2024-03-10', type: 'received' },
    ],
    linkedBanks: ['Chase', 'Bank of America','Debit Card Ending in 1122'],
    frequentContacts: ['user456', 'user789'],
  },
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const currentUser = mockUsers.user123;
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const login = async () => {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      setLoading(false); 
    };

    login();
  }, []);


  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

  return (
    <Router>
     {loading ? (
        <Message /> 
      ) : (
      <div className="app-container">
      <Message />
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
                  <SettingsView user={currentUser} />
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
              path="/CardPage"
              element={
                <PrivateRoute>
                  <CardPage user={currentUser} />
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
