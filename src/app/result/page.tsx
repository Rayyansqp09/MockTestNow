"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, MinusCircle, Target, Clock, Trophy, ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ResultPage() {
  // Mock Results Data
  const stats = {
    totalMarks: 300,
    securedMarks: 185,
    accuracy: 75,
    attempted: 60,
    correct: 45,
    incorrect: 15,
    unattempted: 15,
    totalQuestions: 75,
    timeTaken: "45:20"
  };

  const getAccuracyColor = (acc: number) => {
    if (acc >= 80) return "text-emerald-500";
    if (acc >= 50) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Performance Report</h1>
          <p className="text-foreground/70">JEE Main Mock Test 1 • Completed 2 mins ago</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard" className="px-5 py-2.5 rounded-lg font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/generate" className="px-5 py-2.5 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-md">
            <RotateCcw className="w-4 h-4" /> Reattempt
          </Link>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          icon={<Trophy className="w-6 h-6 text-yellow-500" />} 
          title="Total Score" 
          value={`${stats.securedMarks} / ${stats.totalMarks}`}
          highlight="top 15% of users"
        />
        <StatCard 
          icon={<Target className={cn("w-6 h-6", getAccuracyColor(stats.accuracy))} />} 
          title="Accuracy" 
          value={`${stats.accuracy}%`}
          highlight="Needs improvement in Physics"
        />
        <StatCard 
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-500" />} 
          title="Attempted" 
          value={`${stats.attempted} / ${stats.totalQuestions}`}
          highlight={`${stats.correct} Correct, ${stats.incorrect} Wrong`}
        />
        <StatCard 
          icon={<Clock className="w-6 h-6 text-blue-500" />} 
          title="Time Taken" 
          value={stats.timeTaken}
          highlight="Avg 45s per question"
        />
      </div>

      {/* Main Analysis Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Col: Subject breakdown & charts */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold text-lg mb-6">Subject Analysis</h3>
            <div className="space-y-5">
              <SubjectProgress name="Physics" correct={12} total={25} color="bg-blue-500" />
              <SubjectProgress name="Chemistry" correct={18} total={25} color="bg-purple-500" />
              <SubjectProgress name="Mathematics" correct={15} total={25} color="bg-amber-500" />
            </div>
          </div>

          <div className="glass-card p-6 bg-primary/5 border-primary/20">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">AI Recommendation</h3>
                <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                  Your accuracy in Physics (Mechanics) is below average. We recommend generating a specific topic test for <strong>Rotational Motion</strong>.
                </p>
                <button className="text-sm font-bold text-primary hover:underline">
                  Generate Topic Test →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Detailed Question Review */}
        <div className="lg:col-span-2">
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-border bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
              <h3 className="font-bold text-lg">Detailed Solution Review</h3>
              <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm px-3 py-1.5 outline-none">
                <option>All Questions</option>
                <option>Incorrect Only</option>
                <option>Unattempted</option>
              </select>
            </div>

            <div className="divide-y divide-border">
              <ReviewQuestion 
                num={1} 
                status="correct"
                question="Which of the following is the most effective way to optimize React application performance?"
                userAnswer="B) Implementing shouldComponentUpdate or React.memo"
                correctAnswer="B) Implementing shouldComponentUpdate or React.memo"
                explanation="React.memo is a higher order component that memorizes the rendered output of the wrapped component preventing unnecessary renders."
              />
              <ReviewQuestion 
                num={2} 
                status="incorrect"
                question="In Next.js 14 App Router, what is the primary purpose of the 'use client' directive?"
                userAnswer="B) To force the component to only run on the server"
                correctAnswer="A) To mark a component as a Client Component"
                explanation="The 'use client' directive marks the boundary between the server and client component modules. It allows you to use React state and hooks."
              />
              <ReviewQuestion 
                num={3} 
                status="unattempted"
                question="What does CSS property 'backdrop-filter: blur()' achieve in glassmorphism design?"
                userAnswer="Not Attempted"
                correctAnswer="B) It blurs the area behind the element"
                explanation="Backdrop-filter applies graphical effects such as blurring or color shifting to the area behind an element. It requires a semi-transparent background color to be visible."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, highlight }: any) {
  return (
    <div className="glass-card p-6 flex items-start gap-4">
      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-foreground/60 font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold mb-1">{value}</h3>
        <p className="text-xs text-foreground/50">{highlight}</p>
      </div>
    </div>
  );
}

function SubjectProgress({ name, correct, total, color }: any) {
  const percentage = Math.round((correct / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm font-medium mb-2">
        <span>{name}</span>
        <span className="text-foreground/60">{correct}/{total} ({percentage}%)</span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-1000", color)} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

function ReviewQuestion({ num, status, question, userAnswer, correctAnswer, explanation }: any) {
  const isCorrect = status === "correct";
  const isWrong = status === "incorrect";
  
  return (
    <div className="p-6 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50">
      <div className="flex gap-4 items-start mb-4">
        <div className="shrink-0 mt-1">
          {isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
          {isWrong && <XCircle className="w-6 h-6 text-red-500" />}
          {status === "unattempted" && <MinusCircle className="w-6 h-6 text-slate-400" />}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-foreground/60">Q{num}.</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-foreground/70 font-medium">Single Choice</span>
          </div>
          <h4 className="font-medium text-lg mb-4">{question}</h4>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className={cn(
              "p-3 rounded-lg border text-sm",
              isCorrect ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800" : 
              isWrong ? "bg-red-50/50 border-red-200 dark:bg-red-900/20 dark:border-red-800" :
              "bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700"
            )}>
              <span className="block text-xs font-semibold mb-1 opacity-70">Your Answer:</span>
              {userAnswer}
            </div>
            
            {(!isCorrect) && (
              <div className="p-3 rounded-lg border bg-emerald-50/50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 text-sm">
                <span className="block text-xs font-semibold mb-1 opacity-70">Correct Answer:</span>
                {correctAnswer}
              </div>
            )}
          </div>

          <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl text-sm">
            <div className="font-bold flex items-center gap-2 mb-2 text-primary">
              <Target className="w-4 h-4" /> AI Explanation
            </div>
            <p className="text-foreground/80 leading-relaxed">{explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
