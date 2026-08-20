import Image from "next/image";

export default function AboutHero({banner}:{banner:any}) {
  return (
    <section className="relative w-full py-14 sm:py-20 md:py-28 lg:py-32 overflow-hidden bg-[#52a6eb]">
      {/* ── Animated sky background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-section/sky-bg5.png"
          alt=""
          aria-hidden="true"
          className="animate-hero-pan h-full min-w-[200%] w-[200vw] max-w-none object-cover"
        />
      </div>

      {/* Foreground Left Image */}
      <div className="hidden min-[1366px]:block absolute left-0 top-0 bottom-0 z-10 h-full w-[25%] pointer-events-none">
        <Image
          src="/about/banner-l.png"
          alt=""
          fill
          className="object-contain object-left-bottom"
          priority
        />
      </div>

      {/* Foreground Right Image */}
      <div className="hidden min-[1366px]:block absolute right-0 top-0 bottom-0 z-10 h-full w-[25%] pointer-events-none">
        <Image
          src="/about/banner-r3.png"
          alt=""
          fill
          className="object-contain object-right-bottom"
          priority
        />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/90 mb-2 sm:mb-4">
          {banner.title}
        </p>
        <h1 className="font-flavours text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-4 sm:mb-6 drop-shadow-sm leading-tight">
         {banner.sub}
        </h1>
        <div className="text-base sm:text-xl md:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{__html:banner.content}} />
      </div>
    </section>
  );
}
