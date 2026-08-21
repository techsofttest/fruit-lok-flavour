import Image from "next/image";

export default function AboutProcess({data}:{data:any}) {
  return (
    <section className="bg-white py-16 px-6 md:px-12 relative z-30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
        {/* Right: Another beautiful image */}
        <div className="relative w-full md:w-[45%] aspect-[4/3] md:aspect-square flex-shrink-0 -rotate-2 overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>

        {/* Left: Text content */}
        <div className="flex-1 text-left">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
           {data.title}
          </p>
          <h2 className="font-flavours text-4xl md:text-5xl font-extrabold text-brand-green leading-tight mb-6">
        {data.sub}
          </h2>
          <div className="text-lg text-zinc-700 leading-relaxed mb-6 font-medium" dangerouslySetInnerHTML={{__html:data.content,}} />
        </div>
      </div>
    </section>
  );
}
