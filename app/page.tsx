"use client";

import Image from "next/image";
import { useState, useEffect, FormEvent } from "react";

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      return { days, hours, minutes, seconds };
    }

    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

const LAUNCH_DATE = new Date("2026-09-01T08:00:00");

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="text-5xl md:text-7xl font-bold tabular-nums"
        style={{ fontFamily: "var(--font-playfair)", color: "#5c3317" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className="text-xs md:text-sm uppercase tracking-widest"
        style={{ fontFamily: "var(--font-lato)", color: "#a07850", fontWeight: 300 }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Replace with your email collection endpoint
    await new Promise((r) => setTimeout(r, 800));
    setStatus("done");
  }

  return (
    <main
      className="flex-1 flex flex-col items-center justify-between min-h-screen px-6 py-12 md:py-20"
      style={{ background: "linear-gradient(160deg, #fdf6ee 0%, #f5e6d0 60%, #ecdfc8 100%)" }}
    >
      {/* Top accent line */}
      <div className="w-full max-w-2xl">
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #c8935a, transparent)" }} />
      </div>

      {/* Logo + content */}
      <div className="flex flex-col items-center gap-8 mt-10">
        <div className="relative w-72 md:w-96 select-none">
          <Image
            src="/logo.jpg"
            alt="LoDeCharlie MAD"
            width={600}
            height={200}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Tagline */}
        <p
          className="text-center text-lg md:text-xl max-w-sm leading-relaxed"
          style={{ fontFamily: "var(--font-playfair)", color: "#7a4a28", fontStyle: "italic" }}
        >
          Un café de barrio con alma.<br />Próximamente en Madrid.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-px" style={{ background: "#d4a96a" }} />
          <span className="text-lg" style={{ color: "#c8935a" }}>☕</span>
          <div className="flex-1 h-px" style={{ background: "#d4a96a" }} />
        </div>

        {/* Countdown */}
        <div className="flex gap-6 md:gap-10">
          <CountUnit value={days} label="días" />
          <CountUnit value={hours} label="horas" />
          <CountUnit value={minutes} label="min" />
          <CountUnit value={seconds} label="seg" />
        </div>

        {/* Email signup */}
        <div className="w-full max-w-sm mt-4">
          {status === "done" ? (
            <p
              className="text-center py-4 text-base"
              style={{ fontFamily: "var(--font-lato)", color: "#5c3317" }}
            >
              ¡Genial! Te avisamos cuando abramos. 🎉
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <p
                className="text-center text-sm"
                style={{ fontFamily: "var(--font-lato)", color: "#a07850", fontWeight: 300 }}
              >
                Sé el primero en enterarte
              </p>
              <div
                className="flex rounded-xl overflow-hidden shadow-sm border"
                style={{ borderColor: "#d4a96a" }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 text-sm outline-none"
                  style={{
                    background: "rgba(253,246,238,0.8)",
                    fontFamily: "var(--font-lato)",
                    color: "#2c1a0e",
                  }}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-50 cursor-pointer"
                  style={{
                    background: "#5c3317",
                    color: "#fdf6ee",
                    fontFamily: "var(--font-lato)",
                  }}
                >
                  {status === "loading" ? "..." : "Apúntame"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center gap-3 mt-10">
        <div
          className="h-px w-40"
          style={{ background: "linear-gradient(90deg, transparent, #c8935a, transparent)" }}
        />
        <p
          className="text-xs text-center"
          style={{ fontFamily: "var(--font-lato)", color: "#b08858", fontWeight: 300, letterSpacing: "0.1em" }}
        >
          MADRID · 2026
        </p>
      </div>
    </main>
  );
}
