# Tracing-Only Baseline Evaluation Prototype

## Overview

This project implements a simplified **Tracing-Only Monitoring** baseline for evaluating distributed serverless security observability.

Unlike the Logs-Only baseline, this implementation uses:

- trace_id
- span_id
- parent_span_id
- distributed execution paths
- workflow propagation structure
- causal invocation relationships

The detector intentionally ignores:

- log message semantics
- payload contents
- keyword-based analysis
- application-level context

and instead performs anomaly detection using distributed tracing relationships and execution topology.

This implementation serves as the intermediate comparison system between:
- Logs-Only monitoring
- Causal-SLS temporal graph reasoning

---

# Objectives

The prototype demonstrates:

- Synthetic distributed trace generation
- Parent-child span modeling
- Distributed workflow reconstruction
- Structural anomaly detection
- Multi-hop propagation analysis
- Replay chain identification
- Quantitative evaluation methodology
- Experimental reproducibility

The detector intentionally relies only on distributed trace topology to model tracing-centric observability systems commonly used in cloud-native environments.

---

# Experimental Workflow

The simulated serverless application models a distributed transaction workflow:

```text
Client Request
      ↓
API Gateway
      ↓
Authentication Lambda
      ↓
Order Lambda
      ↓
Billing Lambda
      ↓
Notification Lambda
```

Each execution generates:
- trace identifiers
- span identifiers
- parent-child relationships
- distributed execution paths

---

# Attack Scenarios

The experiment injects multiple attack categories into the workflow.

---

## 1. Replay Attack

Simulates repeated execution behavior such as:

```text
Billing → Billing
```

This models:
- replay attacks
- repeated invocation abuse
- duplicate execution chains

---

## 2. Unknown Service Propagation

Simulates malicious workflow propagation through unauthorized services.

Example:

```text
API → UnknownService → Billing
```

---

## 3. Cross-Function Lateral Movement

Simulates abnormal workflow escalation across unrelated services.

Example:

```text
Notification → Billing
```

---

## 4. Asynchronous Event Injection

Simulates unauthorized asynchronous propagation and abnormal workflow transitions.

---

# Stealth Attack Simulation

To improve realism, the dataset also includes stealth attacks that intentionally resemble legitimate workflows.

Example:

```text
API → Auth → Order → Billing
```

These attacks avoid obvious structural anomalies and increase false negatives.

This models realistic attacker evasion behavior in distributed serverless environments.

---

# Benign Retry-Like Workflows

The experiment intentionally includes benign retry behavior such as:

```text
API → Auth → Billing → Billing
```

These workflows simulate:
- retries
- transient failures
- queue redelivery
- duplicate processing

This introduces realistic operational ambiguity and generates controlled false positives.

---

# Folder Structure

```text
tracing-only-baseline/
├── generate_traces.js
├── detect_traces.js
├── metrics.js
├── events.json
├── results.json
└── README.md
```

---

# Implementation Details

## generate_traces.js

Responsibilities:

- Generate benign distributed traces
- Generate retry-like benign traces
- Generate distributed attack traces
- Generate stealth attack traces
- Create span relationships
- Create distributed execution paths
- Write telemetry dataset to `events.json`

### Generated Dataset Components

| Dataset Component | Purpose |
|---|---|
| Benign workflows | Simulate normal distributed execution |
| Retry-like benign workflows | Generate realistic ambiguity |
| Distributed attack workflows | Simulate coordinated attacks |
| Stealth attack workflows | Simulate evasive attacks |

---

## detect_traces.js

Responsibilities:

- Read generated distributed traces
- Analyze execution topology
- Detect structural anomalies
- Classify workflows as:
  - ATTACK
  - BENIGN
- Write predictions to `results.json`

---

### Detection Methodology

The detector performs topology-based anomaly detection using distributed workflow relationships.

---

### Rule 1 — Repeated Invocation Detection

Detects repeated execution chains such as:

```text
Billing → Billing
```

This models:
- replay attacks
- repeated execution abuse

---

### Rule 2 — Unknown Service Detection

Detects propagation through unauthorized services.

Example:

```text
API → UnknownService → Billing
```

---

### Rule 3 — Consecutive Repeated Node Detection

Detects repeated workflow transitions such as:

```text
Order → Order
```

This models:
- replay chains
- abnormal workflow loops

---

## metrics.js

Responsibilities:

- Compute:
  - True Positives (TP)
  - False Positives (FP)
  - True Negatives (TN)
  - False Negatives (FN)
- Calculate:
  - Accuracy
  - Precision
  - Recall
  - F1-score
  - False Positive Rate

---

# Evaluation Metrics

## Accuracy

Measures the overall correctness of attack classification.

---

## Precision

Measures the percentage of detected anomalies that were true attacks.

---

## Recall

Measures the percentage of attacks successfully detected.

---

## F1-Score

Represents the harmonic mean of precision and recall.

---

## False Positive Rate

Measures the percentage of benign executions incorrectly classified as malicious.

---

# Commands to Run

## Step 1 — Generate Distributed Traces

```bash
node generate_traces.js
```

---

## Step 2 — Run Trace Detection

```bash
node detect_traces.js
```

---

## Step 3 — Compute Metrics

```bash
node metrics.js
```

---

# Run Entire Pipeline

```bash
node generate_traces.js && node detect_traces.js && node metrics.js
```

---

# Example Experimental Results

Example output from the current prototype:

```text
=== Tracing-Only Results ===

TP: 59
FP: 20
TN: 300
FN: 41

Accuracy: 85.48%
Precision: 74.68%
Recall: 59.00%
F1-score: 65.92%
False Positive Rate: 6.25%
```

---

# Interpretation of Results

The results demonstrate that distributed tracing improves visibility into coordinated serverless attack behavior compared to isolated log monitoring.

---

## Improved Structural Visibility

The tracing baseline successfully identified:
- replay chains
- abnormal propagation paths
- unauthorized service transitions
- distributed workflow anomalies

This demonstrates the value of execution topology analysis.

---

## Reduced False Positives

Compared to Logs-Only monitoring, tracing relationships reduced noisy detections by preserving workflow structure.

---

## Remaining False Negatives

Stealth attacks intentionally resembling legitimate workflows remained difficult to detect.

This demonstrates the limitations of tracing-only observability systems that lack semantic or temporal behavioral analysis.

---

## Limited Semantic Awareness

Because the detector ignores:
- payload content
- log semantics
- application context

it cannot identify attacks that preserve normal workflow topology.

---

# Comparative Evaluation

| Method | Accuracy | Precision | Recall | F1-score | FPR |
|---|---|---|---|---|---|
| Logs-only | 82.50% | 63.64% | 70.00% | 66.67% | 13.33% |
| Tracing-only | 85.48% | 74.68% | 59.00% | 65.92% | 6.25% |

---

# Research Relevance

This prototype provides:

- Reproducible distributed tracing evaluation
- Structural anomaly detection methodology
- Quantitative evaluation evidence
- Real computed detection metrics
- Comparative baseline validation

The experiment validates the paper’s core motivation:

> distributed tracing improves workflow visibility, but tracing alone remains insufficient for detecting stealthy coordinated serverless attacks.

---

# Limitations

This prototype intentionally simplifies several aspects of production tracing systems.

The implementation does not include:

- Real AWS X-Ray integration
- CloudWatch traces
- Temporal graph reasoning
- Payload semantics
- Machine learning anomaly scoring
- Graph neural networks
- Real-time telemetry streaming

These limitations are intentional because the prototype serves only as the baseline comparison system.

---

# Future Extensions

Future iterations may incorporate:

- AWS X-Ray integration
- EventBridge telemetry
- Temporal dependency modeling
- Graph construction
- Multi-hop attack propagation analysis
- Real-time anomaly scoring
- Graph neural network embeddings

---

# Technology Stack

| Component | Technology |
|---|---|
| Runtime | Node.js |
| Language | JavaScript |
| Telemetry | Distributed Traces |
| Evaluation | Custom Metric Engine |
| Environment | Local Prototype |

---

# Conclusion

The Tracing-Only baseline demonstrates how distributed workflow visibility improves attack detection compared to isolated log analysis.

The experiment provides realistic:
- distributed execution correlation
- replay chain visibility
- structural anomaly detection
- operational ambiguity

that more closely resemble modern cloud-native tracing systems.

These results establish a measurable intermediate baseline for evaluating the proposed Causal-SLS temporal graph-based security observability framework.