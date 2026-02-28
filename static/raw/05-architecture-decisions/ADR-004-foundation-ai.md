---
sidebar_position: 4
title: ADR-004 - foundation-ai From Scratch
---

# ADR-004: Build LLM From Absolute Zero

## Status
Planned

## Date
February 27, 2026

## Context
All AI enrichment currently uses Groq API. While free and reliable, it creates an external dependency and sends data to third-party servers. The long-term vision requires owning the full AI stack.

## Decision
Build foundation-ai — a complete LLM from absolute zero with no external libraries. Not even numpy or PyTorch. Pure Python with only built-in math, random, and file I/O.

## What Gets Built
1. Tensor library — our numpy replacement
2. Autograd engine — automatic differentiation
3. BPE Tokenizer — same method used by GPT models
4. Transformer architecture — attention, feed-forward, layer norm
5. Training pipeline — data loading, loss, gradient descent
6. Inference engine — token generation, sampling strategies

## Hardware Plan
- Development: 32GB RAM laptop (CPU inference)
- Training: Vast.ai or RunPod (~$0.20-0.50/hr for GPU)
- Target: 1B parameters initially

## Rationale
Building from scratch means understanding every layer. This enables domain-specific modifications, complete privacy, zero inference cost, and is the foundation for the long-term vision of natural language software delivery.

## Consequences
- Takes significant time (weeks/months of focused sessions)
- Initial quality lower than Llama 3.1
- Eventually enables fine-tuning on IAM/DevOps domain
- Replaces Groq across all platform products
