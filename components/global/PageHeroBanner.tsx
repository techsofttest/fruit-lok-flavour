import React from "react";
import Image from "next/image";

interface PageHeroBannerProps {
  tagline?: string;
  title: string;
  description?: string;
  bgImage?: string;
  colorClass?: string;
  children?: React.ReactNode;
}

export default function PageHeroBanner({
  tagline,
  title,
  description,
  bgImage = "/section-bg/bg-green2.svg",
  colorClass = "bg-brand-green",
  children,
}: PageHeroBannerProps) {
  return (
    <section className={`relative w-full py-16 sm:py-18 md:py-20 lg:py-24 overflow-hidden ${colorClass} text-center text-white`}>
      {/* Background pattern overlay */}
      {bgImage && (
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={bgImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            aria-hidden="true"
          />
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {tagline && (
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/80 mb-2 sm:mb-3">
            {tagline}
          </p>
        )}
        <h1 className="font-flavours text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight">
          {title}
        </h1>
        {description && (
          <div className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white/90 max-w-2xl mx-auto leading-relaxed"dangerouslySetInnerHTML={{ __html:description }}/>
        )}
        {children}
      </div>
    </section>
  );
}
