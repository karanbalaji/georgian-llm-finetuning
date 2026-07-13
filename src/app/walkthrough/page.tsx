"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Layers,
  Terminal,
  ExternalLink,
  BookOpen,
  FileCode,
  AlertTriangle,
  Lightbulb
} from "lucide-react";

// Custom SVG components for brand/social icons since they aren't exported in this version of lucide-react
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Fade in animation helper per design.md guidelines
function FadeIn({
  children,
  delay = 0,
  y = 16,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// Copy-to-clipboard code helper
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group/code font-mono text-xs text-navy bg-surface-1/90 rounded-lg p-4 border border-border mt-2 overflow-x-auto">
      <pre className="pr-12 whitespace-pre-wrap">{code}</pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-1.5 rounded-md border border-border bg-white text-muted-foreground hover:text-primary hover:shadow-primary-sm transition-all"
        title="Copy to clipboard"
      >
        {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  );
}

export default function WalkthroughPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("quickstart");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const stepsQuickstart = [
    {
      num: 1,
      title: "Clone the Toolkit & Install Dependencies",
      desc: "Clone the repository and install the setup packages inside a Python virtual environment.",
      code: `git clone https://github.com/georgian-io/LLM-Finetuning-Toolkit.git
cd LLM-Finetuning-Toolkit
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt`
    },
    {
      num: 2,
      title: "Prepare Your Dataset",
      desc: "Format your training data as JSON Lines (.jsonl). Point the config file to your local path.",
      code: `# File: data/my_dataset.jsonl
{"prompt": "Classify ticket: Screen flickering", "completion": "Hardware"}
{"prompt": "Classify ticket: Password reset failed", "completion": "Auth"}`
    },
    {
      num: 3,
      title: "Run the Fine-Tuning Job",
      desc: "Execute the command line wrapper pointing to the default configuration. LoRA hyperparameters are preset.",
      code: `python -m finetune_toolkit.cli --config configs/phi3_lora.yaml --dataset data/my_dataset.jsonl`
    },
    {
      num: 4,
      title: "Export Optimized Weights",
      desc: "Merge the learned LoRA adapters back into base parameters and quantize to GGUF or 4-bit AWQ formats.",
      code: `python -m finetune_toolkit.export --adapter outputs/checkpoint-final --format gguf --output model_quantized.gguf`
    },
    {
      num: 5,
      title: "Deploy to Render",
      desc: "This is the hero deployment step. Click the button to launch a pre-configured serving endpoint hosted on Render. It runs the llama.cpp server blueprint automatically without GPU dependencies.",
      component: (
        <div className="mt-4 pt-2">
          <Link
            href="https://render.com/deploy?repo=https://github.com/georgian-io/LLM-Finetuning-Toolkit"
            target="_blank"
            className="inline-flex"
          >
            <Button className="rounded-full bg-primary hover:bg-primary/95 text-white font-medium text-sm px-8 py-5 shadow-primary-sm hover:shadow-primary-md hover:-translate-y-0.5 transition-all">
              <Layers className="size-4 mr-2" /> Deploy to Render
            </Button>
          </Link>
          <span className="block text-[11px] text-muted-foreground mt-2 italic">
            *Includes one-click blueprints configuration template for Phi-3 (GGUF).
          </span>
        </div>
      )
    },
    {
      num: 6,
      title: "Verify the Server Endpoint",
      desc: "Execute a mock curl check against your active Render web service URL to verify latency and model outputs.",
      code: `curl https://your-model-service.onrender.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{"messages": [{"role": "user", "content": "Classify: App crashes on boot"}]}'`
    }
  ];

  const stepsAdvanced = [
    {
      num: 1,
      title: "Register a Custom Base Model",
      desc: "Quantize any custom HuggingFace base model weights to 4-bit precision to fit standard CPU deployment budgets.",
      code: `python -m finetune_toolkit.quantize \\
  --model-id meta-llama/Meta-Llama-3-8B-Instruct \\
  --precision 4bit \\
  --output ./quantized_llama`
    },
    {
      num: 2,
      title: "Configure Custom LoRA Layers",
      desc: "Customize target linear modules and attention projections inside the YAML configuration file.",
      code: `# configs/custom_lora.yaml
model:
  base_path: "./quantized_llama"
lora:
  r: 16
  alpha: 32
  target_modules: ["q_proj", "v_proj", "k_proj", "o_proj"]`
    },
    {
      num: 3,
      title: "Run Distributed Optimization",
      desc: "Run multi-GPU training if you have access to local compute rigs, or fallback to CPU offloaded training.",
      code: `accelerate launch -m finetune_toolkit.cli --config configs/custom_lora.yaml`
    },
    {
      num: 4,
      title: "Deploy Custom Container",
      desc: "Push your blueprint to a custom Docker container registry and link it directly inside Render dashboard.",
      component: (
        <div className="mt-4 pt-2">
          <Link
            href="https://render.com/deploy?repo=https://github.com/georgian-io/LLM-Finetuning-Toolkit"
            target="_blank"
            className="inline-flex"
          >
            <Button className="rounded-full bg-primary hover:bg-primary/95 text-white font-medium text-sm px-8 py-5 shadow-primary-sm hover:shadow-primary-md hover:-translate-y-0.5 transition-all">
              <Layers className="size-4 mr-2" /> Deploy Custom Blueprint
            </Button>
          </Link>
        </div>
      )
    }
  ];

  const troubleshootingItems = [
    {
      q: "Out of Memory (OOM) errors during optimization",
      a: "If your training run crashes with a GPU or CPU allocation failure, verify your YAML config uses 4-bit quantization (QLoRA) and reduce the per_device_train_batch_size to 1. Enabling gradient accumulation (steps=4) preserves effective batch sizes."
    },
    {
      q: "Hugging Face gates and restricted access models",
      a: "Certain models (e.g. Llama-3) require approval. Ensure you pass your HF token as an environment variable: export HF_TOKEN='your_token_here' before triggering CLI setup commands."
    },
    {
      q: "Render web service cold starts and health check failures",
      a: "Inference engines on free tiers might take 1–2 minutes to compile model loads on boot. To mitigate health check timeouts, update the initialDelaySeconds parameter inside render.yaml blueprint to 120."
    }
  ];

  return (
    <div className="bg-hero-gradient min-h-screen font-sans selection:bg-primary/20 selection:text-primary text-body">
      {/* Floating Pill Navigation */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl transition-all duration-300 ${
          scrolled
            ? "glass-panel p-2 shadow-primary-md border-white/40"
            : "bg-transparent p-4 border-transparent"
        } rounded-full`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors text-navy">
              <ArrowLeft className="size-4" />
              <span className="font-semibold text-sm tracking-tight hidden sm:inline-block">Back to Landing</span>
            </Link>
            <Separator orientation="vertical" className="h-4 bg-navy/10" />
            <span className="font-semibold text-navy text-sm tracking-tight">
              GEORGIAN<span className="text-primary font-accent italic font-normal">.io</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-full text-muted-foreground border-border text-[10px] sm:text-xs">
              S1 Episode 1
            </Badge>
            <Link href="https://github.com/georgian-io/LLM-Finetuning-Toolkit" target="_blank">
              <Button variant="ghost" size="icon-sm" className="rounded-full">
                <GithubIcon className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Walkthrough Container */}
      <main className="pt-32 pb-20 px-6 sm:px-8 max-w-4xl mx-auto space-y-12">
        <FadeIn>
          <div className="space-y-3 text-center sm:text-left">
            <Badge variant="outline" className="rounded-full bg-primary/5 text-primary border-primary/20">
              Technical Documentation
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold text-navy tracking-tight leading-tight">
              Walkthrough:{" "}
              <span className="font-accent italic font-normal text-primary">
                Fine-Tune &amp; Ship
              </span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl">
              Step-by-step instructions to optimize a small weights model locally and serve it as a production endpoint on Render.
            </p>
          </div>
        </FadeIn>

        <Separator />

        {/* Tab Selection */}
        <FadeIn delay={0.05}>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as string)} className="w-full">
            <div className="flex justify-center sm:justify-start mb-8">
              <TabsList className="bg-surface-1 border border-border p-1 rounded-full gap-1">
                <TabsTrigger value="quickstart" className="rounded-full px-5 py-2 text-xs font-semibold data-active:bg-white data-active:text-primary data-active:shadow-primary-sm transition-all cursor-pointer">
                  <Terminal className="size-3.5 mr-1" /> Quickstart (Phi-3 / CPU)
                </TabsTrigger>
                <TabsTrigger value="advanced" className="rounded-full px-5 py-2 text-xs font-semibold data-active:bg-white data-active:text-primary data-active:shadow-primary-sm transition-all cursor-pointer">
                  <Layers className="size-3.5 mr-1" /> Advanced (Llama-3 / Custom)
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Quickstart Tab */}
            <TabsContent value="quickstart" className="space-y-6 outline-none">
              {stepsQuickstart.map((step) => (
                <Card key={step.num} className="glass-panel border-white/50 bg-white/70 shadow-primary-sm hover:shadow-primary-md transition-all rounded-2xl p-2">
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                      {step.num}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-navy font-semibold text-base">{step.title}</CardTitle>
                      <CardDescription className="text-xs text-body/80 leading-relaxed font-sans">{step.desc}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-14">
                    {step.code && <CodeBlock code={step.code} />}
                    {step.component && step.component}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advanced" className="space-y-6 outline-none">
              {stepsAdvanced.map((step) => (
                <Card key={step.num} className="glass-panel border-white/50 bg-white/70 shadow-primary-sm hover:shadow-primary-md transition-all rounded-2xl p-2">
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <div className="size-8 rounded-full bg-primary-mid/10 text-primary-mid flex items-center justify-center font-bold text-sm shrink-0">
                      {step.num}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-navy font-semibold text-base">{step.title}</CardTitle>
                      <CardDescription className="text-xs text-body/80 leading-relaxed font-sans">{step.desc}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-14">
                    {step.code && <CodeBlock code={step.code} />}
                    {step.component && step.component}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </FadeIn>

        {/* Troubleshooting Collapsible */}
        <FadeIn delay={0.1}>
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-bold text-navy tracking-tight flex items-center gap-2">
              <AlertTriangle className="size-5 text-primary" /> Common Troubleshooting
            </h2>
            <div className="divide-y divide-border border border-border bg-white/50 rounded-2xl overflow-hidden glass-panel">
              {troubleshootingItems.map((item, idx) => {
                const isOpen = openFAQ === idx;
                return (
                  <div key={idx} className="transition-all">
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="w-full flex items-center justify-between p-5 text-left text-navy font-medium text-sm hover:bg-surface-2/40 transition-colors focus:outline-none"
                    >
                      <span className="flex items-center gap-2 font-sans font-semibold">
                        <Lightbulb className="size-4 text-gold" /> {item.q}
                      </span>
                      {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-xs text-body/90 leading-relaxed bg-surface-3/30 border-t border-border/40 font-sans">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Ecosystem Resources Footer */}
        <FadeIn delay={0.15}>
          <div className="glass-panel p-6 rounded-2xl border-white/40 shadow-primary-sm bg-white/40 space-y-4">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wider">Ecosystem Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
              <a
                href="https://github.com/georgian-io/LLM-Finetuning-Toolkit"
                target="_blank"
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-white hover:bg-surface-1/40 text-navy hover:text-primary transition-all"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="size-4" /> Toolkit GitHub Repository
                </span>
                <ExternalLink className="size-3.5" />
              </a>
              <a
                href="https://render.com/docs"
                target="_blank"
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-white hover:bg-surface-1/40 text-navy hover:text-primary transition-all"
              >
                <span className="flex items-center gap-2">
                  <Layers className="size-4" /> Render Deploy Blueprints Docs
                </span>
                <ExternalLink className="size-3.5" />
              </a>
              <a
                href="https://huggingface.co/models"
                target="_blank"
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-white hover:bg-surface-1/40 text-navy hover:text-primary transition-all"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="size-4" /> Base Weights Hub (HF)
                </span>
                <ExternalLink className="size-3.5" />
              </a>
              <a
                href="https://github.com/ggerganov/llama.cpp"
                target="_blank"
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-white hover:bg-surface-1/40 text-navy hover:text-primary transition-all"
              >
                <span className="flex items-center gap-2">
                  <FileCode className="size-4" /> Serving Engine (llama.cpp)
                </span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </FadeIn>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 text-center text-xs text-muted-foreground bg-surface-3/50 font-sans">
        <p className="mb-2">
          &copy; 2026 Georgian.io · Transferred Learnings Advocate Series. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
