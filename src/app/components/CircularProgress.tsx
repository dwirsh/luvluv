"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  duration?: number;
}

export default function CircularProgress({
  percentage,
  size = 200,
  strokeWidth = 20,
  color = "var(--primary)",
  duration = 2.5,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(percentage);
    }, 100);
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div className="relative flex items-center justify-center p-4" style={{ width: size + 40, height: size + 40 }}>
      {/* Outer Border Circle */}
      <div className="absolute inset-0 border-[6px] border-border rounded-full bg-white shadow-[8px_8px_0px_var(--secondary)]" />
      
      <svg width={size} height={size} className="transform -rotate-90 relative z-10">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(74, 44, 44, 0.05)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle with Gradient */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration, type: "spring", bounce: 0.3 }}
          strokeLinecap="round"
        />
      </svg>
      {/* Percentage Text */}
      <div className="absolute flex flex-col items-center z-20">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="text-6xl font-black tracking-tighter"
          style={{ color: 'var(--foreground)' }}
        >
          {Math.round(progress)}%
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-[10px] uppercase tracking-[0.3em] font-black bg-accent px-2 py-0.5 rounded-full border-2 border-border mt-1"
        >
          Love level
        </motion.span>
      </div>
    </div>
  );
}
