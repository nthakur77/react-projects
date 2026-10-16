import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = ({ sensorData = { moisture: 34, temperature: 31.4 } }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const isCritical = sensorData.moisture < 35;

  return (
    <header className="hud-header">
      <div className="hud-header-inner">
        
        {/* Left: Brand Identity & Live Telemetry Pill */}
        <div className="hud-brand-group">
          <NavLink 
            to="/engineers" 
            className={({ isActive }) => `hud-logo ${isActive ? 'logo-active' : ''}`} 
            onClick={closeMenu}
            title="Click to view Project Engineers"
            >
            <div className="hud-logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            </div>
            <div className="hud-logo-text">
                <span className="hud-title">TerraPulse</span>
                <span className="hud-subtitle">View Engineers →</span>
            </div>
            </NavLink>

          {/* Mini Live Sensor Readout inside Header */}
          <div className={`hud-sensor-pill ${isCritical ? 'pill-alert' : 'pill-normal'}`}>
            <span className="pill-dot"></span>
            <span>{sensorData.moisture}% Moisture</span>
            <span className="pill-sep">•</span>
            <span>{sensorData.temperature}°C</span>
          </div>
        </div>

        {/* Mobile "Menu" Section Button */}
        <button 
          className={`hud-menu-trigger ${menuOpen ? 'is-open' : ''}`} 
          onClick={toggleMenu}
          aria-expanded={menuOpen}
        >
          <span className="hud-menu-text">Menu</span>
          <span className="hud-menu-bars">
            <i></i>
            <i></i>
            <i></i>
          </span>
        </button>

        {/* Right: Navigation Links */}
        <nav className={`hud-nav ${menuOpen ? 'hud-nav-open' : ''}`}>
          <div className="hud-nav-section-title">Navigation Menu</div>
          
          <ul className="hud-nav-list">
            <li>
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => `hud-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                <span>Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/health-history" 
                className={({ isActive }) => `hud-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <span>History of Health</span>
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/risk-region" 
                className={({ isActive }) => `hud-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                </svg>
                <span>Risk Region</span>
              </NavLink>
            </li>

            {/* AI Solution Based on Sensor Data */}
            <li className="hud-ai-wrapper">
              <NavLink 
                to="/ai-solution" 
                className={({ isActive }) => `hud-ai-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="ai-pulse-ring"></span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span>AI Sensor Solution</span>
                {isCritical && <span className="ai-alert-badge">!</span>}
              </NavLink>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;