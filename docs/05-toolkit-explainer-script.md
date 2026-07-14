# "Fine-Tune in One File" — 60-Second Toolkit Explainer Script

**Source:** researched directly from the [LLM-Finetuning-Toolkit GitHub repo](https://github.com/georgian-io/LLM-Finetuning-Toolkit) (README, as of this writing — 871 stars, topics: fine-tuning, LoRA, QLoRA, ablation-study, unit-testing, Llama2, Mistral-7B, Falcon, Zephyr). Every claim below traces to that README, not an assumption.

**Format:** paste the whole file into NotebookLM as a source, then ask it to generate a video overview from the "Narration" column only, using the "Visual" column as the on-screen guidance. Target runtime: 60 seconds at a natural ~150 wpm pace (script is ~155 words).

---

## What it is (for context, not narrated)

Georgian AI Lab's **LLM Finetuning Toolkit** is an open-source, config-driven CLI (`llmtune`) for fine-tuning open-source LLMs. Instead of hand-wiring data loading, LoRA/QLoRA training, and evaluation as separate scripts, a single YAML file controls the whole pipeline — and because the whole pipeline is one config, you can also sweep it: multiple models, prompt templates, and LoRA settings in one run (an "ablation study"), plus automated QA tests that check the fine-tune actually behaves as intended, not just that training completed.

---

## Script

| Time | Narration | Visual |
|---|---|---|
| 0:00–0:08 | "Fine-tuning an open-source LLM usually means stitching together five tools: data prep, training, quantization, evaluation. Georgian's LLM Fine-Tuning Toolkit collapses all of that into one YAML file." | Scattered tool icons (data / GPU / eval) sliding together into a single `config.yml` icon. |
| 0:08–0:20 | "It's an open-source CLI called `llmtune`. Point it at Llama 2, Mistral, Falcon, or Zephyr, hand it a Hugging Face dataset or your own file, and one command runs the whole experiment — ingestion, LoRA or QLoRA training, and evaluation." | Terminal: `llmtune generate config` → `llmtune run ./config.yml`, model name list scrolling past. |
| 0:20–0:35 | "Because it's all in one config, you can launch ablation studies: sweep multiple models, prompts, and LoRA settings in a single run instead of hand-coding each one. Automated QA tests then confirm the fine-tune actually behaves as intended, not just that training finished." | Config YAML showing `hf_model_ckpt: [...]` and `lora: r: [16, 32, 64]`, then a QA checklist ticking off. |
| 0:35–0:47 | "Every run saves versioned artifacts — dataset, weights, predictions, QA results — hashed to your config, so you can resume instead of restarting." | Folder tree: `experiment/<hash>/{dataset, model, results, qa}`. |
| 0:47–0:60 | "It's open-source, built by Georgian's AI Lab: free to take your own data from experiment to a fine-tuned model, in one file." | GitHub repo page, star count, Georgian AI Lab logo. |

---

## Word count check

~155 words of narration ÷ ~150 words/minute ≈ 62 seconds — trim the last line if the generated voiceover runs long.
