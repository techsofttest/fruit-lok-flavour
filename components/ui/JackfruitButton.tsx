"use client";


import React, { useState } from "react";

interface JackfruitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "outline" | "filled";
  size?: "sm" | "md";
  textClass?: string;
  colorClass?: string;
}

const PATH =
  "M 20,45 C 20,22 55,14 120,10 C 185,6 220,22 220,45 C 220,68 185,82 120,80 C 55,78 20,68 20,45 Z";

// Depth in SVG viewBox units (viewBox = 0 0 240 90)
const DEPTH    = 8;
const DEPTH_SM = 5;
// Horizontal rightward offset for the shadow (creates a top-left light source feel)
const SHADOW_X    = 5;
const SHADOW_X_SM = 3;

export default function JackfruitButton({
  children,
  className = "",
  variant = "outline",
  size = "md",
  textClass,
  colorClass = "text-brand-green",
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onMouseEnter,
  onTouchStart,
  onTouchEnd,
  ...props
}: JackfruitButtonProps) {
  // For outline: hover triggers push. For filled: only click triggers push.
  const [pressed, setPressed] = useState(false);

  const isFilled = variant === "filled";
  const isSmall  = size === "sm";
  const depth    = isSmall ? DEPTH_SM : DEPTH;
  const shadowX  = isSmall ? SHADOW_X_SM : SHADOW_X;   // rightward shift
  const vbH      = 90 + depth;        // viewBox height — extra room for shadow
  const strokeW  = isSmall ? 5.5 : 4.5;

  const sizeClasses = isSmall
    ? "px-6 py-3.5 text-xs font-bold"
    : "px-12 py-6 text-xl font-bold";

  // ── Face path fill ─────────────────────────────────────────────────────────
  // outline: white fill + brand-green stroke — never changes
  // filled:  currentColor fill + stroke — never changes (hover = push now)
  const faceFill   = isFilled ? "fill-current" : "fill-white";
  const faceStroke = "stroke-current";

  // ── Shadow layer ────────────────────────────────────────────────────────────
  // outline: solid brand-green at full opacity
  // filled:  same currentColor but darkened to ~55% brightness = visibly darker
  const shadowOpacity = 1;
  const shadowStyle: React.CSSProperties = isFilled
    ? { filter: "brightness(0.55)" }           // darkens the currentColor shape
    : { fill: "var(--brand-green)", stroke: "var(--brand-green)", filter: "brightness(0.55)" };

  // ── Text colour ─────────────────────────────────────────────────────────────
  // Both variants: no colour swap on hover (hover = push animation instead)
  const defaultTextClass = isFilled ? "text-white" : "text-brand-green";

  // ── Push translation ────────────────────────────────────────────────────────
  const isDown    = pressed;
  const snapDown  = `${depth * 0.95}px`;
  const faceStyle: React.CSSProperties = {
    display: "inline-block",
    transform: isDown ? `translateY(${snapDown})` : "translateY(0px)",
    transition: isDown
      ? "transform 70ms ease-in"
      : "transform 200ms cubic-bezier(0.34,1.56,0.64,1)", // springy release
  };

  // ── Event helpers ───────────────────────────────────────────────────────────
  const press   = () => setPressed(true);
  const release = () => setPressed(false);

  // Both variants: hover = push in, leave = spring back
  const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    press();
    onMouseEnter?.(e);
  };
  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    release();
    onMouseLeave?.(e);
  };
  const handleDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    press();
    onMouseDown?.(e);
  };
  const handleUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Keep pressed while cursor is still over button (hover still active)
    // release is handled by handleLeave when the cursor exits
    onMouseUp?.(e);
  };

  return (
    <button
      className={`
        group relative inline-flex items-center justify-center
        font-flavours bg-transparent border-0 focus:outline-none cursor-pointer
        select-none ${sizeClasses} ${className} ${colorClass}
      `}
      style={{
        // Extra bottom padding so shadow layer isn't clipped
        paddingBottom: `calc(${isSmall ? "0.875rem" : "1.5rem"} + ${depth + 2}px)`,
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onTouchStart={(e) => { press(); onTouchStart?.(e); }}
      onTouchEnd={(e)   => { release(); onTouchEnd?.(e); }}
      {...props}
    >
      {/*
        ── Combined 3D SVG ───────────────────────────────────────────────────
        viewBox is taller by `depth` to accommodate the shadow below.
        Shadow <g>  → fixed at translate(0, depth) — never moves
        Face   <g>  → shifts DOWN on press/hover via inline style
      */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <svg
          viewBox={`0 0 240 ${vbH}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* ── Shadow: fixed, always at Y+depth and X+shadowX ── */}
          <g transform={`translate(${shadowX}, ${depth})`} opacity={shadowOpacity} style={isFilled ? shadowStyle : undefined}>
            <path
              d={PATH}
              className={isFilled ? "fill-current stroke-current" : ""}
              style={isFilled ? undefined : shadowStyle}
              strokeWidth={strokeW}
            />
          </g>

          {/* ── Face: translates down on hover/press, springs back on leave ── */}
          <g style={faceStyle}>
            <path
              d={PATH}
              className={`transition-all duration-500 ease-out ${faceFill} ${faceStroke}`}
              strokeWidth={strokeW}
            />
          </g>
        </svg>
      </div>

      {/* ── Text & Icon travels with the face ── */}
      <span
        className={`relative z-10 w-full inline-flex flex-row items-center justify-center gap-1.5 whitespace-nowrap text-center transition-colors duration-500 ease-out ${textClass || defaultTextClass}`}
        style={faceStyle}
      >
        {children}
      </span>
    </button>
  );
}
