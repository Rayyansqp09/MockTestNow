"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Flag, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Bookmark, Maximize2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_QUESTIONS = [
  {
    id: 1,
    type: "single",
    text: "Which of the following is the most effective way to optimize React application performance?",
    options: [
      { id: "A", text: "Using inline functions in render methods" },
      { id: "B", text: "Implementing shouldComponentUpdate or React.memo" },
      { id: "C", text: "Avoiding the use of state entirely" },
      { id: "D", text: "Keeping all components in a single file" }
    ]
  },
  {
    id: 2,
    type: "single",
    text: "In Next.js 14 App Router, what is the primary purpose of the 'use client' directive?",
    options: [
      { id: "A", text: "To mark a component as a Client Component, allowing use of React hooks and browser APIs" },
      { id: "B", text: "To force the component to only run on the server" },
      { id: "C", text: "To define client-side routing rules" },
      { id: "D", text: "To connect to a client database" }
    ]
  },
  {
    id: 3,
    type: "single",
    text: "What does CSS property 'backdrop-filter: blur()' achieve in glassmorphism design?",
    options: [
      { id: "A", text: "It blurs the element itself" },
      { id: "B", text: "It blurs the area behind the element, creating a frosted glass effect" },
      { id: "C", text: "It applies a blur effect to the text inside the element" },
      { id: "D", text: "It removes the background color completely" }
    ]
  }
];

// Initialize with 20 mock questions
const fullQuestions = Array.from({ length: 20 }, (_, i) => ({
  ...MOCK_QUESTIONS[i % 3],
  id: i + 1,
  text: `[Q${i + 1}] ${MOCK_QUESTIONS[i % 3].text}`
}));

type QuestionStatus = "not_visited" | "not_answered" | "answered" | "marked_for_review" | "answered_marked";

export default function ExamInterface() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [statuses, setStatuses] = useState<Record<number, QuestionStatus>>({
    1: "not_answered" // First question is visited initially
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? `${h}:` : ""}${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (optionId: string) => {
    setAnswers({ ...answers, [currentQ + 1]: optionId });
  };

  const handleSaveAndNext = () => {
    // Update status based on whether an answer was selected
    const hasAnswer = !!answers[currentQ + 1];
    setStatuses({
      ...statuses,
      [currentQ + 1]: hasAnswer ? "answered" : "not_answered"
    });
    
    // Move to next question and mark as visited if not visited
    if (currentQ < fullQuestions.length - 1) {
      const nextQ = currentQ + 1;
      setCurrentQ(nextQ);
      if (!statuses[nextQ + 1]) {
        setStatuses(prev => ({ ...prev, [nextQ + 1]: "not_answered" }));
      }
    }
  };

  const handleMarkForReview = () => {
    const hasAnswer = !!answers[currentQ + 1];
    setStatuses({
      ...statuses,
      [currentQ + 1]: hasAnswer ? "answered_marked" : "marked_for_review"
    });
    if (currentQ < fullQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const clearResponse = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQ + 1];
    setAnswers(newAnswers);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to submit the test?")) {
      router.push("/result");
    }
  };

  const getStatusColor = (status: QuestionStatus | undefined) => {
    switch (status) {
      case "answered": return "bg-green-500 text-white border-green-600";
      case "not_answered": return "bg-red-500 text-white border-red-600";
      case "marked_for_review": return "bg-purple-500 text-white border-purple-600";
      case "answered_marked": return "bg-purple-500 text-white border-purple-600 relative after:content-[''] after:absolute after:-bottom-1 after:-right-1 after:w-3 after:h-3 after:bg-green-500 after:rounded-full after:border-2 after:border-white";
      default: return "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-foreground";
    }
  };

  const stats = {
    answered: Object.values(statuses).filter(s => s === "answered" || s === "answered_marked").length,
    notAnswered: Object.values(statuses).filter(s => s === "not_answered").length,
    marked: Object.values(statuses).filter(s => s === "marked_for_review" || s === "answered_marked").length,
    notVisited: fullQuestions.length - Object.keys(statuses).length
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-0">
      {/* Exam Header (Overrides Global Navbar temporarily for distraction-free mode) */}
      <header className="fixed top-0 w-full z-50 bg-slate-900 text-white shadow-md flex items-center justify-between px-4 h-16">
        <div className="font-bold text-lg tracking-tight">JEE Main Mock Test 1</div>
        <div className="flex items-center gap-6">
          <div className={cn("flex items-center gap-2 font-mono text-xl", timeLeft < 300 ? "text-red-400 animate-pulse" : "")}>
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
          <button onClick={toggleFullscreen} className="p-2 hover:bg-slate-800 rounded-lg transition-colors hidden md:block">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area - Distraction Free */}
      <div className="flex-1 flex flex-col lg:flex-row mt-16 h-[calc(100vh-4rem)] overflow-hidden">
        
        {/* Left Panel: Question Area */}
        <div className="flex-1 flex flex-col border-r border-border bg-white dark:bg-slate-950 overflow-y-auto">
          {/* Question Header */}
          <div className="p-4 border-b border-border flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
            <div className="font-bold text-lg">Question {currentQ + 1}</div>
            <div className="flex gap-2 text-sm font-medium">
              <span className="text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">+4 Marks</span>
              <span className="text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded">-1 Mark</span>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-6 md:p-10 flex-1 overflow-y-auto">
            <h2 className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
              {fullQuestions[currentQ].text}
            </h2>

            <div className="space-y-4">
              {fullQuestions[currentQ].options.map((opt) => (
                <label
                  key={opt.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-900",
                    answers[currentQ + 1] === opt.id 
                      ? "border-primary bg-primary/5 dark:bg-primary/10" 
                      : "border-border"
                  )}
                >
                  <div className="flex items-center h-6">
                    <input
                      type="radio"
                      name={`question-${currentQ}`}
                      className="w-5 h-5 text-primary border-slate-300 focus:ring-primary"
                      checked={answers[currentQ + 1] === opt.id}
                      onChange={() => handleOptionSelect(opt.id)}
                    />
                  </div>
                  <div className="text-lg">
                    <span className="font-bold mr-2">{opt.id}.</span>
                    {opt.text}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-border flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900">
            <div className="flex gap-2">
              <button onClick={handleMarkForReview} className="px-4 py-2 border border-purple-500 text-purple-600 dark:text-purple-400 font-semibold rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                Mark for Review & Next
              </button>
              <button onClick={clearResponse} className="px-4 py-2 border border-slate-300 dark:border-slate-600 font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Clear Response
              </button>
            </div>
            
            <button onClick={handleSaveAndNext} className="px-8 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 shadow-md hover:-translate-y-0.5 transition-all">
              Save & Next
            </button>
          </div>
        </div>

        {/* Right Panel: Palette */}
        <div className="w-full lg:w-80 flex flex-col bg-slate-50 dark:bg-slate-900 border-l border-border h-full shrink-0">
          {/* User Info (Mock) */}
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl">
              JD
            </div>
            <div>
              <div className="font-bold">John Doe</div>
              <div className="text-sm text-foreground/60">Candidate ID: 9876543</div>
            </div>
          </div>

          {/* Legend */}
          <div className="p-4 border-b border-border grid grid-cols-2 gap-3 text-xs font-medium">
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-green-500 rounded-md shrink-0"></div> Answered</div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-red-500 rounded-md shrink-0"></div> Not Answered</div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-purple-500 rounded-md shrink-0"></div> Marked</div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-md shrink-0 border border-slate-300"></div> Not Visited</div>
          </div>

          {/* Number Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="font-bold text-sm mb-3">Physics Section</div>
            <div className="grid grid-cols-5 gap-2">
              {fullQuestions.map((q, i) => {
                const qNum = i + 1;
                const status = statuses[qNum] || "not_visited";
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQ(i);
                      if (status === "not_visited") {
                        setStatuses(prev => ({ ...prev, [qNum]: "not_answered" }));
                      }
                    }}
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border-2 transition-all",
                      getStatusColor(status),
                      currentQ === i ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900 scale-110" : "hover:opacity-80"
                    )}
                  >
                    {qNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Panel */}
          <div className="p-4 border-t border-border bg-white dark:bg-slate-950">
            <button onClick={handleSubmit} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg transition-colors">
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
