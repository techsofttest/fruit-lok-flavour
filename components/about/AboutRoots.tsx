export default function AboutRoots({data}:{data:any}) {
  return (
    <section className="bg-white py-20 px-6 md:px-12 relative z-30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
           {data.title ||""}
          </p>
          <h2 className="font-flavours text-brand-green text-5xl md:text-6xl font-extrabold tracking-tight">
            {data.sub ||""}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-lg text-zinc-700 leading-relaxed font-medium" dangerouslySetInnerHTML={{__html:data.content}} />
          <div className="space-y-6 text-lg text-zinc-700 leading-relaxed font-medium">
            <p>
              This allows a wonderful diversity of mangoes, bananas, jackfruit, guava, kokum, papaya, and sapota to thrive. Every fruit has its own story, its own character, and its own unique flavours.
            </p>
            <div className="p-6 bg-brand-green/10 rounded-2xl">
               {data?.detail?.map((item: any, index: number) => (
        <div key={index}>

          {item.title && (
            <h4 className="font-flavours text-brand-green text-2xl font-bold mb-2">{item.title}</h4>
          )}

          <div className="text-base text-brand-green font-semibold" dangerouslySetInnerHTML={{__html:item.description}}/>

        </div>
      ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
