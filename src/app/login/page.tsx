"use client";

import { motion } from "framer-motion";
import { BrainCircuit, ExternalLink, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(getFriendlyError(error.message));
    }
  };



  const isStrongPassword = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };

  const getFriendlyError = (message: string) => {
    const msg = message.toLowerCase();

    if (msg.includes("password")) {
      return "Password does not meet the required criteria.";
    }

    if (msg.includes("too many requests") || msg.includes("rate limit")) {
      return "Too many attempts. Please wait a while and try again.";
    }

    if (msg.includes("already registered") || msg.includes("user already exists")) {
      return "This email is already registered.";
    }

    if (msg.includes("invalid login credentials")) {
      return "Invalid email or password.";
    }

    return message;
  };

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!isLogin && !isStrongPassword(password)) {
        setError("Password must contain 8+ chars, uppercase, lowercase, number, and symbol");
        return;
      }

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(getFriendlyError(error.message));
          return;
        }

        router.push("/dashboard");

      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login`,
            data: {
              full_name: name,
            },
          },
        });

        if (error) {
          setError(getFriendlyError(error.message));
          return;
        }

        setSuccess("Verification email sent. Please check your inbox.");
        setIsLogin(true);
      }

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row absolute inset-0 z-50 bg-background">
      {/* Left side - Branding & Value Prop */}
      <div className="hidden md:flex flex-1 flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-slate-900 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        <Link href="/" className="relative z-10 flex items-center gap-2 group w-fit">
          <div className="bg-primary/20 p-2 rounded-xl group-hover:bg-primary/30 transition-colors">
            <BrainCircuit className="h-6 w-6 text-primary-400" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">
            Mockify<span className="text-primary-400">.ai</span>
          </span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold mb-6 leading-tight">Start practicing smarter, not harder.</h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Upload your Previous Year Questions, automatically generate full mock tests, and get AI-powered insights on your weak topics.
          </p>

          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-bold shadow-md">
                U{i}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-primary flex items-center justify-center text-xs font-bold shadow-md">
              +1k
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-4">Join 1,000+ students cracking their exams.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <Link href="/" className="md:hidden absolute top-8 left-8 flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">Mockify.ai</span>
        </Link>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{isLogin ? "Welcome back" : "Create an account"}</h2>
            <p className="text-foreground/60">
              {isLogin ? "Enter your details to access your dashboard." : "Sign up to start generating free mock tests."}
            </p>
          </div>

          <div className="space-y-4">
            {!isLogin && (

              <div className="space-y-2">
                <label className="text-sm font-semibold">Full Name</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary rounded-xl px-4 py-3 text-sm outline-none transition-all"
                />
              </div>

            )}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary rounded-xl px-4 py-3 text-sm outline-none transition-all" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold">Password</label>

                {isLogin && (
                  <Link
                    href="#"
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary rounded-xl px-4 py-3 text-sm outline-none transition-all"
              />

              {!isLogin && (
                <div className="text-xs space-y-1 mt-2">
                  <p className={password.length >= 8 ? "text-green-500" : "text-red-500"}>
                    • Minimum 8 characters
                  </p>

                  <p className={/[A-Z]/.test(password) ? "text-green-500" : "text-red-500"}>
                    • At least one uppercase letter
                  </p>

                  <p className={/[a-z]/.test(password) ? "text-green-500" : "text-red-500"}>
                    • At least one lowercase letter
                  </p>

                  <p className={/[0-9]/.test(password) ? "text-green-500" : "text-red-500"}>
                    • At least one number
                  </p>

                  <p className={/[^A-Za-z0-9]/.test(password) ? "text-green-500" : "text-red-500"}>
                    • At least one special character
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900 px-4 py-3 text-sm text-green-600 dark:text-green-400">
                {success}
              </div>
            )}

            <button
              onClick={handleAuth}
              className="block w-full bg-primary text-white text-center py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all mt-6"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </div>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink-0 mx-4 text-foreground/40 text-sm font-medium">Or continue with</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <div className="flex justify-center mt-0">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="justify-self-center flex items-center justify-center  gap-2 px-8 py-2.5 mt-0 border border-border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-semibold text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>

            {/* <button className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-semibold text-sm">
              <ExternalLink className="w-5 h-5" />
              GitHub
            </button> */}
          </div>

          <p className="text-center text-sm text-foreground/60 mt-8">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-primary hover:underline">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
