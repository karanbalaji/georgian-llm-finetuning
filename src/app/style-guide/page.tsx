"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const colorSwatches: { name: string; token: string; hex: string }[] = [
  { name: "Primary", token: "bg-primary", hex: "#2644d9" },
  { name: "Primary Mid", token: "bg-primary-mid", hex: "#334dcc" },
  { name: "Navy", token: "bg-navy", hex: "#19224d" },
  { name: "Body", token: "bg-body", hex: "#292c3d" },
  { name: "Gold", token: "bg-gold", hex: "#e6c41a" },
  { name: "Muted FG", token: "bg-muted-foreground", hex: "#666e99" },
  { name: "Subtle", token: "bg-subtle", hex: "#7b819d" },
  { name: "Border", token: "bg-border", hex: "#d7daea" },
  { name: "Surface 1", token: "bg-surface-1", hex: "#f0f1f5" },
  { name: "Surface 2", token: "bg-surface-2", hex: "#f6f7fe" },
  { name: "Surface 3", token: "bg-surface-3", hex: "#f7f8fc" },
  { name: "Surface 4", token: "bg-surface-4", hex: "#f9f9fb" },
];

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function StyleGuidePage() {
  return (
    <div className="bg-hero-gradient min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-16">
        <FadeIn>
          <header className="space-y-3">
            <Badge variant="outline" className="rounded-full">
              Design System
            </Badge>
            <h1 className="text-4xl font-semibold text-navy">
              Georgian Brand{" "}
              <span className="font-accent italic font-normal text-primary">
                Style Guide
              </span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Live reference for the tokens documented in{" "}
              <code className="font-mono text-sm">/design.md</code> — verified
              against georgian.io&rsquo;s production CSS.
            </p>
          </header>
        </FadeIn>

        <Separator />

        {/* Colors */}
        <FadeIn delay={0.05}>
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy">Colors</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {colorSwatches.map((swatch, i) => (
                <motion.div
                  key={swatch.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    delay: i * 0.05,
                  }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="overflow-hidden py-0 gap-0">
                    <div
                      className="h-20 w-full"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <CardContent className="py-3 px-3">
                      <p className="text-sm font-medium text-body">
                        {swatch.name}
                      </p>
                      <p className="text-xs font-mono text-muted-foreground">
                        {swatch.hex}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeIn>

        <Separator />

        {/* Typography */}
        <FadeIn delay={0.05}>
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-navy">Typography</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-1">
                  Satoshi — Display / 700
                </p>
                <p className="text-5xl font-bold text-navy leading-tight">
                  Engineering Growth{" "}
                  <span className="font-accent italic font-normal text-primary">
                    Together
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-1">
                  Satoshi — Body / 400
                </p>
                <p className="text-base text-body max-w-lg">
                  Investing in six companies per year with an AI Lab that
                  works directly with your R&amp;D team.
                </p>
              </div>
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-1">
                  Zodiak — Accent italic / 500
                </p>
                <p className="font-accent italic text-2xl text-primary">
                  Fine-Tune &amp; Ship
                </p>
              </div>
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-1">
                  Mono — code / data
                </p>
                <p className="font-mono text-sm bg-surface-1 rounded-md px-3 py-2 inline-block">
                  pip install georgian-finetune-toolkit
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        <Separator />

        {/* Buttons */}
        <FadeIn delay={0.05}>
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy">Buttons</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button className="rounded-full shadow-primary-sm hover:shadow-primary-md">
                Register Now
              </Button>
              <Button
                variant="secondary"
                className="rounded-full"
              >
                AI Report
              </Button>
              <Button variant="outline" className="rounded-full">
                View Walkthrough
              </Button>
              <Button variant="ghost" className="rounded-full">
                Learn more
              </Button>
            </div>
          </section>
        </FadeIn>

        <Separator />

        {/* Glass panel */}
        <FadeIn delay={0.05}>
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy">
              Glass Panel + Motion
            </h2>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="glass-panel rounded-2xl p-6 max-w-md"
            >
              <Card className="border-none shadow-none bg-transparent py-0 gap-2">
                <CardHeader className="px-0">
                  <CardTitle className="text-navy">
                    Builder Series · S1 · Episode 1
                  </CardTitle>
                  <CardDescription>
                    Fine-tune a model with Georgian&rsquo;s toolkit, then
                    deploy it on Render.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 flex gap-2 flex-wrap">
                  <Badge className="rounded-full">Free Render Credits</Badge>
                  <Badge variant="outline" className="rounded-full">
                    Team size: 1–3
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
