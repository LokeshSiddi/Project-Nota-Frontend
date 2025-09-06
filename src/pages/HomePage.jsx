import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="page-content">
      <h2>Welcome to Your Secure Notes</h2>
      <p>This is a simple and secure application to manage your personal notes.</p>
      <Link to="/dashboard" className="cta-button">Go to Your Dashboard</Link>
    </div>
  );
};

export default HomePage;