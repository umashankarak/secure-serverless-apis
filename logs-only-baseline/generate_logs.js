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

const benignMessages = [
  'User authenticated',
  'Order created',
  'Billing completed',
  'Notification sent',
  'Replay completed successfully',
  'Payload validated successfully'
];

const obviousAttackMessages = [
  'Unauthorized token reuse',
  'Replay attack on billing',
  'InvalidPayload detected',
  'UnknownEventSource received'
];

const stealthAttackMessages = [
  'Session mismatch detected',
  'Billing retry anomaly',
  'Execution deviation observed',
  'Token behavior anomaly'
];

const benignTracePaths = [
  ['API', 'Auth', 'Order', 'Billing'],
  ['API', 'Auth', 'Notification'],
  ['API', 'Order', 'Billing']
];

const abnormalTracePaths = [
  ['API', 'Auth', 'Billing', 'Billing'],
  ['API', 'UnknownService', 'Billing'],
  ['API', 'Auth', 'Order', 'Order', 'Billing']
];

const workflowFunctions = [
  'AuthLambda',
  'OrderLambda',
  'BillingLambda',
  'NotificationLambda'
];

let requestId = 1;
let spanCounter = 1;

//
// Generate benign events
//
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

      function: randomChoice(workflowFunctions),

      event_type: 'invoke',

      status: 'success',

      message: randomChoice(benignMessages),

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

//
// Generate obvious attack events
//
for (let i = 0; i < 70; i++) {

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

      function: randomChoice([
        'AuthLambda',
        'BillingLambda'
      ]),

      event_type: 'invoke',

      status: 'error',

      message: randomChoice(obviousAttackMessages),

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

//
// Generate stealth attack events
//
for (let i = 0; i < 30; i++) {

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

      function: randomChoice([
        'OrderLambda',
        'BillingLambda'
      ]),

      event_type: 'invoke',

      status: 'warning',

      message: randomChoice(stealthAttackMessages),

      duration_ms: randomDuration(400, 1000),

      invocation_count: randomDuration(3, 10),

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