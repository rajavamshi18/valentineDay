"use client";

import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
}

export function Celebration() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const generated: Sparkle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 3,
    }));
    setSparkles(generated);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src="/valentine-bg.jpg"
        alt="Romantic Valentine background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(60, 10, 20, 0.55)" }}
      />

      {/* Sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute animate-sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[hsl(40,100%,70%)]"
            width={s.size}
            height={s.size}
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </div>
      ))}

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center gap-6 px-6 text-center transition-all duration-1000 ${
          show ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        {/* Big beating heart */}
        <div className="animate-heartbeat">
          <span className="text-[100px] md:text-[140px] drop-shadow-[0_0_30px_hsl(347,77%,50%)]" role="img" aria-label="heart">
            💖
          </span>
        </div>

        <h1 className="font-sans text-5xl font-bold tracking-tight text-[hsl(0,0%,100%)] drop-shadow-lg md:text-7xl text-balance">
          {"You Made My Heart Complete! 🥰"}
        </h1>

        <div className="mx-auto max-w-lg space-y-4">
          <p className="text-xl text-[hsl(350,80%,90%)] leading-relaxed md:text-2xl">
            {"🌹 Every love story is beautiful, but ours is my favorite. 🌹"}
          </p>
          <p className="text-lg text-[hsl(350,60%,80%)] leading-relaxed italic">
            {
              "Thank you for saying yes. 😘 You are the best thing that has ever happened to me. I promise to love you, cherish you, and make every moment magical. 💕"
            }
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl animate-pulse" role="img" aria-label="couple">💑</span>
          <p className="text-lg font-semibold text-[hsl(0,0%,100%)]">
            {"Happy Valentine's Day, My Love"}
          </p>
          <span className="text-2xl animate-pulse" role="img" aria-label="kiss">💏</span>
        </div>

        <p className="mt-6 text-base text-[hsl(350,40%,70%)]">
          {"Forever & Always 💞"}
        </p>
      </div>

      <style jsx>{`
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.3);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.3);
          }
          70% {
            transform: scale(1);
          }
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
