// ============================================
// File: detect_causal_anomalies.js
// ============================================

const fs = require('fs');

const events =
  JSON.parse(fs.readFileSync('events.json', 'utf8'));

const groupedByTrace = {};

events.forEach((event) => {

  if (!groupedByTrace[event.trace_id]) {
    groupedByTrace[event.trace_id] = [];
  }

  groupedByTrace[event.trace_id].push(event);
});

const results = [];

Object.keys(groupedByTrace).forEach((traceId) => {

  const traceEvents =
    groupedByTrace[traceId];

  const tracePath =
    traceEvents[0].trace_path;

  const actual =
    traceEvents[0].label;

  let predicted = 'BENIGN';

  // ----------------------------------
  // Rule 1:
  // Unknown propagation
  // ----------------------------------
  if (
    tracePath.includes('UnknownService')
  ) {
    predicted = 'ATTACK';
  }

  // ----------------------------------
// Rule 2:
// Consecutive repeated nodes
// with abnormal invocation volume
// ----------------------------------
for (let i = 0; i < tracePath.length - 1; i++) {

    if (
      tracePath[i] === tracePath[i + 1] &&
      traceEvents[i].invocation_count > 3
    ) {
      predicted = 'ATTACK';
      break;
    }
  }

  // ----------------------------------
  // Rule 3:
  // Temporal replay burst
  // ----------------------------------
  for (let i = 0; i < traceEvents.length - 1; i++) {

    const current = traceEvents[i];
    const next = traceEvents[i + 1];

    if (
      current.target_function === next.target_function &&
      (next.timestamp - current.timestamp) < 50
    ) {
      predicted = 'ATTACK';
    }
  }

  // ----------------------------------
  // Rule 4:
  // Cross-function lateral movement
  // ----------------------------------
  if (
    tracePath.includes('Notification') &&
    tracePath.includes('Billing')
  ) {
    predicted = 'ATTACK';
  }

  results.push({
    trace_id: traceId,
    actual,
    predicted
  });
});

fs.writeFileSync(
  'results.json',
  JSON.stringify(results, null, 2)
);

console.log('Causal-SLS detection completed');