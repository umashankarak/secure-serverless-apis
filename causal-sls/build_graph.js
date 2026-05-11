// ============================================
// File: build_graph.js
// ============================================

const fs = require('fs');

const events =
  JSON.parse(fs.readFileSync('events.json', 'utf8'));

const graph = {
  nodes: [],
  edges: []
};

events.forEach((event) => {

  graph.nodes.push({
    span_id: event.span_id,
    trace_id: event.trace_id,
    function: event.function,
    timestamp: event.timestamp,
    label: event.label
  });

  if (event.parent_span_id) {

    graph.edges.push({
      from: event.parent_span_id,
      to: event.span_id,
      trace_id: event.trace_id
    });
  }
});

fs.writeFileSync(
  'graph.json',
  JSON.stringify(graph, null, 2)
);

console.log('graph.json generated');