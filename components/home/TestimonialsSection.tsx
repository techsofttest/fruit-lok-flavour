"use client";
import Image from "next/image";
import { useState } from "react";


export default function TestimonialsSection({review}:{review:any[]}) {
  const [active, setActive] = useState(0);
  const current = review[active];

  const prev = () => setActive((a) => (a - 1 + review.length) % review.length);
  const next = () => setActive((a) => (a + 1) % review.length);

  return (
    <section id="testimonials" className="relative w-full min-h-[920px] sm:min-h-[960px] md:min-h-screen md:h-[110vh] py-8 md:py-0 overflow-hidden">
      {/* Green textured background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/section-bg/bg-green2.svg"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden="true"
          priority
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row items-stretch h-full">

        {/* ── Left: photo card ── */}
        <div className="relative md:w-[45%] flex-shrink-0 flex flex-col items-center justify-center py-10 sm:py-16 px-6 sm:px-10">

          {/* Outer box of Photo frame with absolute quotes overlapping it */}
          <div className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem]">

            {/* Opening large double quote mark “ (66) */}
            <span
              className="absolute -top-12 -left-8 sm:-top-16 sm:-left-12 font-serif text-brand-yellow leading-none select-none pointer-events-none z-20 text-[9rem] sm:text-[14rem]"
              style={{ lineHeight: 1 }}
              aria-hidden="true"
            >
              “
            </span>

            {/* Photo frame - removed rounded corners and shadows, rotated slightly to the right */}
            <div className="relative w-full h-full overflow-hidden rotate-2">
              <Image
                src={current.image}
                alt={current.name}
                fill
                sizes="380px"
                className="object-cover object-center"
              />
            </div>

            {/* Closing double quote mark ” (99) */}
            <span
              className="absolute -bottom-16 -right-8 sm:-bottom-24 sm:-right-12 font-serif text-brand-yellow leading-none select-none pointer-events-none z-20 text-[9rem] sm:text-[14rem]"
              style={{ lineHeight: 1 }}
              aria-hidden="true"
            >
              ”
            </span>
          </div>

          {/* Dot indicators */}
          <div className="mt-6 sm:absolute sm:bottom-28 sm:left-1/2 sm:-translate-x-1/2 flex gap-2 z-20">
            {review.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === active
                  ? "w-18 bg-brand-yellow"
                  : "w-2 bg-white/60 hover:bg-white"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* ── Right: text (fully centered) ── */}
        <div className="relative md:w-[55%] flex-1 flex flex-col justify-center py-8 sm:py-16 px-6 sm:px-8 md:pl-8 md:pr-32 pb-16">
          <div className="flex flex-col gap-4 sm:gap-5 max-w-xl">
            {/* Label */}
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-brand-yellow">
              Client Reviews
            </p>

            {/* Heading quote (Dynamic) */}
                 <div className="
    [&_h2]:font-flavours [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:lg:text-5xl  [&_h2]:text-white [&_h2]:font-bold [&_h2]:leading-tight
  [&_p_i]:text-white
  [&_p_i]:text-lg
  [&_p_i]:md:text-2xl
  [&_p_i]:font-medium
  [&_p_i]:leading-relaxed
  [&_p_i]:italic
  [&_p]:text-white
  [&_p]:text-lg
  [&_p]:md:text-2xl
  [&_p]:font-medium
  [&_p]:leading-relaxed
  [&_p]:italic
"
dangerouslySetInnerHTML={{ __html:current.description,}} />
            {/* Author */}
            <div className="flex flex-col">
              <p className="font-flavours text-brand-yellow text-xl sm:text-2xl font-bold">
                — {current.name}
              </p>
              <p className="text-white text-xs sm:text-base mt-0.5">{current.designation}</p>
            </div>
          </div>
        </div>

        {/* 3D Prev Button - Left Side */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 group cursor-pointer focus:outline-none select-none"
        >
          {/* Shadow layer */}
          <span className="absolute inset-0 rounded-full bg-[#12470d] translate-y-1" />
          {/* Face layer */}
          <span className="relative flex w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-brand-green text-brand-green items-center justify-center transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-active:translate-y-1">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </span>
        </button>

        {/* 3D Next Button - Right Side */}
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 group cursor-pointer focus:outline-none select-none"
        >
          {/* Shadow layer */}
          <span className="absolute inset-0 rounded-full bg-[#12470d] translate-y-1" />
          {/* Face layer */}
          <span className="relative flex w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-brand-green text-brand-green items-center justify-center transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-active:translate-y-1">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
