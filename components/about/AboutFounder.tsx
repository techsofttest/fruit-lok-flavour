import Image from "next/image";

export default function AboutFounder({data}:{data:any}) {
  return (
    <section className="bg-gradient-to-b from-yellow-50/50 to-white py-20 px-6 md:px-12 relative z-30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="relative w-full md:w-[45%] flex justify-center">
          <div className="relative w-70 h-[420px] md:w-[400px] md:h-[540px]">
            <Image
              src={data.image}
              alt="Albin - Founder of Fruitlok Flavours"
              fill
              className="object-contain rounded-3xl"
              sizes="(max-width: 768px) 100vw, 350px"
            />
            {/* Handwritten-style "Founder ⤵" indicator */}
            <div className="absolute -left-12 top-12 md:-left-16 rotate-[-15deg] hidden sm:block">
              <p className="font-flavours text-brand-green text-3xl font-extrabold tracking-wider">
                Founder
              </p>
              <svg className="w-16 h-8 text-brand-green -mt-1 ml-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Text content */}
        <div className="flex-1 text-left">
          <h2 className="font-flavours text-5xl md:text-6xl font-extrabold text-brand-green leading-tight mb-4">
           {data.title}
          </h2>
          <p className="text-lg font-flavours text-brand-green font-bold uppercase tracking-wider mb-6">
           {data.sub}
          </p>

          <div className="space-y-6 text-zinc-700 leading-relaxed font-semibold text-lg" dangerouslySetInnerHTML={{__html:data.content}}/>
        </div>
      </div>

      {/* Highlighted Quote block (full width / large banner below founder, using brand colors) */}
      <div className="max-w-4xl mx-auto mt-16 px-6">
        <div className="bg-brand-green text-white rounded-3xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
          {/* Background design elements */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />
            {data?.detail?.map((item: any, index: number) => (
        <div key={index}>
          <div className="font-flavours text-2xl md:text-3xl font-extrabold leading-relaxed max-w-3xl mx-auto relative z-10" dangerouslySetInnerHTML={{__html:item.description || ""}}/>
           </div>
          ))} </div>
      </div>
    </section>
  );
}
