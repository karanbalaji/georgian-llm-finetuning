"""Runs the same held-out tickets through the base model and the LoRA-adapted
model, side by side, and writes the verbatim output to results/before_after.md
as real evidence the fine-tune changed behavior — not an asserted claim.
"""

import json
from pathlib import Path

from mlx_lm import load, generate

ROOT = Path(__file__).resolve().parent.parent
MODEL = "mlx-community/Hermes-3-Llama-3.2-3B-4bit"
ADAPTER_PATH = ROOT / "adapters"

HELD_OUT_PROMPTS = [
    "Ticket: Hi team, Trial converted to paid without notice. Happy to provide more details.",
    "Ticket: Hey there, Charger cable frayed and sparking. Let me know what you need from me.",
    "Ticket: Hi, Currency shown in invoice is wrong. Please help ASAP.",
    "Ticket: Hi, Promo code discount wasn't applied. Please help ASAP.",
]

SYSTEM_PROMPT = (
    "You are a support ticket triage assistant. Given a ticket, respond in "
    "the exact format: Category: <category> | Priority: <priority> | Reply: <short reply>"
)


def run(model, tokenizer, prompt: str) -> str:
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": prompt},
    ]
    formatted = tokenizer.apply_chat_template(messages, add_generation_prompt=True)
    return generate(model, tokenizer, prompt=formatted, max_tokens=120, verbose=False)


def main():
    print("Loading base model...")
    base_model, base_tokenizer = load(MODEL)

    print("Loading fine-tuned (adapter) model...")
    tuned_model, tuned_tokenizer = load(MODEL, adapter_path=str(ADAPTER_PATH))

    lines = [
        "# Before / After: Support-Ticket Triage LoRA Fine-Tune",
        "",
        f"Base model: `{MODEL}` (no adapter) vs. the same model with the LoRA adapter",
        "trained in this session (`finetune/adapters/adapters.safetensors`).",
        "Held-out prompts below are from `finetune/data/valid.jsonl` — not seen during training.",
        "",
    ]

    for i, prompt in enumerate(HELD_OUT_PROMPTS, 1):
        print(f"\n=== Example {i} ===\n{prompt}")
        base_out = run(base_model, base_tokenizer, prompt)
        tuned_out = run(tuned_model, tuned_tokenizer, prompt)
        print(f"-- base --\n{base_out}")
        print(f"-- fine-tuned --\n{tuned_out}")

        lines.append(f"## Example {i}")
        lines.append(f"**Prompt:** `{prompt}`")
        lines.append("")
        lines.append("**Base model (no fine-tune):**")
        lines.append("```")
        lines.append(base_out.strip())
        lines.append("```")
        lines.append("")
        lines.append("**Fine-tuned (LoRA adapter):**")
        lines.append("```")
        lines.append(tuned_out.strip())
        lines.append("```")
        lines.append("")

    out_path = ROOT / "results" / "before_after.md"
    out_path.write_text("\n".join(lines))
    print(f"\nWrote {out_path}")


if __name__ == "__main__":
    main()
