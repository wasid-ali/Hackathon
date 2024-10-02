// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session (adjust as necessary)
    localStorage.removeItem('token');
    
    // Redirect to login page after a brief delay
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000); // Redirects after 2 seconds (for example)

    // Cleanup timeout on unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
};

export default Logout;
