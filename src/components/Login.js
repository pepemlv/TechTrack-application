// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { login } from '../hooks/UseAuth';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='mainContainer'>
       <h1 className='title'>TechTrack</h1>
      <div className='leftside'>
<p><h1>Welcome to TechTrack!</h1></p> <p>TechTrack is your go-to app for effortlessly tracking
   services and managing billing. </p>
   <p>Start managing your services efficiently. Happy tracking!</p>
     
      {error && <p>{error}</p>}
      </div>

      <div className='rightside'>
        
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p><h4>Don't have an account? <Link to="../Signup">Sign Up</Link></h4></p>
      </div>
     
    </div>
  );
};

export default Login;

/*import React, { useState} from 'react';
import { signIn } from '../firebase/Auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    await signIn(email, password);
    navigate('/welcome');
  };

  return (
    <div className='mainContainer'>
      <div className='leftside'>
        <h1 className='title'>TechTrack</h1>
        
        <p>Welcome back!</p>
        <p><h5>Enter your email and password to login</h5></p>

      </div>
      <div className='rightside'>
    
      <form onSubmit={handleSubmit}>
        <input type="email" value={email}
               onChange={(e) => setEmail(e.target.value)} 
               placeholder="Email" required />
        <input type="password" value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" required />

        <button type="submit">Login</button>
       
      </form>
      <p><h4>Don't have an account? <Link to="../SignUp">Sign Up</Link></h4></p>

      </div>
    </div>
    
  );
};

export default Login;*/