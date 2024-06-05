import React, { useState} from 'react';
import { signIn } from '../firebase/Auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Login.css';


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
        <h1>Login</h1>
        <img src="/images/im.jpg"alt="image" />
        <p>Welcome back!</p>
        <p>Enter your email and password to login</p>

      </div>
      <div className='rightside'>
      <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      <p>Don't have an account? <Link to="../SignUp">Sign Up</Link></p>

    </form>

      </div>
    </div>
    
  );
};

export default Login;