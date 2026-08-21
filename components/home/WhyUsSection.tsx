// components/ui/WhyUsSection.tsx
import Image from "next/image";
import JackfruitButton from "@/components/ui/JackfruitButton";
import Link from "next/link";
export default function WhyUsSection({partner}:{partner:any[]}) {
  return (
    <section id="why-us" className="py-24 pb-40 bg-white text-foreground px-6 md:px-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            The Fruitlok Advantage
          </p>
          <h2 className="font-flavours text-4xl md:text-5xl font-extrabold text-brand-green leading-tight mb-6">
            Your Partner in Fruit Innovation
          </h2>
        </div>

        {/* 3-column reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {partner.map((reason, index) => (
            <div
              key={index}
              className="flex flex-col"
            >
              {/* Card image */}
              <div className="relative w-full aspect-square rotate-2 transition-transform duration-300 ease-in-out group-hover:rotate-0 group-hover:scale-105">
                <Image
                  src={reason.image}
                  alt={reason.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover object-center"
                />
              </div>

              {/* Card content */}
              <div className="pt-8">
                <h3 className="font-flavours text-3xl font-bold mb-4 text-brand-green">
                  {reason.title}
                </h3>
                <div className="text-lg text-brand-green leading-relaxed" dangerouslySetInnerHTML={{ __html:reason.desc,}} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/about" className="inline-block">
          <JackfruitButton
            id="why-us-cta-btn"
            variant="filled"
            colorClass="text-brand-green"
            textClass="text-white"
          >
            Learn More
          </JackfruitButton></Link>
        </div>
      </div>
    </section>
  );
}
