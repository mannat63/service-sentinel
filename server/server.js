const express = require('express');
const logger = require('./logger');

const app = express();
const PORT = 5000;

// Enable CORS for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});

// Middleware to parse JSON bodies
app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "service-sentinel",
    timestamp: new Date()
  });
});

// POST /log/info
app.post('/log/info', (req, res) => {
  console.log('Received INFO log:', req.body);
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  logger.info(message);
  res.json({ status: 'logged' });
});

// POST /log/warning
app.post('/log/warning', (req, res) => {
  console.log('Received WARNING log:', req.body);
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  logger.warning(message);
  res.json({ status: 'logged' });
});

// POST /log/error
app.post("/log/error", (req, res) => {
  const message = req.body.message;

  const logEntry = `[ERROR] ${message}\n`;
  fs.appendFileSync("./logs/app.log", logEntry);

  sendAlert(message);   // send alert to Kuma

  res.json({ status: "logged" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Logging server running on http://localhost:${PORT}`);
  logger.info('Server started');
});

const axios = require("axios");

const KUMA_PUSH_URL = "hhttp://13.219.237.91:3001/api/push/lhTZrjlqLm?status=up&msg=OK&ping=";

function sendAlert(message) {
  axios.get(KUMA_PUSH_URL + "?status=down&msg=" + encodeURIComponent(message))
    .catch(err => console.error("Kuma alert failed"));
}


