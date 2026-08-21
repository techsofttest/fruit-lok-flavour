import Image from "next/image";
import JackfruitButton from "@/components/ui/JackfruitButton";
import Link from "next/link";

export default function JackfruitFeature({page}:{page:any}) {
  return (
    <section
      id="jackfruit-feature"
      className="relative w-full min-h-[500px] md:h-[100vh] overflow-visible"
    >
      {/* Section background image — same as AboutBanner */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/section-bg/bg-yello2.svg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
      </div>

      {/* ── DESKTOP VIEW (Kept 100% identical to existing desktop implementation) ── */}
      <div className="hidden md:block">
        {/* Jackfruit PNG — left, taller than the section so it bleeds top & bottom */}
        <div
          className="absolute left-0 z-20 pointer-events-none"
          style={{ width: "59%", height: "224%", top: "-66%" }}
        >
          <Image
            src={page.image}
            alt="Fresh Jackfruit"
            fill
            sizes="59vw"
            className="object-contain object-left drop-shadow-2xl"
            priority
          />
        </div>

        {/* Text content — occupies the right ~55%, centred within it */}
        <div className="relative z-30 h-full flex items-center min-h-[500px] md:h-[100vh]">
          {/* Spacer that pushes content past the jackfruit */}
          <div className="w-[35%] shrink-0" />

          <div className="flex-1 flex flex-col items-center text-center px-8 md:px-12">
            <div className="font-flavours text-3xl md:text-4xl font-extrabold text-white leading-tight mb-8 max-w-lg" dangerouslySetInnerHTML={{ __html:page.content,  }}/>
            <Link href="/products" className="inline-block">
            <JackfruitButton
              id="jackfruit-cta-btn-desktop"
              variant="filled"
              colorClass="text-brand-green"
              textClass="text-white"
            >
              Explore Jackfruit Products
            </JackfruitButton></Link>
          </div>
        </div>
      </div>

      {/* ── MOBILE VIEW (Jackfruit on top overlapping top, content below) ── */}
      <div className="md:hidden relative z-30 py-12 px-6 flex flex-col items-center justify-start text-center">
        {/* Jackfruit PNG — top overlapping */}
        <div className="relative w-[95%] sm:w-[75%] h-[320px] sm:h-[380px] -mt-24 sm:-mt-28 mb-2 z-20 pointer-events-none">
          <Image
            src={page.image}
            alt="Fresh Jackfruit"
            fill
            sizes="95vw"
            className="object-contain object-center drop-shadow-2xl"
            priority
          />
        </div>

        {/* Content Below Jackfruit */}
        <div className="w-full max-w-md flex flex-col items-center text-center space-y-6 pt-2">
          <div className="font-flavours text-xl sm:text-2xl font-extrabold text-white leading-relaxed"dangerouslySetInnerHTML={{ __html:page.content,  }}/>
           <Link href="/products" className="inline-block">
          <JackfruitButton
            id="jackfruit-cta-btn-mobile"
            variant="filled"
            size="sm"
            colorClass="text-brand-green"
            textClass="text-white text-xs sm:text-base"
          >
            Explore Jackfruit Products
          </JackfruitButton></Link>
        </div>
      </div>
    </section>
  );
}
