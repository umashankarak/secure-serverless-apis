const fs = require('fs');

const normalLogs = [
  'INFO User authenticated',
  'INFO Order created',
  'INFO Billing completed',
  'INFO Notification sent',

  // Benign logs containing suspicious-looking words
  'INFO Replay completed successfully',
  'INFO Unauthorized access attempt blocked',
  'INFO Payload validated successfully',
  'INFO EventSource verified'
];

const stealthAttackLogs = [
  // Attack logs WITHOUT obvious keywords
  'ERROR Session mismatch detected',
  'WARNING Billing retry anomaly',
  'ERROR Abnormal execution sequence',
  'WARNING Token behavior deviation'
];

const obviousAttackLogs = [
  // Attack logs WITH obvious keywords
  'ERROR Unauthorized token reuse',
  'WARNING InvalidPayload detected',
  'ERROR Replay attack on billing',
  'WARNING UnknownEventSource received'
];

let output = '';

// Generate benign logs
for (let i = 0; i < 300; i++) {

  const log =
    normalLogs[Math.floor(Math.random() * normalLogs.length)];

  output += `BENIGN::${log}\n`;
}

// Generate obvious attack logs
for (let i = 0; i < 70; i++) {

  const log =
    obviousAttackLogs[Math.floor(Math.random() * obviousAttackLogs.length)];

  output += `ATTACK::${log}\n`;
}

// Generate stealth attack logs
for (let i = 0; i < 30; i++) {

  const log =
    stealthAttackLogs[Math.floor(Math.random() * stealthAttackLogs.length)];

  output += `ATTACK::${log}\n`;
}

fs.writeFileSync('logs.txt', output);

console.log('logs.txt generated');