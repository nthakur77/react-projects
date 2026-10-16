import React, { useState } from 'react';

const HealthHistory = ({ logs, setLogs }) => {
  const [filter, setFilter] = useState('All');

  const filteredLogs = filter === 'All' 
    ? logs 
    : logs.filter((log) => log.status === filter);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">History of Health</h1>
          <p className="page-subtitle">Chronological telemetry logs and stability diagnostics</p>
        </div>

        <div className="filter-group">
          {['All', 'Optimal', 'Moderate', 'Warning', 'Critical'].map((status) => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Moisture (%)</th>
              <th>Temperature (°C)</th>
              <th>Health Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.time}</td>
                <td>{log.moisture}%</td>
                <td>{log.temperature}°C</td>
                <td>
                  <span className={`table-badge ${log.status.toLowerCase()}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthHistory;