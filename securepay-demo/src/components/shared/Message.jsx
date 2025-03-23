import React, { useState, useEffect } from 'react';
import LoaderSVG from "@/assets/loader.svg";
import './Message.css';

const message = () => {
  const [isLoading, setIsLoading] = useState(true);



  const Message = ({ isLoading = true}) => {
    return (
      <div className={`preloader ${isLoading ? 'visible' : 'hidden'}`}>
        <img src={LoaderSVG} alt="Loading..." className="loader" />
      </div>
    );
  };

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
      {!isLoading && <h1> </h1>}
    </div>
  );
};

export default message;
