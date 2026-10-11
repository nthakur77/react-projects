import React, { useContext, useState } from 'react';
import UserContext from './UserContext';
import './Login.css';
import { useNavigate } from 'react-router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // This prevents the default browser behavior of refreshing the page on submit
    e.preventDefault(); 
    setUser({username, password});
    // You can handle your API calls or logic here instead
    console.log("Form submission prevented!");
    console.log("Username:", username);
    console.log("Password:", password);
    navigate("/");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;