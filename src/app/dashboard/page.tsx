"use client";

import { motion } from "framer-motion";
import { Plus, BookOpen, Clock, Activity, BarChart3, TrendingUp, Trophy } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Welcome back, John 👋</h1>
          <p className="text-foreground/60">Here's your preparation progress so far.</p>
        </div>
        <Link 
          href="/generate" 
          className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> New Mock Test
        </Link>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<BookOpen className="w-5 h-5" />} title="Tests Taken" value="12" />
        <StatCard icon={<Trophy className="w-5 h-5 text-yellow-500" />} title="Avg. Score" value="68%" />
        <StatCard icon={<Activity className="w-5 h-5 text-emerald-500" />} title="Accuracy" value="72%" />
        <StatCard icon={<TrendingUp className="w-5 h-5 text-blue-500" />} title="State Rank" value="#4,205" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Recent Tests List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Mock Tests</h2>
              <button className="text-sm text-primary font-semibold hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              <TestRow title="JEE Main Mock Test 1" date="Today, 10:30 AM" score="185/300" time="45m" status="completed" />
              <TestRow title="Physics: Rotational Motion" date="Yesterday" score="42/50" time="15m" status="completed" />
              <TestRow title="NEET Full Syllabus 2023 PYQ" date="12 May 2026" score="520/720" time="1h 50m" status="completed" />
              <TestRow title="Chemistry Organic Basics" date="10 May 2026" score="--/100" time="--m" status="paused" />
            </div>
          </div>
        </div>

        {/* Right Col: Performance Graph Mock & Weak Areas */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Performance Trend
            </h2>
            <div className="h-48 w-full border-b border-l border-border relative flex items-end justify-between px-2 pt-4 pb-1">
              {/* Mock Bar Chart */}
              {[40, 55, 45, 60, 72, 68, 80].map((h, i) => (
                <div key={i} className="w-8 bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-colors relative group" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}%
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-foreground/50 mt-2 px-2">
              <span>Test 1</span>
              <span>Test 7</span>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Weak Topics to Review</h2>
            <div className="space-y-3">
              <TopicTag name="Rotational Mechanics" subject="Physics" />
              <TopicTag name="Electromagnetism" subject="Physics" />
              <TopicTag name="Organic Reactions" subject="Chemistry" />
            </div>
            <button className="w-full mt-4 py-2 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary/20 transition-colors text-sm">
              Generate Remedial Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: any) {
  return (
    <div className="glass-card p-5 flex items-center gap-4">
      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-foreground/80">
        {icon}
      </div>
      <div>
        <p className="text-sm text-foreground/60 font-medium mb-0.5">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}

function TestRow({ title, date, score, time, status }: any) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-xl border border-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors gap-4">
      <div>
        <h4 className="font-bold mb-1">{title}</h4>
        <div className="flex items-center gap-3 text-xs text-foreground/60 font-medium">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {date}</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="font-bold">{score}</div>
          <div className="text-xs text-foreground/60">{time}</div>
        </div>
        <Link 
          href={status === "completed" ? "/result" : "/exam"} 
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition-colors"
        >
          {status === "completed" ? "Analysis" : "Resume"}
        </Link>
      </div>
    </div>
  );
}

function TopicTag({ name, subject }: any) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
      <span className="text-sm font-semibold">{name}</span>
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-border text-foreground/70">{subject}</span>
    </div>
  );
}
