import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>&copy; {currentYear} Nishu. All rights reserved.</p>
        </div>
        
        <div className="footer-right">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer">LeetCode</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;