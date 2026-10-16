import { useEffect, useRef, useState } from 'react';
import './AISolution.css';

// Keep the Google Gemini API key on the backend. Never put it in a Vite variable
// such as VITE_GEMINI_API_KEY because Vite exposes VITE_* values to the browser.
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');
const SENSOR_GET_ENDPOINT = `${API_BASE_URL}/api/sensors/latest`;
const AI_POST_ENDPOINT = `${API_BASE_URL}/api/ai/diagnose`;

const createDefaultTelemetry = () => ({
  nodeId: 'ESP32-NODE-01',
  moisture: 34,
  temperature: 31.4,
  humidity: 58,
  relayActive: false,
  lastUpdated: new Date().toLocaleTimeString(),
});

const timestamp = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const numberOrFallback = (value, fallback) => {
  if (value === null || value === undefined || value === '') return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeRelay = (value, fallback) => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'string') {
    return ['true', 'on', 'active', '1'].includes(value.trim().toLowerCase());
  }
  return Boolean(value);
};

const normalizeTelemetry = (payload, previous) => {
  // Supports either a direct sensor object or { data: {...} } / { sensor: {...} }.
  const data = payload?.sensor ?? payload?.data ?? payload;
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Sensor API returned an unexpected JSON response.');
  }

  return {
    nodeId: data.nodeId ?? previous.nodeId,
    moisture: numberOrFallback(data.moisture, previous.moisture),
    temperature: numberOrFallback(data.temperature, previous.temperature),
    humidity: numberOrFallback(data.humidity, previous.humidity),
    relayActive: normalizeRelay(data.relayActive, previous.relayActive),
    lastUpdated: new Date().toLocaleTimeString(),
  };
};

const readJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const AISolution = ({ sensorData: propSensorData }) => {
  const [liveTelemetry, setLiveTelemetry] = useState(
    () => propSensorData || createDefaultTelemetry(),
  );
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am connected to your telemetry interface. Refresh sensor data or ask a question below.',
      timestamp: timestamp(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncingSensor, setIsSyncingSensor] = useState(false);
  const [sensorError, setSensorError] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (propSensorData) {
      setLiveTelemetry((previous) => ({
        ...previous,
        ...propSensorData,
        lastUpdated: propSensorData.lastUpdated || new Date().toLocaleTimeString(),
      }));
    }
  }, [propSensorData]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const fetchSensorDataWithGet = async () => {
    setIsSyncingSensor(true);
    try {
      const response = await fetch(SENSOR_GET_ENDPOINT, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      const payload = await readJson(response);

      if (!response.ok) {
        throw new Error(payload?.error || `Sensor GET failed with HTTP ${response.status}.`);
      }

      // Keep the fresh response in a local variable: React state updates are asynchronous,
      // so callers that immediately build a prompt must use this returned value.
      const nextTelemetry = normalizeTelemetry(payload, liveTelemetry);
      setLiveTelemetry(nextTelemetry);
      setSensorError('');
      return nextTelemetry;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown sensor GET error.';
      setSensorError(`${message} Check that your backend is running and that GET ${SENSOR_GET_ENDPOINT} exists.`);
      return null;
    } finally {
      setIsSyncingSensor(false);
    }
  };

  useEffect(() => {
    void fetchSensorDataWithGet();
    // Run once when this component mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateLocalFallbackResponse = (data) => {
    const isCritical = Number(data.moisture) < 35;
    return (
      `**Local Sensor Diagnostic Backup**\n` +
      `• **Status:** ${isCritical ? 'CRITICAL MOISTURE DEFICIT' : 'SYSTEM STABLE'}\n` +
      `• **Telemetry:** Moisture ${data.moisture}% | Temp ${data.temperature}°C | Humidity ${data.humidity}%\n` +
      `• **Suggested action:** ${
        isCritical
          ? 'Check the soil sensor and irrigation system; consider a short irrigation pulse, then re-check moisture.'
          : 'Keep the relay in standby and check soil moisture at the next scheduled interval.'
      }\n\n` +
      'This is a local fallback, not a live Gemini response. Verify readings before operating a pump.'
    );
  };

  const sendPostToGemini = async (promptText, displayLabel, telemetrySnapshot = liveTelemetry) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: displayLabel || promptText,
      timestamp: timestamp(),
    };

    setMessages((previous) => [...previous, userMessage]);
    setIsLoading(true);

    try {
      // The browser calls your own backend. The backend keeps GEMINI_API_KEY private.
      const response = await fetch(AI_POST_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText }),
      });
      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(result?.error || `AI POST failed with HTTP ${response.status}.`);
      }

      const reply = result?.reply ?? result?.text;
      if (typeof reply !== 'string' || !reply.trim()) {
        throw new Error('AI backend returned no reply. Expected JSON like { "reply": "..." }.');
      }

      setMessages((previous) => [
        ...previous,
        { id: Date.now() + 1, sender: 'ai', text: reply, timestamp: timestamp() },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown AI POST error.';
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: `⚠️ AI API request failed: ${message}\n\n${generateLocalFallbackResponse(telemetrySnapshot)}`,
          timestamp: timestamp(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpecialSensorPrompt = async () => {
    // Important: use the object returned by GET, not state immediately after setState.
    const latestTelemetry = (await fetchSensorDataWithGet()) || liveTelemetry;
    const prompt = `
You are an IoT embedded systems and precision agriculture assistant.
Analyze these reported sensor readings:
- Node ID: ${latestTelemetry.nodeId}
- Soil moisture: ${latestTelemetry.moisture}% (target range 45% to 75%; critical below 35%)
- Ambient temperature: ${latestTelemetry.temperature}°C
- Relative humidity: ${latestTelemetry.humidity}%
- Water-pump relay: ${latestTelemetry.relayActive ? 'ACTIVE (ON)' : 'STANDBY (OFF)'}

Return:
1. System risk level (Optimal, Warning, or Critical)
2. Likely causes, noting uncertainty where appropriate
3. A cautious recommended irrigation duration and ESP32 polling interval.
Do not claim to have changed the relay or controlled hardware. Treat the result as advice requiring operator verification.
    `.trim();
    const label = `📊 Analyze sensor readings: Moisture ${latestTelemetry.moisture}%, Temp ${latestTelemetry.temperature}°C, Humidity ${latestTelemetry.humidity}%, Relay ${latestTelemetry.relayActive ? 'ON' : 'OFF'}.`;
    await sendPostToGemini(prompt, label, latestTelemetry);
  };

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const question = userInput.trim();
    setUserInput('');
    const prompt = `
Live sensor context:
Node: ${liveTelemetry.nodeId}
Moisture: ${liveTelemetry.moisture}%
Temperature: ${liveTelemetry.temperature}°C
Humidity: ${liveTelemetry.humidity}%
Relay: ${liveTelemetry.relayActive ? 'ON' : 'OFF'}

User question: ${question}

Answer clearly and concisely. State assumptions when needed.
    `.trim();

    await sendPostToGemini(prompt, question, liveTelemetry);
  };

  return (
    <div className="ai-page-wrapper">
      <div className="ai-top-bar">
        <div>
          <span className="ai-badge-pill">GEMINI AI TELEMETRY ENGINE</span>
          <h1 className="ai-main-title">✨ AI Sensor Diagnostic &amp; Live Chat</h1>
          <p className="ai-subtitle">
            Fetch sensor readings with <code>GET</code> and send diagnostic prompts with <code>POST</code>.
          </p>
        </div>

        <div className="ai-top-actions">
          <button
            className="get-sync-btn"
            onClick={() => void fetchSensorDataWithGet()}
            disabled={isSyncingSensor || isLoading}
          >
            {isSyncingSensor ? 'Syncing GET...' : '🔄 Refresh Sensor (GET)'}
          </button>
          <button
            className="special-prompt-btn"
            onClick={() => void handleSpecialSensorPrompt()}
            disabled={isLoading || isSyncingSensor}
          >
            ⚡ Generate AI Solution from Sensors (POST)
          </button>
        </div>
      </div>

      {sensorError && (
        <p className="api-error" role="alert">
          <strong>Sensor GET error:</strong> {sensorError}
        </p>
      )}

      <div className="telemetry-strip">
        <div className="t-item"><span className="t-label">Node ID</span><strong className="t-val">{liveTelemetry.nodeId}</strong></div>
        <div className="t-item">
          <span className="t-label">Soil Moisture</span>
          <strong className={`t-val ${liveTelemetry.moisture < 35 ? 'crit' : 'ok'}`}>{liveTelemetry.moisture}%</strong>
        </div>
        <div className="t-item"><span className="t-label">Temperature</span><strong className="t-val">{liveTelemetry.temperature}°C</strong></div>
        <div className="t-item"><span className="t-label">Humidity</span><strong className="t-val">{liveTelemetry.humidity}%</strong></div>
        <div className="t-item"><span className="t-label">5V Relay State</span><strong className="t-val">{liveTelemetry.relayActive ? 'ACTIVE' : 'STANDBY'}</strong></div>
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-status-indicator">
            <span className="chat-dot" />
            <strong>Gemini Flash — Sensor-Aware Assistant</strong>
          </div>
          <span className="chat-meta">GET / POST API pipeline</span>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-bubble-row ${message.sender === 'user' ? 'row-user' : 'row-ai'}`}
            >
              <div className={`chat-bubble ${message.sender === 'user' ? 'bubble-user' : 'bubble-ai'}`}>
                <div className="bubble-top">
                  <span className="bubble-author">
                    {message.sender === 'user' ? 'You (Operator)' : '✨ TerraLink Gemini AI'}
                  </span>
                  <span className="bubble-time">{message.timestamp}</span>
                </div>
                <div className="bubble-content" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chat-bubble-row row-ai">
              <div className="chat-bubble bubble-ai typing-bubble">
                <span>Analyzing sensor telemetry via POST request...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form className="chat-input-bar" onSubmit={handleChatSubmit}>
          <input
            type="text"
            className="chat-text-input"
            placeholder="Ask about moisture, relay timing, or risk zones..."
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            disabled={isLoading}
          />
          <button type="submit" className="chat-send-btn" disabled={isLoading || !userInput.trim()}>
            Send (POST) →
          </button>
        </form>
      </div>
    </div>
  );
};

export default AISolution;
