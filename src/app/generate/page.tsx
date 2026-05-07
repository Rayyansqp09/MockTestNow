"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, Settings, Play, Type } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type InputMode = "pyq" | "notes" | "paste";

export default function GenerateMockTest() {
  const router = useRouter();
  const [mode, setMode] = useState<InputMode>("pyq");
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock processing delay before redirecting to exam interface
    setTimeout(() => {
      router.push("/exam");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Mock Test</h1>
        <p className="text-foreground/70">Configure your parameters and generate a production-ready exam simulation.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Input Method */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="text-primary" /> Input Source
            </h2>
            
            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl mb-6">
              {[
                { id: "pyq", label: "PYQ PDF", icon: <FileText className="w-4 h-4" /> },
                { id: "notes", label: "Study Notes", icon: <UploadCloud className="w-4 h-4" /> },
                { id: "paste", label: "Paste Text", icon: <Type className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setMode(tab.id as InputMode)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all",
                    mode === tab.id 
                      ? "bg-white dark:bg-slate-700 shadow-sm text-primary" 
                      : "text-foreground/70 hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700/50"
                  )}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <div className="min-h-[300px] border-2 border-dashed border-border/60 rounded-xl flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/20 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors cursor-pointer group">
              {mode === "paste" ? (
                <div className="w-full h-full p-4">
                  <textarea 
                    className="w-full h-full min-h-[260px] bg-transparent resize-none outline-none text-sm p-4 placeholder:text-foreground/40"
                    placeholder="Paste your questions, options, and answers here...&#10;&#10;Example:&#10;Q1. What is the capital of France?&#10;A) London&#10;B) Berlin&#10;C) Paris&#10;D) Madrid&#10;Answer: C"
                  ></textarea>
                </div>
              ) : (
                <div className="text-center p-6 pointer-events-none">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Click to upload or drag and drop</h3>
                  <p className="text-sm text-foreground/60 mb-4">PDF documents only (Max 20MB)</p>
                  <span className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">Browse Files</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="space-y-6">
          <form onSubmit={handleGenerate} className="glass-card p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Settings className="text-primary" /> Exam Settings
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">Exam Pattern</label>
                <select className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary rounded-lg px-3 py-2.5 text-sm outline-none transition-colors">
                  <option>JEE Main Pattern</option>
                  <option>NEET Pattern</option>
                  <option>UPSC Prelims</option>
                  <option>CUET</option>
                  <option>Custom Pattern</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Questions</label>
                  <input type="number" defaultValue={50} className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary rounded-lg px-3 py-2.5 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Time (Mins)</label>
                  <input type="number" defaultValue={60} className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary rounded-lg px-3 py-2.5 text-sm outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">+ Marks</label>
                  <input type="number" defaultValue={4} className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary rounded-lg px-3 py-2.5 text-sm outline-none text-green-600 font-semibold" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">- Marks</label>
                  <input type="number" defaultValue={-1} className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary rounded-lg px-3 py-2.5 text-sm outline-none text-red-600 font-semibold" />
                </div>
              </div>

              {mode === "notes" && (
                <div>
                  <label className="block text-sm font-medium mb-1.5">Difficulty Level</label>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    {["Easy", "Medium", "Hard"].map(lvl => (
                      <button type="button" key={lvl} className="flex-1 py-1.5 text-xs font-medium rounded-md hover:bg-slate-200 dark:hover:bg-slate-700">
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <hr className="border-border" />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    Start Generating
                  </>
                )}
              </button>
              <p className="text-xs text-center text-foreground/50">Requires 1 AI Credit</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
