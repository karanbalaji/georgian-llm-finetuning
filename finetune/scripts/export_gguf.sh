#!/usr/bin/env bash
# Exports fused_model/ (HF-format safetensors from `mlx_lm.fuse --dequantize`)
# to GGUF for Ollama/llama.cpp serving.
#
# This intentionally does NOT use mlx_lm's own GGUF exporter
# (`mlx_lm.gguf.prepare_metadata` / `mx.save_gguf`). That path writes
# `tokenizer.ggml.model = "llama"` (SentencePiece) with no merges table for
# this Llama-3-style BPE tokenizer, which loads without error but crashes
# every request with `unordered_map::at: key not found` the first time
# llama.cpp's tokenizer needs a merge lookup. llama.cpp's own converter
# handles Llama-3 BPE tokenizers (merges + special tokens) correctly, so we
# convert directly from the HF-format safetensors instead.
set -euo pipefail
cd "$(dirname "$0")/.."

.venv/bin/python3 /opt/homebrew/bin/convert_hf_to_gguf.py \
  fused_model \
  --outfile fused_model/hermes-triage.gguf \
  --outtype f16

llama-quantize \
  fused_model/hermes-triage.gguf \
  fused_model/hermes-triage-Q4_K_M.gguf \
  Q4_K_M

echo "Done. Reload into Ollama with: ollama create hermes-triage -f Modelfile"
