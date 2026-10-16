import React from 'react';
import { Link } from 'react-router-dom';

const RiskRegion = ({ regions }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Risk Region Assessment</h1>
          <p className="page-subtitle">Spatial zone monitoring and anomaly detection across deployed nodes</p>
        </div>
      </div>

      <div className="region-grid">
        {regions.map((zone) => (
          <div key={zone.id} className={`region-card risk-${zone.risk.toLowerCase()}`}>
            <div className="region-card-top">
              <span className="zone-id">{zone.id}</span>
              <span className={`risk-tag ${zone.risk.toLowerCase()}`}>
                {zone.risk} Risk
              </span>
            </div>

            <h3 className="zone-name">{zone.name}</h3>

            <div className="zone-stats">
              <div>
                <small>Moisture</small>
                <strong>{zone.moisture}%</strong>
              </div>
              <div>
                <small>Temperature</small>
                <strong>{zone.temp}°C</strong>
              </div>
            </div>

            {zone.risk === 'High' && (
              <div className="zone-alert">
                ⚠️ Deficit detected. Immediate routing recommended.
                <Link to="/ai-solution" className="zone-ai-link">Run AI Fix →</Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskRegion;