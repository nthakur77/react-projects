import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ sensorData, setSensorData }) => {
  const toggleRelay = () => {
    setSensorData((prev) => ({
      ...prev,
      relayActive: !prev.relayActive,
    }));
  };

  const getHealthBadge = (moisture) => {
    if (moisture < 35) return { text: 'Critical Stress', cls: 'badge-danger' };
    if (moisture < 50) return { text: 'Moderate Watch', cls: 'badge-warning' };
    return { text: 'Healthy / Optimal', cls: 'badge-success' };
  };

  const badge = getHealthBadge(sensorData.moisture);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Live Sensor Telemetry</h1>
          <p className="page-subtitle">Real-time environmental & surface acquisition from {sensorData.nodeId}</p>
        </div>
        <span className={`status-pill ${badge.cls}`}>{badge.text}</span>
      </div>

      {/* Sensor Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Moisture Level</span>
          <div className="metric-value">{sensorData.moisture}%</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${sensorData.moisture}%`,
                backgroundColor: sensorData.moisture < 35 ? '#ef4444' : '#38bdf8'
              }}
            ></div>
          </div>
          <span className="metric-foot">Target Threshold: 45% - 75%</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">Ambient Temperature</span>
          <div className="metric-value">{sensorData.temperature}°C</div>
          <span className="metric-foot">
            {sensorData.temperature > 32 ? '⚠️ Elevated thermal load' : '✅ Within normal operating range'}
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-label">Relative Humidity</span>
          <div className="metric-value">{sensorData.humidity}%</div>
          <span className="metric-foot">Atmospheric saturation index</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">Actuator / Relay Routing</span>
          <div className="metric-value">{sensorData.relayActive ? 'ACTIVE' : 'STANDBY'}</div>
          <button className="action-btn" onClick={toggleRelay}>
            {sensorData.relayActive ? 'Turn Relay OFF' : 'Trigger Relay ON'}
          </button>
        </div>
      </div>

      {/* Callout Banner to AI Solution */}
      <div className="ai-Banner">
        <div>
          <h3>Need automated diagnostics for these readings?</h3>
          <p>Our AI engine analyzes moisture, thermal trends, and regional risk to recommend immediate hardware routing actions.</p>
        </div>
        <Link to="/ai-solution" className="ai-cta-link">
          ✨ View AI Sensor Solution
        </Link>
      </div>
    </div>
  );
};

export default Home;