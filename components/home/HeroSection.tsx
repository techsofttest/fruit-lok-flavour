"use client";


import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import JackfruitButton from "@/components/ui/JackfruitButton";
import Link from "next/link";

const INTERVAL = 4500; // ms per slide

export default function HeroSection({banner}:{banner:any[]}) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(idx);
      setTimeout(() => setAnimating(false), 600);
    },
    [animating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % banner.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + banner.length) % banner.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const product = banner[current];

  return (
    <section
      id="hero"
      className="relative h-[600px] sm:h-[800px] md:h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Animated sky background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-section/sky-bg5.png"
          alt=""
          aria-hidden="true"
          className="animate-hero-pan h-full w-auto max-w-none object-cover"
        />
      </div>

      {/* ── Product carousel content ── */}
      <div className="relative z-20 w-full h-full flex items-center px-4 sm:px-6 md:px-16 lg:px-24 pt-16 sm:pt-24 md:pt-40 pb-16 md:pb-24">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6 md:gap-0">

          {/* RIGHT — product image (ON TOP on mobile: order-1, on right on md+: order-2) */}
          <div
            key={product.id + "-img"}
            className="order-1 md:order-2 flex-1 w-full md:max-w-[50%] flex justify-center md:justify-end items-center md:items-end animate-fade-in-right"
          >
            <Image
              src={product.image}
              alt={product.imgalt}
              width={520}
              height={520}
              className="w-[58vw] max-w-[260px] sm:w-[45vw] md:w-[42vw] max-w-[480px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* LEFT — text block (BELOW image on mobile: order-2, on left on md+: order-1) */}
          <div
            key={product.id + "-text"}
            className="order-2 md:order-1 flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-2 sm:gap-3 md:gap-4 animate-fade-in-left"
          >

            {/* Product name — tile-style with thick white stroke, responsive */}
            <h1
              className={`
                font-flavours font-extrabold leading-tight whitespace-pre-line
                text-3xl sm:text-5xl lg:text-7xl
                [-webkit-text-stroke:2.5px_white] sm:[-webkit-text-stroke:4px_white] lg:[-webkit-text-stroke:5px_white]
                [paint-order:stroke_fill]
                ${product.color}
              `}
            >
              {product.title}
            </h1>

            {/* Short description */}
            <div className="text-sm sm:text-base md:text-lg text-white/90 font-semibold tracking-wide max-w-xs sm:max-w-md drop-shadow" dangerouslySetInnerHTML={{__html:product.content ??""}}/>
            {/* CTA */}
            <div className="mt-1 md:mt-2">
               <Link href="/contact" className="inline-block">
              <JackfruitButton
                id={`hero-cta-${product.id}`}
                variant="filled"
                size="sm"
                colorClass="text-brand-green"
                textClass="text-white text-sm sm:text-base font-semibold"
              >
                Request a Sample
              </JackfruitButton></Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-20 md:bottom-36 left-1/2 -translate-x-1/2 z-30 flex gap-2.5 sm:gap-3">
        {banner.map((p, i) => (
          <button
            key={p.id}
            aria-label={`Go to ${p.imgAlt}`}
            onClick={() => goTo(i)}
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${i === current
              ? "w-8 sm:w-10 bg-brand-yellow shadow"
              : "w-2 sm:w-2.5 bg-white/50 hover:bg-white"
              }`}
          />
        ))}
      </div>

      {/* ── 3D Carousel Navigation Controls (Bottom Right) ── */}
      <div className="absolute bottom-5 md:bottom-16 right-4 sm:right-8 md:right-16 lg:right-24 z-30 flex gap-3 md:gap-4">
        {/* 3D Prev Button */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="group cursor-pointer focus:outline-none select-none relative"
        >
          {/* Shadow layer */}
          <span className="absolute inset-0 rounded-full bg-[#12470d] translate-y-1" />
          {/* Face layer */}
          <span className="relative flex w-12 h-12 rounded-full bg-white border-2 border-brand-green text-brand-green items-center justify-center transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-active:translate-y-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </span>
        </button>

        {/* 3D Next Button */}
        <button
          onClick={next}
          aria-label="Next slide"
          className="group cursor-pointer focus:outline-none select-none relative"
        >
          {/* Shadow layer */}
          <span className="absolute inset-0 rounded-full bg-[#12470d] translate-y-1" />
          {/* Face layer */}
          <span className="relative flex w-12 h-12 rounded-full bg-white border-2 border-brand-green text-brand-green items-center justify-center transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-active:translate-y-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
