import React from 'react';
import './Header.css';
import {NavLink } from 'react-router-dom'; 
import nishuLogo from './Nishu.jpeg';
import resume from './Nishchal_Thakur_Resume (1).pdf'

function Header() {
  return (
    <div className='header'>
      <div className='logo'>
        <img src={nishuLogo} alt='Nishu Logo' />
        <span>logo</span>
      </div>
      
      <nav className='pages'>
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/About">About</NavLink>
        <NavLink to="/Leetcode">Leetcode</NavLink>
        <NavLink to="/Client">Clients</NavLink>
      </nav>

      <div className='about'>
        <a href={resume}
        download="Nishchal_Resume.pdf"
        >Resume</a>
      </div>
    </div>
  );
}

export default Header;