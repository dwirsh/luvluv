"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, RotateCcw, Sparkles, Cookie, Candy } from "lucide-react";
import CircularProgress from "./components/CircularProgress";
import confetti from "canvas-confetti";

type AppState = "IDLE" | "SCANNING" | "RESULT";

export default function LoveMeterPage() {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [state, setState] = useState<AppState>("IDLE");
  const [score, setScore] = useState(0);
  const [shuffledName, setShuffledName] = useState("");

  const cuteNames = ["Sweetie", "Cutie", "Honey", "Bae", "Darling", "Mochi", "Cupcake", "Star", "Luv"];

  const calculateScore = (name1: string, name2: string) => {
    const combined = (name1 + name2).toLowerCase().replace(/\s/g, "");
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = (combined.charCodeAt(i) + (hash << 5) - hash) % 100;
    }
    const finalScore = Math.abs(hash);
    return finalScore;
  };

  const handleScan = () => {
    if (!p1 || !p2) return;
    setState("SCANNING");
    const result = calculateScore(p1, p2);
    setScore(result);
    
    // Shuffling animation
    let shuffleInterval = setInterval(() => {
      setShuffledName(cuteNames[Math.floor(Math.random() * cuteNames.length)]);
    }, 150);

    setTimeout(() => {
      clearInterval(shuffleInterval);
      setState("RESULT");
      if (result >= 80) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FF4B91", "#FFCD4B", "#FF7676", "#FFFFFF"]
        });
      }
    }, 3000); // Increased slightly for more suspense
  };

  const reset = () => {
    setP1("");
    setP2("");
    setState("IDLE");
    setScore(0);
  };

  const getTier = (s: number) => {
    if (s >= 80) return { label: "SOULMATES! 💖", color: "#FF4B91", msg: "A match made in heaven! You two are absolutely meant for each other! ✨" };
    if (s >= 50) return { label: "CUTE COUPLE ✨", color: "#FFCD4B", msg: "There's definitely a spark! Maybe go for some ice cream? 🍦" };
    return { label: "FRIEND ZONE? ☁️", color: "#4A2C2C", msg: "A bit chilly here! Time to turn up the heat or stay besties! 🌈" };
  };

  const tier = getTier(score);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <AnimatePresence mode="wait">
        {state === "IDLE" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
            className="w-full max-w-md cute-card p-8 relative overflow-hidden"
          >
            {/* Background Hearts */}
            <div className="absolute -top-10 -right-10 opacity-10 rotate-12">
              <Heart size={160} fill="var(--primary)" />
            </div>

            <div className="text-center mb-8 relative z-10">
              <div className="inline-block bg-primary px-4 py-1 rounded-full border-2 border-border mb-3 transform -rotate-2">
                <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Sparkles size={12} /> LOVE DETECTOR <Sparkles size={12} />
                </span>
              </div>
              <h1 className="text-4xl font-black tracking-tight mb-1 text-foreground flex items-center justify-center gap-3">
                Love Meter <span className="text-primary">GG</span>
              </h1>
              <p className="text-sm font-bold text-foreground/60 italic">Scan your crush compatibility! 🍭</p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-foreground ml-1">Your Cute Name</label>
                <input
                  type="text"
                  value={p1}
                  onChange={(e) => setP1(e.target.value)}
                  placeholder="Type here..."
                  className="w-full cute-input focus:outline-none placeholder:text-foreground/20 text-lg font-bold"
                />
              </div>

              <div className="flex justify-center items-center py-2">
                <div className="h-1 flex-1 bg-border rounded-full" />
                <div className="mx-4 text-2xl animate-bounce">💖</div>
                <div className="h-1 flex-1 bg-border rounded-full" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-foreground ml-1">Partner&apos;s Name</label>
                <input
                  type="text"
                  value={p2}
                  onChange={(e) => setP2(e.target.value)}
                  placeholder="Type here..."
                  className="w-full cute-input focus:outline-none placeholder:text-foreground/20 text-lg font-bold"
                />
              </div>

              <button
                onClick={handleScan}
                disabled={!p1 || !p2}
                className="w-full mt-4 bg-primary text-white font-black text-xl uppercase py-5 rounded-3xl border-[4px] border-border shadow-[6px_6px_0px_var(--border)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_var(--border)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_var(--border)] transition-all disabled:opacity-30 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
              >
                Scan Now! <Heart fill="currentColor" size={24} />
              </button>
            </div>
          </motion.div>
        )}

        {state === "SCANNING" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="flex flex-col items-center gap-8 bg-white p-12 rounded-[50px] border-[6px] border-border shadow-[12px_12px_0px_var(--accent)]"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 border-[8px] border-dashed border-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 0.9, 1.1, 1],
                  rotate: [0, 5, -5, 5, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-8xl relative z-10"
              >
                💖
              </motion.div>
              
              {/* Floating Sparkles */}
              <motion.div
                animate={{ 
                  y: [-20, 20],
                  x: [-10, 10],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                className="absolute -top-4 -right-4 text-3xl"
              >
                ✨
              </motion.div>
              <motion.div
                animate={{ 
                  y: [20, -20],
                  x: [10, -10],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 text-3xl"
              >
                🌟
              </motion.div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black italic tracking-wide text-primary animate-pulse">FINDING THE VIBE...</h2>
              <div className="flex flex-col items-center gap-3 mt-6">
                <div className="flex gap-3 justify-center items-center">
                  <span className="bg-secondary px-4 py-2 rounded-2xl border-4 border-border font-black text-sm uppercase shadow-[4px_4px_0px_var(--border)]">{p1}</span>
                  <span className="text-2xl font-black text-primary">SCANNING</span>
                  <span className="bg-accent px-4 py-2 rounded-2xl border-4 border-border font-black text-sm uppercase shadow-[4px_4px_0px_var(--border)]">{p2}</span>
                </div>
                <motion.div 
                  key={shuffledName}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-primary font-black text-xs bg-white border-2 border-border px-3 py-1 rounded-full"
                >
                  STATUS: {shuffledName} matches detected!
                </motion.div>
              </div>
            </div>
            <div className="w-full h-8 bg-border rounded-full overflow-hidden p-1">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="h-full bg-primary rounded-full relative"
              >
                <div className="absolute right-0 top-0 text-xl">✨</div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {state === "RESULT" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 100, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            className="w-full max-w-md flex flex-col items-center gap-6"
          >
            <CircularProgress percentage={score} color={tier.color} />

            <div className="cute-card p-10 w-full text-center relative overflow-hidden bg-white">
              <div className="absolute -top-4 -left-4 text-4xl">🍬</div>
              <div className="absolute -bottom-4 -right-4 text-4xl">🌈</div>
              
              <div className="mb-4 inline-block bg-foreground text-white px-4 py-1 rounded-full text-[10px] font-black tracking-[0.4em] uppercase">
                Scan Report
              </div>

              <h2 className="text-4xl font-black mb-4 uppercase" style={{ color: tier.color }}>{tier.label}</h2>
              <h3 className="text-xl font-bold mb-4 text-foreground/80 leading-relaxed px-4">{tier.msg}</h3>
              
              <div className="p-4 bg-background rounded-3xl border-2 border-dashed border-border mb-6">
                <p className="text-foreground/60 text-xs font-bold leading-loose">
                  Analysis for <span className="text-primary">{p1}</span> & <span className="text-primary">{p2}</span> is complete. 
                  Have a super cute day! 🎀
                </p>
              </div>

              <button
                onClick={reset}
                className="text-sm font-black uppercase tracking-widest flex items-center gap-2 mx-auto hover:text-primary transition-colors hover:scale-110 active:scale-95 duration-200"
              >
                <RotateCcw size={18} />
                Try Again?
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <footer className="mt-12 text-[10px] font-black text-foreground/30 tracking-[0.3em] flex items-center gap-4">
        <span>MADE WITH LOVE BY DWI</span>
        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        <span>GG_CUTE_V1</span>
      </footer>
    </main>
  );
}
