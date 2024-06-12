// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../hooks/UseAuth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='mainContainer'>
      <div className='leftside'>
      <h1 className='title'>TechTrack</h1>
      {error && <p>{error}</p>}

   <p>Please Signup and Start managing your services efficiently. Happy tracking!</p>
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
        <button type="submit">Signup</button>
      </form>
      <p><h4>Already have an account? <Link to="../Login">Log in</Link></h4></p>
      </div>
    </div>
  );
};

export default Signup;


/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';
import '../styles/Login.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/welcome');
    } catch (error) {
      console.error('Error signing up with email and password', error);
    }
  };

  return (
    <div className='mainContainer'>
      <div className='leftside'>
        <h1 className='title'>TechTrack</h1>
        <h5>Welcome to this page</h5>
      </div>
      <div className='rightside'>
        <p>SIGNUP</p>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <div>
          <h4>Already have an account? <a href="/">Sign In</a></h4>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';
import '../styles/Login.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/welcome');
    } catch (error) {
      console.error('Error signing up with email and password', error);
    }
  };

  return (
    <div className='mainContainer'>

     <div className='rightside'>
     <p>SIGNUP</p>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
        
      
      </form>
      <p><h4>Already have an account? <a href="/">Sign In</a></h4></p>
      </div>

<div className='leftside'>
<h1 className='title'>TechTrack</h1>
            
            <p><h5>Welcom to this page</h5></p>

      
      </div>
    </div>
  );
};

export default SignUp;
*/


