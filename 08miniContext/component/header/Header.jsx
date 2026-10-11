import React from 'react';
import './Header.css';
import { NavLink } from 'react-router';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-section">
          {/* You can replace this URL with your actual logo path (e.g., src={myLogo}) */}
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1197/1197460.png" 
            alt="Application Logo" 
            className="app-logo" 
          />
          <h1 className="app-title">MyApp</h1>
        </div>
        
        {/* Optional: You can add navigation links or a user menu here later */}
        <nav className="header-nav">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/Login">Login</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;