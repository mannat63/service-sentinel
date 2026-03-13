const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFilePath = path.join(logsDir, 'app.log');

function writeLog(level, message) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const timestamp = `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`;
  const logLine = `${timestamp} ${level} ${message}\n`;
  
  fs.appendFileSync(logFilePath, logLine);
}

module.exports = {
  info: (message) => writeLog('INFO', message),
  warning: (message) => writeLog('WARNING', message),
  error: (message) => writeLog('ERROR', message)
};
