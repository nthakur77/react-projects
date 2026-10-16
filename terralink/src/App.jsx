import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import HealthHistory from './pages/HealthHistory';
import RiskRegion from './pages/RiskRegion';
import AISolution from './pages/AISolution';
import './App.css';
import Engineers from './pages/engineers/Engineers';

function App() {
  // Current live telemetry from the sensor node
  const [sensorData, setSensorData] = useState({
    nodeId: 'ESP32-NODE-01',
    moisture: 34,        // %
    temperature: 31.4,   // °C
    humidity: 58,        // %
    relayActive: false,
    lastUpdated: new Date().toLocaleTimeString(),
  });

  // Historical sensor logs for the History of Health page
  const [historyLogs, setHistoryLogs] = useState([
    { id: 1, time: '10:00 AM', moisture: 62, temperature: 27.5, status: 'Optimal' },
    { id: 2, time: '11:30 AM', moisture: 48, temperature: 29.1, status: 'Optimal' },
    { id: 3, time: '01:00 PM', moisture: 39, temperature: 30.8, status: 'Moderate' },
    { id: 4, time: '02:30 PM', moisture: 34, temperature: 31.4, status: 'Warning' },
  ]);

  // Regional data for the Risk Region page
  const [regions, setRegions] = useState([
    { id: 'SEC-A', name: 'Sector A (North Zone)', moisture: 34, temp: 31.4, risk: 'High' },
    { id: 'SEC-B', name: 'Sector B (Central Hub)', moisture: 56, temp: 28.2, risk: 'Low' },
    { id: 'SEC-C', name: 'Sector C (East Slope)', moisture: 41, temp: 29.9, risk: 'Moderate' },
    { id: 'SEC-D', name: 'Sector D (South Basin)', moisture: 71, temp: 26.5, risk: 'Low' },
  ]);

  // Function to simulate incoming hardware packet (great for testing & demos)
  const simulateIncomingPacket = () => {
    const newMoisture = Math.floor(Math.random() * (80 - 18 + 1)) + 18;
    const newTemp = +(24 + Math.random() * 12).toFixed(1);
    const newHumidity = Math.floor(Math.random() * (85 - 40 + 1)) + 40;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const status = newMoisture < 35 || newTemp > 33 ? 'Critical' : newMoisture < 50 ? 'Moderate' : 'Optimal';

    setSensorData((prev) => ({
      ...prev,
      moisture: newMoisture,
      temperature: newTemp,
      humidity: newHumidity,
      relayActive: newMoisture < 35,
      lastUpdated: timeNow,
    }));

    setHistoryLogs((prev) => [
      { id: Date.now(), time: timeNow, moisture: newMoisture, temperature: newTemp, status },
      ...prev,
    ]);

    setRegions((prev) =>
      prev.map((reg, idx) =>
        idx === 0
          ? {
              ...reg,
              moisture: newMoisture,
              temp: newTemp,
              risk: newMoisture < 35 ? 'High' : newMoisture < 50 ? 'Moderate' : 'Low',
            }
          : reg
      )
    );
  };

  return (
    <Router>
      <div className="app-layout">
        <Header />

        {/* Simulation Control Bar for Testing */}
        <div className="sim-bar">
          <div className="sim-bar-inner">
            <span>
              <strong>Live Feed:</strong> {sensorData.nodeId} | Last Packet: {sensorData.lastUpdated}
            </span>
            <button className="sim-btn" onClick={simulateIncomingPacket}>
              ⚡ Simulate New Sensor Packet
            </button>
          </div>
        </div>

        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<Home sensorData={sensorData} setSensorData={setSensorData} />} 
            />
            <Route 
              path="/health-history" 
              element={<HealthHistory logs={historyLogs} setLogs={setHistoryLogs} />} 
            />
            <Route 
              path="/risk-region" 
              element={<RiskRegion regions={regions} />} 
            />
            <Route 
              path="/ai-solution" 
              element={<AISolution sensorData={sensorData} />} 
            />
            <Route path="/engineers" element={<Engineers />} />
          </Routes>
        </main>

        <Footer isOnline={true} lastSynced={sensorData.lastUpdated} />
      </div>
    </Router>
  );
}

export default App;