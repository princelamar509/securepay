import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Mail, Lock, User, Phone,Moon, Sun,Shield } from 'lucide-react';
import './LoginForm.css';


const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [greeting, setGreeting] = useState("");


  useEffect(() => {
    const currentHour = new Date().getHours();
    const greetingMessage = 
      currentHour < 12 ? "Good Morning!" :
      currentHour < 18 ? "Good Afternoon!" :
      "Good Evening!";
    setGreeting(greetingMessage);
  }, []); 

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(''); 
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (username === 'JAMES' && password === 'JAMES') {
      setIsAuthenticated(true);
      navigate('/homeview');
    } else {
      setError('Invalid Credentials');
    }
  };

  return (
    <div className="auth-page">

<section>
     
      <div className="wave">
        <span></span>
        <span></span>
        <span></span>
      </div>
      
       <div className='auth-form-container'>                                      
        <div className={`auth-card ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="toggle-mode">
          {isDarkMode ? (
            <Sun
              className="toggle-icon"
              size={20}
              onClick={() => setIsDarkMode(!isDarkMode)}
            />
          ) : (
            <Moon
              className="toggle-icon"
              size={20}
              onClick={() => setIsDarkMode(!isDarkMode)}
            />
          )}
        </div>
          {isSignUp ? (
            <div className="form-panel1">
              <div className="form-content">
                <h2 className="form-title1">Welcome to SecurePay<br/> <Shield className="icon" size={40}/> </h2>
                <form className="form-fields">
                  <div className="form-group">
                    <User className="icon" size={20} />
                    <input
                      type="text"
                      placeholder="Username"
                      className="input-field"
                      value={inputValue} 
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Mail className="icon" size={20} />
                    <input
                      type="email"
                      placeholder="Email"
                      className="input-field"
                      value={inputValue} 
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Phone className="icon" size={20} />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="input-field"
                      value={inputValue} 
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Lock className="icon" size={20} />
                    <input
                      type="password"
                      placeholder="Password"
                      className="input-field"
                      value={inputValue} 
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button className="submit-button">Sign Up</button>
                </form>
                <button onClick={toggleForm} className="toggle-button">
                  Already have an account? <ChevronLeft className="ml-1" size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="form-panel">
              {/* Sign In Form */}
              <div className="form-content">
                <div className="icon-container">
              <Shield className="icon" size={40}/>
            </div>
                <h2 className="form-title">{greeting}</h2>
                <form className="form-fields" onSubmit={handleSignIn}>
                  <div className="form-group">
                    <Mail className="icon" size={20} />
                    <input
                      type="text"
                      placeholder="Type JAMES"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Lock className="icon" size={20} />
                    <input
                      type="password"
                      placeholder="Type JAMES"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <button type="submit" className="submit-button">Sign In</button>
                  {error && <p className="error-message">{error}</p>}
                </form>
                <button onClick={toggleForm} className="toggle-button">
                  Create an account <ChevronRight className="ml-1" size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </section>  
    </div>
  );
};

export default LoginForm;
