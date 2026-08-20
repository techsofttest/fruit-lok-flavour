export default function ProductMarquee() {
  return (
    <div className="w-full bg-brand-green py-6 overflow-hidden relative z-30 border-y border-white/10">
      <div className="animate-marquee hover:[animation-play-state:paused] flex gap-16">
        {[...Array(3)].map((_, listIdx) => (
          <div key={listIdx} className="flex items-center gap-16 text-white font-flavours text-2xl font-bold whitespace-nowrap">
            <span className="flex items-center gap-3">
              <svg className="w-8 h-8 text-brand-yellow shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              100% Real Fruit
            </span>
            <span className="flex items-center gap-3">
              <svg className="w-8 h-8 text-brand-yellxsow shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
              Gently Freeze-Dried
            </span>
            <span className="flex items-center gap-3">
              <svg className="w-8 h-8 text-brand-yellow shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Vibrant Natural Taste
            </span>
            <span className="flex items-center gap-3">
              <svg className="w-8 h-8 text-brand-yellow shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Zero Additives or Preservatives
            </span>
            <span className="flex items-center gap-3">
              <svg className="w-8 h-8 text-brand-yellow shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.008v.008H12V18zm0-3h.008v.008H12V15zm0-3h.008v.008H12v-.008zm0-3h.008v.008H12V9zm0-3h.008v.008H12V6zM6 18h.008v.008H6V18zm0-3h.008v.008H6V15zm0-3h.008v.008H6v-.008zm0-3h.008v.008H6V9zm0-3h.008v.008H6V6zm12 12h.008v.008H18V18zm0-3h.008v.008H18V15zm0-3h.008v.008H18v-.008zm0-3h.008v.008H18V9zm0-3h.008v.008H18V6z" />
              </svg>
              Sourced from Kerala Groves
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
