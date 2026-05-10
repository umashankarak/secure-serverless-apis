const fs = require('fs');

const suspiciousKeywords = [
  'Unauthorized',
  'Replay',
  'InvalidPayload',
  'UnknownEventSource'
];

const logs = fs.readFileSync('logs.txt', 'utf8').split('\n');

let results = [];

logs.forEach((line) => {

  if (!line.trim()) return;

  const actual = line.startsWith('ATTACK')
    ? 'ATTACK'
    : 'BENIGN';

  let detected = 'BENIGN';

  for (const keyword of suspiciousKeywords) {
    if (line.includes(keyword)) {
      detected = 'ATTACK';
      break;
    }
  }

  results.push(`${actual},${detected}`);
});

fs.writeFileSync('results.txt', results.join('\n'));

console.log('Detection completed');