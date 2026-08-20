import Link from "next/link";
import Image from "next/image";
import JackfruitButton from "@/components/ui/JackfruitButton";

export default function AboutSection({who}:{who:any}) {
  return (
    <section id="about-intro" className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Left side: Rotated image without shadows or borders */}
        <div className="relative w-full md:w-[45%] aspect-square flex-shrink-0 rotate-3">
          <Image
            src={who?.image}
            alt="Fruitlok Flavours Sourcing"
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
            priority
          />
        </div>

        {/* Right side: Text content */}
        <div className="flex-1 text-left">
          {/* Brand-green label */}
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-green mb-4">{who?.title}</p>

          {/* High-contrast bold heading */}
          <h2 className="font-flavours text-4xl md:text-5xl font-extrabold text-brand-green leading-tight mb-6">{who?.sub}</h2>

          {/* Bold supporting description */}
          <div className="text-lg md:text-xl font-light text-brand-green leading-relaxed" dangerouslySetInnerHTML={{__html:who?.content ?? ""}} />

          {/* Outline CTA button */}
          <div className="mt-8">
            <Link href="/about" className="inline-block">
              <JackfruitButton id="about-us-cta-btn">
                About Fruitlok Flavours
              </JackfruitButton>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
