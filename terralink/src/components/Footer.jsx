import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = ({ isOnline = true, lastSynced = 'Just now' }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="hud-footer">
      {/* Top Status Banner */}
      <div className="hud-footer-banner">
        <div className="hud-banner-inner">
          <div className="hud-banner-status">
            <span className={`banner-led ${isOnline ? 'led-green' : 'led-red'}`}></span>
            <span>
              <strong>ESP32 Telemetry Stream:</strong> {isOnline ? 'CONNECTED (WebSocket / HTTP)' : 'OFFLINE'}
            </span>
          </div>
          <div className="hud-banner-sync">
            Last Packet Synced: <strong>{lastSynced}</strong>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="hud-footer-main">
        <div className="hud-footer-col">
          <div className="hud-footer-logo">
            <span className="hud-footer-title">TerraPulse AI</span>
            <span className="hud-footer-tag">v2.4 HUD</span>
          </div>
          <p className="hud-footer-text">
            Automated sensor data acquisition, regional risk zone classification, and real-time AI diagnostics for smart environmental routing.
          </p>
        </div>

        {/* Route Links */}
        <div className="hud-footer-col">
          <h4 className="hud-col-title">Navigation Menu</h4>
          <ul className="hud-footer-nav">
            <li><NavLink to="/" end className="hud-f-link">Home Dashboard</NavLink></li>
            <li><NavLink to="/health-history" className="hud-f-link">History of Health</NavLink></li>
            <li><NavLink to="/risk-region" className="hud-f-link">Risk Region Map</NavLink></li>
            <li><NavLink to="/ai-solution" className="hud-f-link hud-f-ai">✨ AI Sensor Solution</NavLink></li>
          </ul>
        </div>

        {/* Sensor Threshold Reference */}
        <div className="hud-footer-col">
          <h4 className="hud-col-title">Diagnostic Thresholds</h4>
          <ul className="hud-threshold-list">
            <li>
              <span className="th-dot th-optimal"></span>
              <span><strong>Optimal:</strong> Moisture &gt; 50%</span>
            </li>
            <li>
              <span className="th-dot th-warning"></span>
              <span><strong>Moderate:</strong> Moisture 35% – 50%</span>
            </li>
            <li>
              <span className="th-dot th-critical"></span>
              <span><strong>Critical Risk:</strong> Moisture &lt; 35%</span>
            </li>
          </ul>
        </div>

        {/* Hardware & Control Column */}
        <div className="hud-footer-col">
          <h4 className="hud-col-title">Hardware Node Specs</h4>
          <div className="hud-spec-box">
            <div><span>Controller:</span> <strong>ESP32 Wi-Fi Node</strong></div>
            <div><span>Sensors:</span> <strong>Capacitive Moisture &amp; DHT</strong></div>
            <div><span>Actuator:</span> <strong>5V Relay Routing Module</strong></div>
          </div>
          <button className="back-top-btn" onClick={scrollToTop}>
            ↑ Back to Top
          </button>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="hud-footer-bottom">
        <div className="hud-bottom-inner">
          <span>&copy; {new Date().getFullYear()} TerraPulse Sensor Network. All rights reserved.</span>
          <span>Powered by React Router DOM &amp; Real-Time Edge AI</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;