import Image from "next/image";

export default function AboutRoots({ data }: { data: any }) {

  // Extract each <p>...</p> from the existing HTML content
  const paragraphs =
    data?.content?.match(/<p[\s\S]*?<\/p>/gi) || [];

  // First half goes to left
  const leftParagraphs = paragraphs.slice(
    0,
    Math.ceil(paragraphs.length / 2)
  );

  // Remaining paragraphs go to right
  const rightParagraphs = paragraphs.slice(
    Math.ceil(paragraphs.length / 2)
  );

  return (
    <section className="bg-white py-20 px-6 md:px-12 relative z-30">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {data?.title || ""}
          </p>

          <h2 className="font-flavours text-brand-green text-5xl md:text-6xl font-extrabold tracking-tight">
            {data?.sub || ""}
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT COLUMN */}
          <div className="space-y-6 text-lg text-zinc-700 leading-relaxed font-medium">

            {leftParagraphs.map((paragraph: string, index: number) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{
                  __html: paragraph,
                }}
              />
            ))}

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 text-lg text-zinc-700 leading-relaxed font-medium">

            {/* Remaining paragraphs */}
            {rightParagraphs.map((paragraph: string, index: number) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{
                  __html: paragraph,
                }}
              />
            ))}

            {/* OUR PROMISE */}
            {data?.detail?.map((item: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-brand-green/10 rounded-2xl"
              >
                {item.title && (
                  <h4 className="font-flavours text-brand-green text-2xl font-bold mb-2">
                    {item.title}
                  </h4>
                )}

                {item.description && (
                  <div
                    className="text-base text-brand-green font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}