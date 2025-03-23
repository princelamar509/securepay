import React, { useState } from 'react';
import { 
  Send, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  Gift, 
  Shield, 
  Calendar, 
  ChevronRight, 
  Target, 
  BarChart2,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HomeView.css'; // Ensure this points to the card-based CSS file

const HomeView = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('transactions');
  
  // Quick action buttons
  const quickActions = [
    { icon: <Send size={18} />, label: 'Send', action: () => navigate('/send') },
    { icon: <CreditCard size={18} />, label: 'Add Money', action: () => navigate('/add-money') },
    { icon: <Calendar size={18} />, label: 'Pay Bills', action: () => navigate('/bills') },
    { icon: <Shield size={18} />, label: 'Security', action: () => navigate('/security') }
  ];
  
  // Financial insights data
  const insights = [
    { title: 'Monthly Spending', value: '-$850', change: '-12%', positive: true },
    { title: 'Savings Rate', value: '15%', change: '+3%', positive: true },
    { title: 'Bill Payments', value: '$620', change: '0%', positive: null }
  ];
  
  // Upcoming payments
  const upcomingPayments = [
    { name: 'Netflix Subscription', amount: '$14.99', date: 'Apr 15' },
    { name: 'Rent Payment', amount: '$1200', date: 'Apr 28' }
  ];
  
  // Savings goals
  const savingsGoals = [
    { name: 'Vacation', target: '$3,000', current: '$1,500', percentage: 50 },
    { name: 'New Laptop', target: '$1,200', current: '$800', percentage: 67 }
  ];
  
  return (
   
    <div className="home-dashboard">
      {/* Welcome and balance card */}
      <div className="card welcome-card">
        <div className="welcome-header">
          <div>
            <h2>👋 Welcome back, {user.name}</h2>
            <p className="subtext">Your current balance</p>
          </div>
          <div className="profile-avatar">
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">{user.name.charAt(0)}</div>
            )}
          </div>
        </div>
        
        <div className="balance-display">
          <span className="balance">$2,459.50</span>
          <span className="balance-change">+$120 this week</span>
        </div>
        
        <div className="quick-actions">
          {quickActions.map((action, index) => (
            <button key={index} onClick={action.action}>
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Income Card */}
      <div className="card income-card">
        <div className="card-header">
          <h3 className="card-title">
            <TrendingUp size={18} /> Income
          </h3>
        </div>
        <div className="card-content stat-card-content">
          <div className="stat-icon income-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-details">
            <span className="amount">$1,600</span>
            <span className="trend positive">+12% from last month</span>
          </div>
        </div>
      </div>
      
      {/* Expenses Card */}
      <div className="card expenses-card">
        <div className="card-header">
          <h3 className="card-title">
            <TrendingDown size={18} /> Expenses
          </h3>
        </div>
        <div className="card-content stat-card-content">
          <div className="stat-icon expenses-icon">
            <TrendingDown size={24} />
          </div>
          <div className="stat-details">
            <span className="amount">$950</span>
            <span className="trend negative">+5% from last month</span>
          </div>
        </div>
      </div>
      
      {/* Insights Card */}
      <div className="card insights-card">
        <div className="card-header">
          <h3 className="card-title">
            <BarChart2 size={18} /> Financial Insights
          </h3>
        </div>
        <div className="card-content">
          <div className="insights-grid">
            {insights.map((insight, index) => (
              <div key={index} className="insight-item">
                <h4>{insight.title}</h4>
                <p className="insight-value">{insight.value}</p>
                {insight.change && (
                  <span className={`trend ${insight.positive ? 'positive' : insight.positive === false ? 'negative' : ''}`}>
                    {insight.change}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Transactions Card */}
      <div className="card transactions-card">
        <div className="card-header">
          <h3 className="card-title">Activity</h3>
        </div>
        <div className="card-content">
          <div className="tab-navigation">
            <button 
              className={activeTab === 'transactions' ? 'active' : ''}
              onClick={() => setActiveTab('transactions')}
            >
              Recent Transactions
            </button>
            <button 
              className={activeTab === 'upcoming' ? 'active' : ''}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Payments
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'transactions' && (
              <ul className="transaction-list">
                {user.transactionHistory.map((tx, i) => (
                  <li key={i}>
                    <div className="transaction-details">
                      <div className={`transaction-icon ${tx.type}`}>
                        {tx.type === 'sent' ? <Send size={16} /> : <TrendingUp size={16} />}
                      </div>
                      <div>
                        <span className="recipient">{tx.recipient}</span>
                        <span className="tx-date">{tx.date || 'Today'}</span>
                      </div>
                    </div>
                    <span className={tx.type === 'sent' ? 'sent' : 'received'}>
                      {tx.type === 'sent' ? '-' : '+'}${tx.amount}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            
            {activeTab === 'upcoming' && (
              <ul className="transaction-list">
                {upcomingPayments.map((payment, i) => (
                  <li key={i}>
                    <div className="transaction-details">
                      <div className="transaction-icon sent">
                        <Calendar size={16} />
                      </div>
                      <div>
                        <span className="recipient">{payment.name}</span>
                        <span className="tx-date">{payment.date}</span>
                      </div>
                    </div>
                    <span className="sent">{payment.amount}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <button className="view-all-btn">
            View All <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      {/* Savings Goals Card */}
      <div className="card goals-card">
        <div className="card-header">
          <h3 className="card-title">
            <Target size={18} /> Savings Goals
          </h3>
        </div>
        <div className="card-content">
          {savingsGoals.map((goal, i) => (
            <div key={i} className="goal-item">
              <div className="goal-header">
                <h4>{goal.name}</h4>
                <span>{goal.current} / {goal.target}</span>
              </div>
              <div className="goal-progress-container">
                <div 
                  className="goal-progress-bar"
                  style={{ width: `${goal.percentage}%` }}
                />
              </div>
              <div className="goal-footer">
                <span>{goal.percentage}% complete</span>
                <button className="add-btn">
                  Add Funds
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Linked Banks Card */}
      <div className="card banks-card2">
        <div className="card-header2">
          <h3 className="card-title2">
            <CreditCard size={18} /> Linked Banks
          </h3>
        </div>
        <div className="card-content">
          {user.linkedBanks.map((bank, i) => (
            <div key={i} className="bank-item2">
              <CreditCard size={16} /> 
              <span>{bank}</span>
            </div>
          ))}
          <button className="add-bank-btn2" onClick={() => navigate('/add-bank')}>
            + Add New Bank
          </button>
        </div>
      </div>

      {/* Notifications Card */}
      <div className="card notifications-card1">
        <div className="card-header1">
          <h3 className="card-title1">
            <Bell size={18} /> Notifications
          </h3>
        </div>
        <div className="card-content1">
          <div className="notification-item1">
            <p>💬 Your verification status is <strong>{user.verificationStatus}</strong>.</p>
          </div>
          <div className="notification-item1">
            <p>⚠️ Tip: Link more banks to increase your limit.</p>
          </div>
        </div>
      </div>
      
      {/* Security Status Card */}
      <div className="card security-card1">
        <div className="card-header1">
          <h3 className="card-title1">
            <Shield size={18} /> Security Status
          </h3>
        </div>
        <div className="card-content1">
          <div className="notification-item1">
            <p>🔒 Two-factor authentication is <strong>enabled</strong>.</p>
          </div>
          <div className="notification-item1">
            <p>👤 Last login: <strong>Today, 10:45 AM</strong></p>
          </div>
        </div>
      </div>
      
      {/* Referral / Invite Card */}
      <div className="card promo-card">
        <div className="card-header">
          <h3 className="card-title">
            <Gift size={20} /> Invite & Earn
          </h3>
        </div>
        <div className="card-content promo-content">
          <p>Refer a friend and get $5 when they make their first transaction. They'll get $5 too!</p>
          <button className="referral-btn">
            Invite Now
          </button>
        </div>
      </div>
      
   
        
     
    </div>
  );
};

export default HomeView;