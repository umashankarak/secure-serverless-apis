# Tracing-Only Baseline

## Overview

This prototype implements a Tracing-Only observability baseline for evaluating distributed serverless attack detection.

Unlike the Logs-Only baseline, this implementation uses:

- trace_id
- span_id
- parent_span_id
- distributed execution paths
- causal workflow structure

The detector intentionally ignores:

- log messages
- payload semantics
- application-level content

and instead performs anomaly detection using distributed tracing relationships.

---

# Detection Strategy

The detector identifies anomalies using:

- repeated service invocation
- abnormal execution paths
- unknown service propagation
- missing authentication stages
- lateral movement patterns

---

# Experimental Goal

This baseline demonstrates how distributed tracing improves visibility into:

- replay attacks
- asynchronous event injection
- cross-function propagation
- abnormal execution flows

compared to isolated log monitoring.

---

# Commands

## Generate Traces

```bash
node generate_traces.js