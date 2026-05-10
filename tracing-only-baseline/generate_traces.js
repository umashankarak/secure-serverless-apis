const fs = require('fs');
const events = [];
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDuration(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTraceId(id) {
  return `TRACE-${id}`;
}

function generateSpanId(id) {
  return `SPAN-${id}`;
}

const functionMap = {
  API: 'APIGateway',
  Auth: 'AuthLambda',
  Order: 'OrderLambda',
  Billing: 'BillingLambda',
  Notification: 'NotificationLambda',
  UnknownService: 'UnknownService'
};

const benignTracePaths = [
    ['API', 'Auth', 'Order', 'Billing'],
    ['API', 'Auth', 'Notification'],
    ['API', 'Order', 'Billing']
  ];

const abnormalTracePaths = [
  ['API', 'Auth', 'Billing', 'Billing'],
  ['API', 'UnknownService', 'Billing'],
  ['API', 'Auth', 'Order', 'Order', 'Billing'],
  ['API', 'Billing'],
  ['API', 'Auth', 'Notification', 'Billing']
];

let requestId = 1;
let spanCounter = 1;

// -----------------------------
// BENIGN WORKFLOWS
// -----------------------------
for (let i = 0; i < 300; i++) {

    const traceId = generateTraceId(requestId);
  
    const tracePath = randomChoice(benignTracePaths);
  
    let parentSpanId = null;
  
    tracePath.forEach((step, index) => {
  
      const spanId = generateSpanId(spanCounter++);
  
      const event = {
        request_id: `REQ-${requestId}`,
        trace_id: traceId,
        span_id: spanId,
        parent_span_id: parentSpanId,
        timestamp: new Date().toISOString(),
  
        source_function:
          index === 0
            ? 'Client'
            : tracePath[index - 1],
  
        target_function: step,
  
        function: functionMap[step],
  
        event_type: 'invoke',
  
        status: 'success',
  
        duration_ms: randomDuration(100, 300),
  
        invocation_count: 1,
  
        trace_path: tracePath,
  
        label: 'BENIGN'
      };
  
      events.push(event);
  
      parentSpanId = spanId;
    });
  
    requestId++;
  }

  // -----------------------------
// BENIGN RETRY WORKFLOWS
// Small number of retry-like
// benign traces to create
// realistic tracing ambiguity
// -----------------------------
for (let i = 0; i < 20; i++) {

    const traceId = generateTraceId(requestId);
  
    const retryPaths = [
      ['API', 'Auth', 'Billing', 'Billing'],
      ['API', 'Order', 'Order', 'Billing']
    ];
  
    const tracePath = randomChoice(retryPaths);
  
    let parentSpanId = null;
  
    tracePath.forEach((step, index) => {
  
      const spanId = generateSpanId(spanCounter++);
  
      const event = {
        request_id: `REQ-${requestId}`,
        trace_id: traceId,
        span_id: spanId,
        parent_span_id: parentSpanId,
        timestamp: new Date().toISOString(),
  
        source_function:
          index === 0
            ? 'Client'
            : tracePath[index - 1],
  
        target_function: step,
  
        function: functionMap[step],
  
        event_type: 'invoke',
  
        status: 'success',
  
        duration_ms: randomDuration(100, 300),
  
        invocation_count: 1,
  
        trace_path: tracePath,
  
        label: 'BENIGN'
      };
  
      events.push(event);
  
      parentSpanId = spanId;
    });
  
    requestId++;
  }

  // -----------------------------
// ATTACK WORKFLOWS
// -----------------------------
for (let i = 0; i < 100; i++) {

    const traceId = generateTraceId(requestId);
  
    const tracePath = randomChoice(abnormalTracePaths);
  
    let parentSpanId = null;
  
    tracePath.forEach((step, index) => {
  
      const spanId = generateSpanId(spanCounter++);
  
      const event = {
        request_id: `REQ-${requestId}`,
        trace_id: traceId,
        span_id: spanId,
        parent_span_id: parentSpanId,
        timestamp: new Date().toISOString(),
  
        source_function:
          index === 0
            ? 'Client'
            : tracePath[index - 1],
  
        target_function: step,
  
        function: functionMap[step],
  
        event_type: 'invoke',
  
        status: 'warning',
  
        duration_ms: randomDuration(500, 1200),
  
        invocation_count: randomDuration(5, 15),
  
        trace_path: tracePath,
  
        label: 'ATTACK'
      };
  
      events.push(event);
  
      parentSpanId = spanId;
    });
  
    requestId++;
  }
  
  fs.writeFileSync(
    'events.json',
    JSON.stringify(events, null, 2)
  );
  
  console.log('events.json generated');