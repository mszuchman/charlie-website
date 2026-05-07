"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const isError = status === "error";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok || res.status === 409) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
        <div className="relative w-full max-w-xs md:max-w-sm select-none">
          <Image
            src="/logo.png"
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
              {isError && (
                <p className="text-center text-xs" style={{ color: "#c0392b", fontFamily: "var(--font-lato)" }}>
                  Algo salió mal. Inténtalo de nuevo.
                </p>
              )}
              <div
                className="flex rounded-xl overflow-hidden shadow-sm border"
                style={{ borderColor: isError ? "#c0392b" : "#d4a96a" }}
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
