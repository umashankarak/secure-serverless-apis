framework.# secure-serverless-apis
# Logs-Only Baseline Evaluation Prototype

## Overview

This project implements a simplified **Logs-Only Monitoring** baseline for evaluating serverless security observability in distributed cloud-native environments.

The objective of the prototype is to demonstrate the limitations of isolated log analysis for detecting coordinated multi-stage attacks in serverless workflows.

This implementation serves as the baseline comparison system for the proposed **Causal-SLS** temporal causal graph framework.

---

# Objectives

The prototype demonstrates:

- Synthetic serverless log generation
- Benign and malicious workflow simulation
- Keyword-based anomaly detection
- Security metric computation
- Experimental reproducibility
- Quantitative evaluation methodology

The detector intentionally uses simplistic log analysis to represent common real-world monitoring approaches that rely heavily on isolated log telemetry.

---

# Experimental Workflow

The simulated serverless application models a simplified distributed transaction workflow:

```text
Client Request
      ↓
Authentication Lambda
      ↓
Order Lambda
      ↓
Billing Lambda
      ↓
Notification Lambda
```

Each stage generates synthetic log events.

---

# Attack Scenarios

The experiment injects multiple attack categories into the workflow.

## 1. Token Abuse

Simulates unauthorized token reuse behavior.

---

## 2. Forged Payload Injection

Simulates malformed or manipulated event payloads.

---

## 3. Billing Replay Attack

Simulates repeated billing execution and replay behavior.

---

## 4. Asynchronous Event Injection

Simulates unauthorized asynchronous event propagation.

---

# Stealth Attack Simulation

To improve realism, the dataset also includes stealth attacks that intentionally avoid explicit suspicious keywords.

These attacks emulate realistic observability limitations and increase false negatives.

---

# Benign Noise Injection

Benign logs intentionally contain suspicious-looking terminology to simulate noisy production environments.

This generates false positives and better reflects operational monitoring behavior commonly observed in real-world SIEM and log-monitoring systems.

---

# Folder Structure

```text
Evaluation/
├── generate_logs.js
├── detect_logs.js
├── metrics.js
├── logs.txt
├── results.txt
└── README.md
```

---

# Implementation Details

## generate_logs.js

Responsibilities:

- Generate benign logs
- Generate obvious attack logs
- Generate stealth attack logs
- Write synthetic telemetry to `logs.txt`

### Generated Log Categories

| Category | Purpose |
|---|---|
| Benign logs | Simulate normal serverless execution |
| Suspicious benign logs | Generate false positives |
| Obvious attack logs | Easily detectable attacks |
| Stealth attack logs | Hard-to-detect attacks |

---

## detect_logs.js

Responsibilities:

- Read generated logs
- Perform keyword-based anomaly detection
- Classify events as:
  - ATTACK
  - BENIGN
- Write predictions to `results.txt`

### Detection Methodology

The detector searches for suspicious keywords within each log entry.

If suspicious keywords are identified, the event is classified as an attack; otherwise, it is classified as benign.

This intentionally simplistic approach models traditional isolated log-monitoring systems.

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

## Step 1 — Generate Logs

```bash
node generate_logs.js
```

---

## Step 2 — Run Detection

```bash
node detect_logs.js
```

---

## Step 3 — Compute Metrics

```bash
node metrics.js
```

---

# Example Experimental Results

Example output from the current prototype:

```text
=== Logs-Only Results ===
TP: 70
FP: 74
TN: 226
FN: 30

Accuracy: 0.74
Precision: 0.49
Recall: 0.70
F1-score: 0.57
False Positive Rate: 0.25
```

---

# Interpretation of Results

The results demonstrate several important limitations of isolated log monitoring.

## High False Positives

The detector incorrectly classified many benign events as attacks because suspicious keywords appeared in normal operational logs.

This reflects real-world alert fatigue commonly observed in SIEM and log-monitoring systems.

---

## False Negatives

Stealth attacks lacking explicit suspicious keywords were not detected.

This demonstrates the inability of logs-only monitoring to capture semantic and distributed behavioral anomalies.

---

## Limited Detection Capability

Although obvious attacks were detected successfully, the logs-only baseline struggled to distinguish coordinated malicious activity from noisy operational behavior.

---

# Research Relevance

This prototype provides:

- Reproducible experimental methodology
- Baseline observability implementation
- Quantitative evaluation evidence
- Real computed detection metrics
- Comparative foundation for Causal-SLS

The experiment validates the paper’s core motivation:

> isolated telemetry analysis is insufficient for accurate detection of coordinated distributed serverless attacks.

---

# Limitations

This prototype intentionally simplifies several aspects of production observability systems.

The implementation does not include:

- Distributed tracing
- Metric correlation
- Graph reasoning
- Temporal dependency modeling
- Machine learning anomaly detection

These limitations are intentional because the prototype serves only as the baseline comparison system.

---

# Future Extensions

Future iterations may incorporate:

- CloudWatch integration
- AWS X-Ray traces
- EventBridge telemetry
- Temporal graph construction
- Graph neural network anomaly scoring
- Real Lambda deployments
- Multi-hop attack propagation analysis

---

# Technology Stack

| Component | Technology |
|---|---|
| Runtime | Node.js |
| Language | JavaScript |
| Telemetry | Synthetic Logs |
| Evaluation | Custom Metric Engine |
| Environment | Local Prototype |

---

# Conclusion

The Logs-Only baseline demonstrates the operational limitations of isolated serverless observability approaches.

The experiment provides realistic:
- false positives
- false negatives
- noisy detection behavior

that closely resemble practical production monitoring environments.

These results establish a measurable comparative baseline for evaluating the proposed Causal-SLS temporal graph-based security observability .
