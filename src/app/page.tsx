"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResearchCitation } from "@/components/ResearchCitation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Sparkles,
  CheckCircle,
  Layers,
  Cpu
} from "lucide-react";

// Custom SVG components for brand/social icons since they aren't exported in this version of lucide-react
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
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

export default function EpisodeLandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", github: "", track: "router-support" });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API registration
    setRegisterSuccess(true);
  };

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
            <span className="font-semibold text-navy text-lg tracking-tight">
              GEORGIAN<span className="text-primary font-accent italic font-normal">.io</span>
            </span>
            <Separator orientation="vertical" className="h-4 bg-navy/10 hidden sm:block" />
            <Badge variant="outline" className="rounded-full bg-surface-2 text-primary border-primary/20 text-xs py-0.5 px-2.5 hidden sm:inline-flex">
              Builder Series · S1
            </Badge>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-body/80">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#agenda" className="hover:text-primary transition-colors">Agenda</a>
            <a href="#hosts" className="hover:text-primary transition-colors">Hosts</a>
            <a href="#toolkit" className="hover:text-primary transition-colors">Toolkit</a>
            <a href="#recap" className="hover:text-primary transition-colors">Recap</a>
          </nav>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-full text-muted-foreground border-border text-[10px] sm:text-xs">
              Supported by Render
            </Badge>
            <Dialog>
              <DialogTrigger render={<Button className="rounded-full bg-primary text-white text-xs font-semibold px-4 py-1.5 shadow-primary-sm hover:shadow-primary-md hover:bg-primary/95 transition-all" />}>
                Register
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-2xl glass-panel">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-navy">
                    Join the{" "}
                    <span className="font-accent italic font-normal text-primary">
                      Challenge
                    </span>
                  </DialogTitle>
                  <DialogDescription className="text-body/80">
                    Register for the Season 1, Episode 1 build challenge. Teams of 1–3 builders are supported.
                  </DialogDescription>
                </DialogHeader>

                {registerSuccess ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                    <CheckCircle className="size-16 text-primary animate-bounce" />
                    <h3 className="text-lg font-semibold text-navy">You&rsquo;re Registered!</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      We have sent the kickoff details, Discord invite, and $50 Render credit instructions to your email.
                    </p>
                    <Button onClick={() => setRegisterSuccess(false)} variant="outline" className="rounded-full mt-4">
                      Close
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4 py-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-navy">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Karan Balaji"
                        className="w-full px-3.5 py-2 border border-border rounded-lg text-sm bg-white/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-navy">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="builder@georgian.io"
                        className="w-full px-3.5 py-2 border border-border rounded-lg text-sm bg-white/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-navy">GitHub / Portfolio URL</label>
                      <input
                        required
                        type="url"
                        placeholder="https://github.com/username"
                        className="w-full px-3.5 py-2 border border-border rounded-lg text-sm bg-white/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-navy">Router Use Case</label>
                      <select
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={formData.track}
                        onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      >
                        <option value="router-support">Local-First Router — Support Tickets</option>
                        <option value="router-docs">Local-First Router — Internal Docs</option>
                        <option value="router-code">Local-First Router — Code Review</option>
                        <option value="byoc">Bring Your Own Use Case</option>
                      </select>
                    </div>

                    <DialogFooter className="pt-4">
                      <Button type="submit" className="w-full rounded-full bg-primary hover:bg-primary/95 text-white">
                        Confirm Registration
                      </Button>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.3fr] gap-12 lg:gap-16 items-center">
        <div className="flex flex-col items-start text-left space-y-6">
          <FadeIn>
            <Badge variant="outline" className="rounded-full bg-primary/5 text-primary border-primary/20 text-xs py-1 px-4 font-semibold uppercase tracking-wider">
              Builder Series · Season 1 · Episode 1
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy tracking-tight leading-[1.1]">
              Fine-Tune &{" "}
              <span className="font-accent italic font-normal text-primary">
                Ship
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-lg sm:text-xl text-body/90 font-normal leading-relaxed">
              Fine-tune high-efficiency local models using Georgian&rsquo;s open-source toolkit,
              deploy them in one-click on Render, and showcase your production builds to top-tier startups.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-2.5">
              <Badge className="bg-surface-1 text-navy border-border hover:bg-surface-1 py-1 px-3 rounded-full text-xs font-medium">
                $4,000 Render Credits
              </Badge>
              <Badge className="bg-surface-1 text-navy border-border hover:bg-surface-1 py-1 px-3 rounded-full text-xs font-medium">
                Team size: 1–3
              </Badge>
              <Badge className="bg-surface-1 text-navy border-border hover:bg-surface-1 py-1 px-3 rounded-full text-xs font-medium">
                Any Base Model
              </Badge>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
              <Dialog>
                <DialogTrigger render={<Button className="rounded-full bg-primary hover:bg-primary/95 text-white font-medium text-sm px-8 py-5 shadow-primary-sm hover:shadow-primary-md hover:-translate-y-0.5 transition-all" />}>
                  Register Now <ArrowRight className="size-4 ml-1" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-2xl glass-panel">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-navy">
                      Join the{" "}
                      <span className="font-accent italic font-normal text-primary">
                        Challenge
                      </span>
                    </DialogTitle>
                    <DialogDescription className="text-body/80">
                      Register for the Season 1, Episode 1 build challenge. Teams of 1–3 builders are supported.
                    </DialogDescription>
                  </DialogHeader>

                  {registerSuccess ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                      <CheckCircle className="size-16 text-primary animate-bounce" />
                      <h3 className="text-lg font-semibold text-navy">You&rsquo;re Registered!</h3>
                      <p className="text-sm text-muted-foreground max-w-xs">
                        We have sent the kickoff details, Discord invite, and $50 Render credit instructions to your email.
                      </p>
                      <Button onClick={() => setRegisterSuccess(false)} variant="outline" className="rounded-full mt-4">
                        Close
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4 py-2">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-navy">Full Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Karan Balaji"
                          className="w-full px-3.5 py-2 border border-border rounded-lg text-sm bg-white/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-navy">Email Address</label>
                        <input
                          required
                          type="email"
                          placeholder="builder@georgian.io"
                          className="w-full px-3.5 py-2 border border-border rounded-lg text-sm bg-white/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-navy">GitHub / Portfolio URL</label>
                        <input
                          required
                          type="url"
                          placeholder="https://github.com/username"
                          className="w-full px-3.5 py-2 border border-border rounded-lg text-sm bg-white/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          value={formData.github}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-navy">Router Use Case</label>
                        <select
                          className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          value={formData.track}
                          onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                        >
                          <option value="router-support">Local-First Router — Support Tickets</option>
                          <option value="router-docs">Local-First Router — Internal Docs</option>
                          <option value="router-code">Local-First Router — Code Review</option>
                          <option value="byoc">Bring Your Own Use Case</option>
                        </select>
                      </div>

                      <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full rounded-full bg-primary hover:bg-primary/95 text-white">
                          Confirm Registration
                        </Button>
                      </DialogFooter>
                    </form>
                  )}
                </DialogContent>
              </Dialog>

              <Link href="/walkthrough" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full rounded-full border-primary/20 text-primary hover:bg-primary/5 font-medium text-sm px-8 py-5 transition-all">
                  View Walkthrough
                </Button>
              </Link>

              {/* Single highest priority secondary CTA per design system - Gold */}
              <Link href="/pitch" className="w-full sm:w-auto">
                <Button className="w-full rounded-full bg-gold hover:bg-gold/90 text-navy font-semibold text-sm px-8 py-5 shadow-primary-sm hover:shadow-primary-md transition-all">
                  View the Pitch Deck
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* The flagship track, surfaced where a first-time visitor actually decides whether to care */}
          <FadeIn delay={0.3}>
            <ResearchCitation
              href="https://scalingintelligence.stanford.edu/pubs/ipw/"
              label="The flagship track: the local-first router"
            >
              A{" "}
              <a
                href="https://scalingintelligence.stanford.edu/pubs/ipw/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                Stanford study
              </a>{" "}
              found <strong>71.3% of real-world ChatGPT queries</strong>{" "}could be accurately answered by a small, local model instead of a frontier API. Builders fine-tune and ship the classifier that makes that 71.3% cheap, fast, and private.
            </ResearchCitation>
          </FadeIn>
        </div>

        {/* Real explainer video — Georgian's LLM Fine-Tuning Toolkit, uploaded to YouTube */}
        <FadeIn delay={0.2}>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-primary-md bg-navy">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube-nocookie.com/embed/hpWoxb3aBAo?cc_load_policy=1&modestbranding=1&rel=0"
              title="Georgian LLM Fine-Tuning Toolkit — Explainer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground text-center">
            How Georgian&rsquo;s LLM Fine-Tuning Toolkit works, in under 2 minutes —{" "}
            <Link href="/walkthrough" className="text-primary font-medium hover:underline">
              try it live →
            </Link>
          </p>
        </FadeIn>
        </div>

        {/* Event Metadata Bar */}
        <FadeIn delay={0.35}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mx-auto glass-panel p-6 mt-14 rounded-2xl border-white/40 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex flex-col items-center justify-center p-3">
              <Calendar className="size-5 text-primary mb-2" />
              <span className="text-xs text-muted-foreground">Kickoff Day</span>
              <span className="text-sm font-semibold text-navy">September 24, 2026</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3">
              <MapPin className="size-5 text-primary mb-2" />
              <span className="text-xs text-muted-foreground">Format</span>
              <span className="text-sm font-semibold text-navy">Toronto (In-person) &amp; Virtual</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3">
              <Clock className="size-5 text-primary mb-2" />
              <span className="text-xs text-muted-foreground">Challenge Period</span>
              <span className="text-sm font-semibold text-navy">8-Week Guided Timeline</span>
            </div>
          </div>
        </FadeIn>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-10 border-y border-border/60 bg-surface-4/45">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center md:text-left">
              Co-hosted &amp; Sponsored by
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold font-serif italic">G</div>
                <span className="font-semibold text-navy text-sm tracking-tight">Georgian AI Lab</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="size-5 text-primary" />
                <span className="font-semibold text-navy text-sm">Render</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="size-5 text-primary" />
                <span className="font-semibold text-navy text-sm">Vector Institute</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Episode (Hosts) */}
      <section id="hosts" className="py-20 px-6 sm:px-8 bg-surface-3/30">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="rounded-full">Mentors</Badge>
            <h2 className="text-3xl font-bold text-navy tracking-tight">
              Behind the{" "}
              <span className="font-accent italic font-normal text-primary">
                Episode
              </span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">
              Learn from and build directly with core platform engineers and researchers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Host 1 — Karan Balaji */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-panel p-6 rounded-2xl shadow-primary-sm hover:shadow-primary-md border-white/50 bg-white/70 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Image
                  src="/images/karan-balaji.jpeg"
                  alt="Karan Balaji"
                  width={64}
                  height={64}
                  className="size-16 rounded-full object-cover border border-primary/20"
                />
                <div>
                  <h3 className="text-lg font-semibold text-navy">Karan Balaji</h3>
                  <p className="text-xs text-primary font-medium font-sans">Co-host</p>
                </div>
                <p className="text-sm text-body/90 leading-relaxed font-sans">
                  Built this season&rsquo;s prototype end-to-end — a real LoRA fine-tune, GGUF export pipeline, and Render deployment — for this case study.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-border/60 mt-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <LinkedinIcon className="size-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <GithubIcon className="size-4" />
                </a>
              </div>
            </motion.div>

            {/* Host 2 — Azin Asgarian */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-panel p-6 rounded-2xl shadow-primary-sm hover:shadow-primary-md border-white/50 bg-white/70 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Image
                  src="/images/azin.png"
                  alt="Azin Asgarian"
                  width={64}
                  height={64}
                  className="size-16 rounded-full object-cover border border-primary-mid/20"
                />
                <div>
                  <h3 className="text-lg font-semibold text-navy">Azin Asgarian</h3>
                  <p className="text-xs text-primary font-medium font-sans">AI Technical Lead, Georgian AI Lab</p>
                </div>
                <p className="text-sm text-body/90 leading-relaxed font-sans">
                  Leads applied AI research with Georgian&rsquo;s portfolio companies. Has spoken publicly on transfer learning — the model this series is named for.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-border/60 mt-6">
                <a href="https://www.linkedin.com/in/azin-asgarian-08175a120/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <LinkedinIcon className="size-4" />
                </a>
              </div>
            </motion.div>

            {/* Host 3 — Paul Inder */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-panel p-6 rounded-2xl shadow-primary-sm hover:shadow-primary-md border-white/50 bg-white/70 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Image
                  src="/images/paul-inder.jpeg"
                  alt="Paul Inder"
                  width={64}
                  height={64}
                  className="size-16 rounded-full object-cover border border-gold/40"
                />
                <div>
                  <h3 className="text-lg font-semibold text-navy">Paul Inder</h3>
                  <p className="text-xs text-primary font-medium font-sans">AI Technical Lead, Georgian</p>
                </div>
                <p className="text-sm text-body/90 leading-relaxed font-sans">
                  Builds applied ML systems at Georgian, with prior experience shipping AI-driven products at ideal.com and Ceridian.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-border/60 mt-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <LinkedinIcon className="size-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Timeline + Kickoff Day Agenda */}
      <section id="agenda" className="py-20 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="rounded-full">Schedule</Badge>
            <h2 className="text-3xl font-bold text-navy tracking-tight">
              The 8-Week{" "}
              <span className="font-accent italic font-normal text-primary">
                Program
              </span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">
              Two in-person evenings bookend a self-directed build window — not an 8-week-long event.
            </p>
          </div>

          {/* Full program timeline: Launch -> Build -> Judge -> Ship */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass-panel border-white/40 shadow-primary-sm hover:shadow-primary-md transition-all rounded-2xl bg-white/50">
              <CardHeader className="pb-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 w-fit rounded-full text-[10px] font-semibold py-0.5">
                  Week 1 · Launch
                </Badge>
                <CardTitle className="text-navy font-semibold text-base mt-2">In-Person Kickoff</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-body/90 leading-relaxed font-sans">
                  ~4hrs at Georgian&rsquo;s Toronto office. Hands-on walkthrough of the fine-tuning toolkit → Render deploy pipeline, co-hosted by AI Lab + Render engineers.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/40 shadow-primary-sm hover:shadow-primary-md transition-all rounded-2xl bg-white/50">
              <CardHeader className="pb-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 w-fit rounded-full text-[10px] font-semibold py-0.5">
                  Weeks 2–6 · Build
                </Badge>
                <CardTitle className="text-navy font-semibold text-base mt-2">Self-Directed Build</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-body/90 leading-relaxed font-sans">
                  Fine-tune and deploy on your own time. Weekly office hours + Discord support from AI Lab and Render engineers. Submissions close end of week 6.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/40 shadow-primary-sm hover:shadow-primary-md transition-all rounded-2xl bg-white/50">
              <CardHeader className="pb-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 w-fit rounded-full text-[10px] font-semibold py-0.5">
                  Week 7 · Judge
                </Badge>
                <CardTitle className="text-navy font-semibold text-base mt-2">Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-body/90 leading-relaxed font-sans">
                  Georgian AI Lab + Render engineers score submissions: technical execution, creativity of use case, and deployment quality.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/40 shadow-primary-sm hover:shadow-primary-md transition-all rounded-2xl bg-white/50">
              <CardHeader className="pb-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 w-fit rounded-full text-[10px] font-semibold py-0.5">
                  Week 8 · Ship
                </Badge>
                <CardTitle className="text-navy font-semibold text-base mt-2">Demo Day</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-body/90 leading-relaxed font-sans">
                  ~4hrs, in-person. Live showcase, winners announced, deployed submissions go live. Top performers fast-tracked into Render&rsquo;s interview pipeline.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Kickoff day detail */}
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Week 1, in detail</span>
              <h3 className="text-xl font-bold text-navy tracking-tight">Kickoff Day Agenda</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <Card className="glass-panel border-white/40 shadow-primary-sm hover:shadow-primary-md transition-all rounded-2xl bg-white/50">
                <CardHeader className="pb-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 w-fit rounded-full text-[10px] font-semibold py-0.5">
                    18:00 - 18:30 EST
                  </Badge>
                  <CardTitle className="text-navy font-semibold text-base mt-2">Kickoff &amp; Intros</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-body/90 leading-relaxed font-sans">
                    Welcome notes, community alignment, and activation instructions for the $50 Render credit wallets.
                  </p>
                </CardContent>
              </Card>

              {/* Card 2 */}
              <Card className="glass-panel border-white/40 shadow-primary-sm hover:shadow-primary-md transition-all rounded-2xl bg-white/50">
                <CardHeader className="pb-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 w-fit rounded-full text-[10px] font-semibold py-0.5">
                    18:30 - 19:15 EST
                  </Badge>
                  <CardTitle className="text-navy font-semibold text-base mt-2">Toolkit Walkthrough</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-body/90 leading-relaxed font-sans">
                    Deep-dive into the LLM Fine-Tuning Toolkit. Pointing at weights, loading dataset slices, and quantization options.
                  </p>
                </CardContent>
              </Card>

              {/* Card 3 */}
              <Card className="glass-panel border-white/40 shadow-primary-sm hover:shadow-primary-md transition-all rounded-2xl bg-white/50">
                <CardHeader className="pb-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 w-fit rounded-full text-[10px] font-semibold py-0.5">
                    19:15 - 20:00 EST
                  </Badge>
                  <CardTitle className="text-navy font-semibold text-base mt-2">Render Deploy Demo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-body/90 leading-relaxed font-sans">
                    One-click blueprints deployment demonstration. Setting up static endpoints and scaling without GPUs.
                  </p>
                </CardContent>
              </Card>

              {/* Card 4 */}
              <Card className="glass-panel border-white/40 shadow-primary-sm hover:shadow-primary-md transition-all rounded-2xl bg-white/50">
                <CardHeader className="pb-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 w-fit rounded-full text-[10px] font-semibold py-0.5">
                    20:00 - 20:30 EST
                  </Badge>
                  <CardTitle className="text-navy font-semibold text-base mt-2">Office Hours Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-body/90 leading-relaxed font-sans">
                    Interactive Q&amp;A session, team matching finalization, and booking mentor office hours slot list.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit & Ecosystem */}
      <section id="toolkit" className="py-20 px-6 sm:px-8 bg-surface-2/40 border-t border-border/55">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="rounded-full">Resources</Badge>
            <h2 className="text-3xl font-bold text-navy tracking-tight">
              The Toolkit &amp;{" "}
              <span className="font-accent italic font-normal text-primary">
                Ecosystem
              </span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">
              Use verified tools and starter templates to accelerate model optimization and deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tool 1 */}
            <Card className="glass-panel border-white/40 shadow-primary-sm hover:shadow-primary-md transition-all rounded-2xl bg-white/60 p-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 mb-1.5 rounded-full font-semibold">
                    Core Tool
                  </Badge>
                  <CardTitle className="text-navy font-semibold text-lg">Georgian Fine-Tuning Toolkit</CardTitle>
                </div>
                <Link href="https://github.com/georgian-io/LLM-Finetuning-Toolkit" target="_blank" className="text-muted-foreground hover:text-primary">
                  <GithubIcon className="size-5" />
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-body/80 leading-relaxed font-sans">
                  A high-performance pipeline for LoRA and QLoRA fine-tuning. Includes preconfigured templates for model quantization, sequence packing, and structured JSON output tasks.
                </p>
                <div className="font-mono text-xs bg-surface-1/90 rounded-lg p-3 text-navy select-all border border-border flex justify-between items-center">
                  <span>git clone https://github.com/georgian-io/LLM-Finetuning-Toolkit.git</span>
                </div>
              </CardContent>
            </Card>

            {/* Tool 2 */}
            <Card className="glass-panel border-white/40 shadow-primary-sm hover:shadow-primary-md transition-all rounded-2xl bg-white/60 p-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 mb-1.5 rounded-full font-semibold">
                    Deployment
                  </Badge>
                  <CardTitle className="text-navy font-semibold text-lg">Render Hosting Credits</CardTitle>
                </div>
                <Link href="https://render.com" target="_blank" className="text-muted-foreground hover:text-primary">
                  <ExternalLink className="size-5" />
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-body/80 leading-relaxed font-sans">
                  Hosted cloud endpoints for your optimized weights. The official blueprint deploys your model inside an inference worker (like HuggingFace TGI or vLLM) in seconds.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-surface-3 text-primary border-primary/20 rounded-md text-[10px]">
                    $50 Kickoff Voucher
                  </Badge>
                  <Badge className="bg-surface-3 text-primary border-primary/20 rounded-md text-[10px]">
                    No GPU Required for Phi-3
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recap & Gallery Mockup (Styled per spec) */}
      <section id="recap" className="py-20 px-6 sm:px-8 border-t border-border/55">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="rounded-full bg-gold/10 text-navy border-gold/30">Highlights</Badge>
            <h2 className="text-3xl font-bold text-navy tracking-tight">
              Event Recap &amp;{" "}
              <span className="font-accent italic font-normal text-primary">
                Gallery
              </span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">
              See what builders achieve during the challenge window.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Mock video frame */}
            <div className="lg:col-span-2 rounded-2xl border border-border bg-black/5 relative overflow-hidden flex flex-col justify-center items-center aspect-video shadow-primary-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent z-10" />
              <div className="z-20 text-center p-6 space-y-3 text-white max-w-sm">
                <span className="text-[10px] font-semibold tracking-wider text-gold uppercase bg-navy/60 px-3 py-1 rounded-full">
                  Preview Walkthrough Video
                </span>
                <h3 className="text-lg font-bold font-sans">Fine-Tune &amp; Ship Highlight Reel</h3>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  A synthesis of kickoff day, coding sprint sessions, and Demo Day presentations.
                </p>
                <Button className="rounded-full bg-primary hover:bg-primary/95 text-white text-xs mt-2 px-6 py-2.5">
                  Play Mock Clip
                </Button>
              </div>
            </div>

            {/* Mock photos list */}
            <div className="flex flex-col gap-4">
              <div className="flex-1 rounded-2xl border border-border bg-surface-1/40 p-5 flex flex-col justify-center relative overflow-hidden shadow-primary-sm">
                <div className="absolute top-4 right-4 bg-primary/10 text-primary border border-primary/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase font-sans">
                  Mockup Photo
                </div>
                <h4 className="text-navy font-semibold text-sm mb-1 font-sans">Toronto Launch Demo</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Builders gathered at the Toronto Hub finalizing dataset formatting files.
                </p>
              </div>
              <div className="flex-1 rounded-2xl border border-border bg-surface-1/40 p-5 flex flex-col justify-center relative overflow-hidden shadow-primary-sm">
                <div className="absolute top-4 right-4 bg-primary/10 text-primary border border-primary/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase font-sans">
                  Mockup Photo
                </div>
                <h4 className="text-navy font-semibold text-sm mb-1 font-sans">Final Submission Reviews</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Render platform team scoring deployments on criteria of latency and cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Show us what you built */}
      <section className="py-20 px-6 sm:px-8 bg-navy text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(38,68,217,0.15),transparent_50%)]" />
        <div className="max-w-xl mx-auto space-y-6 relative z-10 font-sans">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Launch something. Tag us for a{" "}
            <span className="font-accent italic font-normal text-gold">
              reshare.
            </span>
          </h2>
          <p className="text-sm text-white/80 leading-relaxed max-w-sm mx-auto">
            Ready to show your model? Publish your Render link and tag our handles to get featured.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Button variant="outline" className="rounded-full border-white/20 text-white bg-white/5 hover:bg-white/10 text-xs px-6">
              <TwitterIcon className="size-4 mr-1 text-white" /> Post on X
            </Button>
            <Button variant="outline" className="rounded-full border-white/20 text-white bg-white/5 hover:bg-white/10 text-xs px-6">
              <LinkedinIcon className="size-4 mr-1 text-white" /> Post on LinkedIn
            </Button>
            <Button variant="outline" className="rounded-full border-white/20 text-white bg-white/5 hover:bg-white/10 text-xs px-6">
              <Layers className="size-4 mr-1 text-white animate-pulse" /> Join Discord
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 text-center text-xs text-muted-foreground bg-surface-3/50 font-sans">
        <p className="mb-2">
          &copy; 2026 Georgian.io · Transferred Learnings Advocate Series. All Rights Reserved.
        </p>
        <p>
          Need support? Reach out in the <a href="#" className="underline hover:text-primary">Luma Event Page</a> or contact organizers.
        </p>
      </footer>
    </div>
  );
}
