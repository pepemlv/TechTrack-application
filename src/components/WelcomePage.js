import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/form">Go to Form</Link>
      <Link to="/userdata">View User Data</Link>
    </div>
  );
};

export default WelcomePage;