---
license: apache-2.0
base_model: mlx-community/Hermes-3-Llama-3.2-3B-4bit
tags:
  - gguf
  - llama.cpp
  - lora
  - support-ticket-triage
  - georgian-io
---

# Hermes-3-Llama-3.2-3B — Support Ticket Triage (LoRA fine-tune, GGUF)

A LoRA fine-tune of [`mlx-community/Hermes-3-Llama-3.2-3B-4bit`](https://huggingface.co/mlx-community/Hermes-3-Llama-3.2-3B-4bit) trained to classify and reply to support tickets in one deterministic line:

```
Category: <category> | Priority: <priority> | Reply: <short reply>
```

Trained with [MLX](https://github.com/ml-explore/mlx) LoRA (300 iterations, rank/alpha default, ~0.22% of parameters trainable), fused back into the base weights, and exported to GGUF for CPU-friendly serving with [llama.cpp](https://github.com/ggml-org/llama.cpp) / [Ollama](https://ollama.com).

Built as the working proof-of-concept for the "Fine-Tune & Ship" Builder Series case study — a proposed Render x Georgian AI Lab program built around Georgian's open-source [LLM-Finetuning-Toolkit](https://github.com/georgian-io/LLM-Finetuning-Toolkit).

## Files

- `hermes-triage-Q4_K_M.gguf` — 4-bit K-quant, ~1.9 GB, runs on CPU (no GPU required). Use this for serving.

## Before / after

Held-out prompt: `Ticket: Charger cable frayed and sparking. Let me know what you need from me.`

**Base model:** rambling, inconsistent format, no clear category/priority.

**This fine-tune:** `Category: Hardware | Priority: High | Reply: Thanks for flagging this — we'll escalate to hardware support and arrange a replacement or repair. Expect an update within 1 business day.`

## Usage (Ollama)

```
ollama create hermes-triage -f Modelfile   # Modelfile: FROM hermes-triage-Q4_K_M.gguf
ollama run hermes-triage "Ticket: My login keeps failing with a 500 error."
```

## Usage (llama.cpp)

```
llama-server -m hermes-triage-Q4_K_M.gguf --port 8080
curl -X POST http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Ticket: My login keeps failing."}]}'
```

## Conversion note

This GGUF was converted from the fused HF-format weights using llama.cpp's own `convert_hf_to_gguf.py`, not `mlx_lm`'s built-in GGUF exporter — the latter mistags this Llama-3-style BPE tokenizer as SentencePiece and omits the merges table, which loads without error but crashes on the first inference request.
