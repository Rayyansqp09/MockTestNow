"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, FileText, Upload, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center lg:pt-32">
        {/* Background Gradients */}
        <div className="absolute top-0 -translate-y-12 left-1/2 -translate-x-1/2 w-full max-w-3xl aspect-[1/1] pointer-events-none -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 blur-[100px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8"
        >
          <Zap className="h-4 w-4" />
          <span>Next-Gen AI Mock Tests are here</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6"
        >
          Generate Mock Tests <br className="hidden md:block" />
          <span className="text-gradient">Instantly from Any PDF</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/70 mb-10"
        >
          Upload your PYQs or study material, and our AI will create a production-quality, real-exam simulation in seconds. Practice smarter, not harder.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/generate"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all"
          >
            Generate Mock Test
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="#demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-foreground border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            Try Demo
          </Link>
        </motion.div>

        {/* Dashboard Preview Image / Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative mx-auto w-full max-w-5xl rounded-2xl glass-card overflow-hidden border-border/50"
        >
          <div className="absolute top-0 left-0 w-full h-12 bg-slate-100/50 dark:bg-slate-800/50 border-b border-border/50 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
          </div>
          <div className="pt-16 pb-8 px-8 bg-slate-50/50 dark:bg-slate-900/50 aspect-video flex items-center justify-center">
            {/* Minimal Mockup Representation */}
            <div className="w-full h-full border border-dashed border-border/80 rounded-xl flex flex-col items-center justify-center text-foreground/40 gap-4">
              <BrainCircuit className="h-16 w-16 opacity-50" />
              <p className="text-lg font-medium">Exam Interface Preview Loading...</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full bg-white dark:bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">3 Ways to Generate Tests</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our intelligent engine adapts to your study material to create the perfect mock test environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileText />}
              title="Upload PYQ PDF"
              description="Extract exact questions from Previous Year Question PDFs, preserving the original pattern and options."
            />
            <FeatureCard
              icon={<BookOpen />}
              title="Upload Topic Notes"
              description="AI summarizes concepts from your study material and generates fresh MCQs across multiple difficulty levels."
            />
            <FeatureCard
              icon={<Upload />}
              title="Manual Paste Mode"
              description="Simply paste questions and answers. The system instantly converts it into a digital mock test interface."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300">
      <div className="bg-primary/10 text-primary w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-foreground/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
