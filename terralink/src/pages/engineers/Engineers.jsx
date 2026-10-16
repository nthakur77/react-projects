import React from 'react';
import { Link } from 'react-router-dom';
import './Engineers.css';

const engineersList = [
  {
    id: 'ENG-01',
    name: 'Nishchal Thakur',
    role: 'Full-Stack Web Architect & System Integration Lead',
    department: 'B.Tech ECE • UIT-RGPV',
    avatar: 'https://tse1.mm.bing.net/th/id/OIP.RzSskTk_oRU5ING5tojXcQHaHa?r=0&pid=Api&h=220&P=0',
    bio: 'Designed the React Router telemetry dashboard, AI diagnostic interface, and real-time state synchronization pipeline.',
    skills: ['React.js', 'React Router', 'ESP32 Web Integration', 'C++ / DSA'],
    github: '#',
    linkedin: '#',
  },
  {
    id: 'ENG-02',
    name: 'Nihal Gupta',
    role: 'Embedded Systems & Firmware Engineer',
    department: 'B.Tech ECE • UIT-RGPV',
    avatar: 'https://chatgpt.com/backend-api/estuary/public_content/enc/eyJpZCI6Im1fNmFjZmM0ZWVhYWY4ODE5MWE0ZGQ5ZWMxNWVmYWIwMmI6ZmlsZV8wMDAwMDAwMDhhZDA4MWZhOWE1MGMyNjc1YmQ2OTBjNyIsImdpem1vX2lkIjpudWxsLCJ3aWQiOm51bGwsIm9pZCI6bnVsbCwic2lkIjpudWxsLCJjcyI6bnVsbCwiZm4iOm51bGwsImNkIjpudWxsLCJ0cyI6IjIwNzQwIiwicCI6InB5aSIsImNpZCI6IjEiLCJzaWciOiIyZDBjZGY2YTI5MWVkMGVmODM2NDllZjlkNWYxNTI5ZWU2YTU0ZGEwYTk3MDkxODdjYWE5ODc2ZmIyYzgyMTJiIiwidiI6IjAiLCJjZG4iOm51bGwsImNwIjpudWxsLCJtYSI6bnVsbH0=',
    bio: 'Developed microcontroller firmware, ADC calibration routines, and non-blocking Wi-Fi packet transmission.',
    skills: ['ESP32 Firmware', 'Embedded C', 'ADC Calibration', 'Serial Telemetry'],
    github: '#',
    linkedin: '#',
  },
  {
    id: 'ENG-03',
    name: 'Parth Pandey',
    role: 'Hardware Interfacing & Relay Routing Engineer',
    department: 'B.Tech ECE • UIT-RGPV',
    avatar: 'https://up.yimg.com/ib/th/id/OIP.N9PTOxatCaFsfSFc5Lrw3AHaHa?pid=Api&rs=1&c=1&qlt=95&w=120&h=120',
    bio: 'Engineered the capacitive soil moisture sensor array, optocoupler isolation, and 5V relay actuation circuitry.',
    skills: ['Sensor Interfacing', 'Relay Switching', 'Power Distribution', 'Circuit Design'],
    github: '#',
    linkedin: '#',
  },
  {
    id: 'ENG-04',
    name: 'Piyush Gupta',
    role: 'IoT Telemetry & Risk Analytics Engineer',
    department: 'B.Tech ECE • UIT-RGPV',
    avatar: 'https://up.yimg.com/ib/th/id/OIP.z9-DZ6mDRN1erXsxmB_CBQAAAA?pid=Api&rs=1&c=1&qlt=95&w=82&h=120',
    bio: 'Structured regional risk thresholds, sensor anomaly filtering, and historical health logging schemas.',
    skills: ['IoT Protocols', 'Threshold Modeling', 'Data Filtering', 'JSON Schemas'],
    github: '#',
    linkedin: '#',
  },
  {
    id: 'ENG-05',
    name: 'Satyam Tiwari',
    role: 'System Testing, Validation & Documentation Lead',
    department: 'B.Tech ECE • UIT-RGPV',
    avatar: 'https://up.yimg.com/ib/th/id/OIP.vuCzUS9JxTCSps8WU1HzAgHaHa?pid=Api&rs=1&c=1&qlt=95&w=120&h=120',
    bio: 'Led field stress-testing across moisture extremes, hardware enclosure verification, and technical specifications.',
    skills: ['Hardware QA', 'Stress Testing', 'System Diagnostics', 'Technical Docs'],
    github: '#',
    linkedin: '#',
  },
];

const Engineers = () => {
  return (
    <div className="engineers-page">
      {/* Top Banner */}
      <div className="eng-hero">
        <div className="eng-hero-badge">PROJECT ENGINEERING TEAM</div>
        <h1 className="eng-hero-title">Meet the System Architects</h1>
        <p className="eng-hero-subtitle">
          The Electronics &amp; Communication Engineering team behind the automated sensor acquisition, regional risk mapping, and AI-driven routing platform.
        </p>
        <Link to="/" className="back-dashboard-btn">
          ← Return to Live Telemetry Dashboard
        </Link>
      </div>

      {/* Engineers Card Grid */}
      <div className="eng-grid">
        {engineersList.map((eng) => (
          <div key={eng.id} className="eng-card">
            <div className="eng-card-top">
              <span className="eng-id-tag">{eng.id}</span>
              <span className="eng-dept-tag">{eng.department}</span>
            </div>

            <div className="eng-profile">
              <div className="eng-avatar-wrapper">
                <img src={eng.avatar} alt={eng.name} className="eng-avatar" />
                <span className="eng-status-dot" title="Active Contributor"></span>
              </div>
              <h3 className="eng-name">{eng.name}</h3>
              <p className="eng-role">{eng.role}</p>
            </div>

            <p className="eng-bio">{eng.bio}</p>

            {/* Subsystem Skills */}
            <div className="eng-skills">
              {eng.skills.map((skill, idx) => (
                <span key={idx} className="eng-skill-chip">
                  {skill}
                </span>
              ))}
            </div>

            {/* Footer Links */}
            <div className="eng-card-footer">
              <a href={eng.github} className="eng-social-btn" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={eng.linkedin} className="eng-social-btn primary" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Engineers;