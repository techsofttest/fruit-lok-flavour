export interface FAQItem {
  title: string;
  detail: {
    title: string;
    description: string;
  }[];
}

interface ProductFAQProps {
  faq?: FAQItem | null;
}

export default function ProductFAQ({ faq }: ProductFAQProps) {
  if (!faq) {
    return null;
  }

  const details = Array.isArray(faq.detail) ? faq.detail : [];

  return (
    <div className="my-24 max-w-4xl mx-auto px-6 space-y-6">
      <h2 className="font-flavours text-3xl md:text-4xl font-extrabold text-center text-brand-green mb-8">
        {faq.title}
      </h2>

      {details.length > 0 && (
        <div className="space-y-4">
          {details.map((item, idx) => (
            <div
              key={idx}
              className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100"
            >
              <h4 className="font-flavours text-xl font-extrabold text-brand-green mb-2">
                {item?.title ?? ""}
              </h4>

              {item?.description && (
                <div
                  className="text-zinc-700 font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: item.description,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}