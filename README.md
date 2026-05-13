# secure-serverless-apis

# Causal-SLS: Temporal Graph-Based Security Observability for Serverless Systems

This repository contains the prototype implementations, evaluation artifacts, and reproducible experimental baselines for the research framework:

> **Causal-SLS: A Temporal Graph-Based Framework for Security Observability in Serverless Systems**

The project demonstrates how temporal causal graph reasoning improves detection of coordinated multi-stage attacks in distributed serverless environments compared to traditional observability approaches such as isolated logs and distributed tracing.

---

# Repository Overview

The repository contains three independent evaluation prototypes:

| Folder | Description |
|---|---|
| `logs-only-baseline/` | Traditional isolated log-monitoring baseline |
| `tracing-only-baseline/` | Distributed tracing-based anomaly detection baseline |
| `causal-sls/` | Proposed temporal causal graph detection framework |

Each implementation includes:
- synthetic telemetry generation
- anomaly detection logic
- metric computation
- reproducible evaluation methodology
- detailed README documentation

---

# Research Motivation

Serverless systems introduce significant observability challenges due to:

- ephemeral execution
- asynchronous event propagation
- distributed workflows
- short-lived functions
- indirect service interactions

Traditional monitoring approaches based solely on:
- logs
- metrics
- distributed traces

often fail to capture causal relationships across distributed execution chains.

This repository evaluates how temporal graph-based reasoning improves visibility into:
- replay attacks
- lateral movement
- asynchronous event injection
- coordinated multi-stage attacks

in cloud-native serverless environments.

---

# Implemented Evaluation Approaches

## 1. Logs-Only Monitoring

The Logs-Only baseline performs isolated keyword-based anomaly detection using synthetic serverless logs.

Characteristics:
- no distributed context
- no workflow correlation
- keyword-driven detection
- realistic false positives

Models:
- SIEM-style monitoring
- CloudWatch-style log analysis

---

## 2. Tracing-Only Monitoring

The Tracing-Only baseline performs structural anomaly detection using:
- trace_id
- span_id
- parent-child relationships
- distributed execution paths

Characteristics:
- workflow visibility
- topology analysis
- replay chain detection
- propagation analysis

Models:
- AWS X-Ray
- OpenTelemetry-style tracing systems

---

## 3. Causal-SLS

The proposed Causal-SLS framework reconstructs temporal causal graphs from distributed execution telemetry.

Capabilities:
- temporal propagation modeling
- causal dependency analysis
- replay burst detection
- lateral movement analysis
- multi-hop anomaly detection

The framework preserves:
- execution ordering
- distributed causality
- asynchronous propagation relationships

across serverless workflows.

---

# Experimental Workflow

The prototypes model a representative distributed serverless workflow:

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