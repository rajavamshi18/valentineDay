"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const NO_MESSAGES = [
  { text: "Are you sure? My heart will break...", emoji: "💔" },
  { text: "Please don't do this to me...", emoji: "😢" },
  { text: "I'll be so sad without you...", emoji: "😭" },
  { text: "You're breaking my heart...", emoji: "💔" },
  { text: "I'll cry myself to sleep...", emoji: "😿" },
  { text: "My teddy bear will cry too...", emoji: "🧸" },
  { text: "Think about all the chocolates we could share!", emoji: "🍫" },
  { text: "Who will hold my hand?", emoji: "😥" },
  { text: "But I already bought the roses...", emoji: "🥀" },
  { text: "My heart only beats for you...", emoji: "💗" },
  { text: "I promise to love you forever!", emoji: "🥺" },
  { text: "Please... I made dinner reservations...", emoji: "😢" },
  { text: "Don't leave me alone on Valentine's!", emoji: "😭" },
  { text: "I'll write you a love poem every day!", emoji: "📝" },
  { text: "My world is incomplete without you...", emoji: "😞" },
];

interface ValentineProposalProps {
  onYes: () => void;
}

export function ValentineProposal({ onYes }: ValentineProposalProps) {
  const [noCount, setNoCount] = useState(0);
  const [noMessage, setNoMessage] = useState<{
    text: string;
    emoji: string;
  } | null>(null);
  const [yesScale, setYesScale] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [noPosition, setNoPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const getRandomPosition = useCallback(() => {
    const padding = 80;
    const maxX = window.innerWidth - padding * 2;
    const maxY = window.innerHeight - padding * 2;
    return {
      x: Math.random() * maxX + padding,
      y: Math.random() * maxY + padding,
    };
  }, []);

  const handleNo = useCallback(() => {
    const newCount = noCount + 1;
    setNoCount(newCount);
    setNoMessage(NO_MESSAGES[newCount % NO_MESSAGES.length]);
    setYesScale((prev) => Math.min(prev + 0.25, 3));

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    // Move the No button to a random position
    setIsRunning(true);
    setNoPosition(getRandomPosition());
  }, [noCount, getRandomPosition]);

  // Also move No button when mouse hovers over it (after first click)
  const handleNoHover = useCallback(() => {
    if (noCount > 0) {
      setNoPosition(getRandomPosition());
    }
  }, [noCount, getRandomPosition]);

  // Ensure button stays in bounds on resize
  useEffect(() => {
    const handleResize = () => {
      if (isRunning) {
        setNoPosition(getRandomPosition());
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isRunning, getRandomPosition]);

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      {/* Heart icon */}
      <div className="animate-bounce">
        <span className="text-7xl md:text-8xl drop-shadow-lg" role="img" aria-label="heart">
          💖
        </span>
      </div>

      {/* Main question */}
      <h1
        className={`font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance text-center ${
          isShaking ? "animate-shake" : ""
        }`}
      >
        {"Will You Be My Valentine? 🌹"}
      </h1>

      <p className="max-w-md text-center text-lg text-muted-foreground leading-relaxed">
        {"I have been waiting for this moment to ask you something very special... 🥰"}
      </p>

      {/* Emotional message when No is clicked */}
      {noMessage && (
        <div className="mx-auto max-w-sm rounded-2xl border-2 border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-6 py-4 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-2xl" role="img" aria-label="emotion">
              {noMessage.emoji}
            </span>
            <p className="text-base italic text-foreground leading-relaxed">
              {noMessage.text}
            </p>
          </div>
          {noCount > 2 && (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {"😢 You've said no "}
              {noCount}
              {" times... please stop! 😢"}
            </p>
          )}
        </div>
      )}

      {/* Yes button - always centered */}
      <button
        type="button"
        onClick={onYes}
        className="cursor-pointer rounded-full bg-[hsl(var(--primary))] px-10 py-4 font-sans text-lg font-bold text-[hsl(var(--primary-foreground))] shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary))] active:scale-95"
        style={{
          transform: `scale(${yesScale})`,
        }}
      >
        {"Yes! 😍❤️"}
      </button>

      {/* No button - static initially, then runs away */}
      {!isRunning ? (
        <button
          ref={noButtonRef}
          type="button"
          onClick={handleNo}
          className="cursor-pointer rounded-full border-2 border-[hsl(var(--border))] bg-[hsl(var(--card))] px-8 py-3 font-sans text-base text-muted-foreground shadow-md transition-all duration-300 hover:bg-[hsl(var(--secondary))]"
        >
          {"No 😐"}
        </button>
      ) : (
        <button
          ref={noButtonRef}
          type="button"
          onClick={handleNo}
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          className="fixed z-50 cursor-pointer rounded-full border-2 border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 py-2 font-sans text-muted-foreground shadow-md transition-all duration-500 ease-out hover:bg-[hsl(var(--secondary))]"
          style={{
            left: noPosition ? `${noPosition.x}px` : "50%",
            top: noPosition ? `${noPosition.y}px` : "50%",
            transform: "translate(-50%, -50%)",
            fontSize: `${Math.max(14 - noCount * 1, 8)}px`,
            opacity: Math.max(1 - noCount * 0.05, 0.4),
          }}
        >
          {noCount > 5 ? "No 😰" : noCount > 3 ? "No 😢" : "No 😟"}
        </button>
      )}

      {noCount > 3 && noCount <= 6 && (
        <p className="text-sm text-muted-foreground italic animate-pulse">
          {"😏 The No button is running away from you..."}
        </p>
      )}

      {noCount > 6 && (
        <p className="text-sm text-muted-foreground italic animate-pulse">
          {"🥺 Please... just click Yes! The button won't let you say No!"}
        </p>
      )}

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
