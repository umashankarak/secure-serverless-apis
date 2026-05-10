const fs = require('fs');

const events =
  JSON.parse(fs.readFileSync('events.json', 'utf8'));

const groupedByTrace = {};

// -----------------------------
// GROUP EVENTS BY TRACE
// -----------------------------
events.forEach((event) => {

  if (!groupedByTrace[event.trace_id]) {
    groupedByTrace[event.trace_id] = [];
  }

  groupedByTrace[event.trace_id].push(event);
});

const results = [];

// -----------------------------
// TRACE ANALYSIS
// -----------------------------
Object.keys(groupedByTrace).forEach((traceId) => {

  const traceEvents = groupedByTrace[traceId];

  const tracePath = traceEvents[0].trace_path;

  const actual = traceEvents[0].label;

  let predicted = 'BENIGN';

  // -----------------------------------
  // Rule 1:
  // repeated Billing invocation
  // Example:
  // API -> Auth -> Billing -> Billing
  // -----------------------------------
  const billingCount =
    tracePath.filter(node => node === 'Billing').length;

  if (billingCount > 1) {
    predicted = 'ATTACK';
  }

  // -----------------------------------
  // Rule 2:
  // Unknown service propagation
  // Example:
  // API -> UnknownService -> Billing
  // -----------------------------------
  if (tracePath.includes('UnknownService')) {
    predicted = 'ATTACK';
  }

  // -----------------------------------
  // Rule 3:
  // Consecutive repeated nodes
  // Example:
  // Order -> Order
  // -----------------------------------
  for (let i = 0; i < tracePath.length - 1; i++) {

    if (tracePath[i] === tracePath[i + 1]) {
      predicted = 'ATTACK';
      break;
    }
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

console.log('Tracing-only detection completed');