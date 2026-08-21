import Image from "next/image";
import JackfruitButton from "@/components/ui/JackfruitButton";
import Link from "next/link";
export default function CTASection({ cta }: { cta: any }) {
  return (
    <section
      id="cta"
      className="relative w-full h-[260px] sm:h-[340px] md:h-[80vh] md:min-h-[440px] overflow-hidden flex items-start justify-center pt-6 sm:pt-10 md:pt-16 pb-4 md:pb-28"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={cta?.image}
          alt="Partner with Fruitlok"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Dark overlay for text readability */}
      {/* <div className="absolute inset-0 z-10 bg-zinc-950/40" /> */}

      {/* Title & Button Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl flex flex-col items-center gap-3 sm:gap-6 md:gap-8">
        <div className="font-flavours text-2xl sm:text-4xl md:text-5xl font-extrabold text-brand-green leading-tight" dangerouslySetInnerHTML={{ __html: cta.content, }} />
        <Link href="/contact" className="inline-block">
          <JackfruitButton
            id="cta-button"
            variant="filled"
            colorClass="text-brand-green"
            textClass="text-white"
          >
            Get in Touch
          </JackfruitButton></Link>
      </div>
    </section>
  );
}
