const fs = require('fs');

const suspiciousKeywords = [
  'Unauthorized',
  'Replay',
  'InvalidPayload',
  'UnknownEventSource'
];

const events =
  JSON.parse(fs.readFileSync('events.json', 'utf8'));

const results = [];

events.forEach((event) => {

  let detected = 'BENIGN';

  for (const keyword of suspiciousKeywords) {

    if (event.message.includes(keyword)) {
      detected = 'ATTACK';
      break;
    }
  }

  results.push({
    request_id: event.request_id,
    actual: event.label,
    predicted: detected
  });
});

fs.writeFileSync(
  'results.json',
  JSON.stringify(results, null, 2)
);

console.log('Logs-only detection completed');