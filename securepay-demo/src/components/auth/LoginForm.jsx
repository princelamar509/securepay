// src/components/SignInPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Shield } from 'lucide-react';
import './Login.css';

const SignInPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const savedAuthenticated = localStorage.getItem('isAuthenticated');
    if (savedAuthenticated === 'true') {
      setIsAuthenticated(true);
      navigate('/');
    }
  }, [navigate, setIsAuthenticated]);

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Demo credentials check
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password') {
        setIsAuthenticated(true);
        if (rememberMe) {
          localStorage.setItem('isAuthenticated', 'true');
        }
        navigate('/');
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call for registration
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would handle registration logic here
      alert(`Account created for ${name}!`);
      setIsSignUp(false);
    }, 1500);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-container">
      <div className="signin-wrapper">
        <div className="signin-visual-side">
          <div className="brand-logo">
            <Shield size={32} />
            <span>SecureFinance</span>
          </div>
          <div className="visual-content">
            <h1>Welcome to SecureFinance</h1>
            <p>The modern way to manage your money, payments, and contacts all in one place.</p>
            <div className="decorative-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>

        <div className="signin-form-side">
          <div className="form-container">
            {isSignUp ? (
              <div className="form-panel">
                <h2 className="form-title">Create account</h2>
                <p className="form-subtitle">Sign up to get started with SecureFinance</p>
                
                <form onSubmit={handleSignUp}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <div className="input-wrapper">
                      <User size={18} />
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-wrapper">
                      <Mail size={18} />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email "
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-wrapper">
                      <Lock size={18} />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                      />
                      <button 
                        type="button" 
                        className="toggle-password" 
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  {error && <div className="error-message">{error}</div>}
                  
                  <button 
                    type="submit" 
                    className="primary-button" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>
                
                <div className="form-footer">
                  <p>Already have an account?</p>
                  <button 
                    type="button" 
                    className="link-button" 
                    onClick={toggleForm}
                  >
                    Sign in
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="form-panel">
                <h2 className="form-title">Welcome back</h2>
                <p className="form-subtitle">Please enter your details to sign in</p>
                
                <form onSubmit={handleSignIn}>
                  <div className="form-group">
                    <label htmlFor="login-email">Email Address</label>
                    <div className="input-wrapper">
                      <Mail size={18} />
                      <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ENTER (demo@example.com) TO LOGIN"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <div className="input-wrapper">
                      <Lock size={18} />
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=" ENTER (password) TO LOGIN "
                        required
                      />
                      <button 
                        type="button" 
                        className="toggle-password" 
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-options">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="remember-me"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <a href="#forgot-password" className="forgot-password">
                      Forgot password?
                    </a>
                  </div>
                  
                  {error && <div className="error-message">{error}</div>}
                  
                  <button 
                    type="submit" 
                    className="primary-button" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>
                
                <div className="or-divider">
                  <span>or</span>
                </div>
                
                <button type="button" className="oauth-button">
                  <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" width="20" height="20" />
                  Sign in with Google
                </button>
                
                <div className="form-footer">
                  <p>Don't have an account?</p>
                  <button 
                    type="button" 
                    className="link-button" 
                    onClick={toggleForm}
                  >
                    Create account
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;