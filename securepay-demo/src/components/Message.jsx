import React, { useState, useEffect } from 'react';
import LoaderSVG from '../assets/loader.svg';
import './Message.css';

const Message = ({ isLoading }) => {
  return (
    <div className={`preloader ${isLoading ? 'visible' : 'hidden'}`}>
      <img src={LoaderSVG} alt="Loading..." className="loader" />
    </div>
  );
};
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a login process
  useEffect(() => {
    const login = async () => {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 3000)); 
      setIsLoading(false); // Set loading to false after the "login" completes
    };

    login();
  }, []);

  return (
    <div>
      <Message isLoading={isLoading} />
      {!isLoading && <h1></h1>}
    </div>
  );
};

export default App;
