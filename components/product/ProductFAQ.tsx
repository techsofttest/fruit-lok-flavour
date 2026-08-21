"use client";

import { useState } from "react";

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
  // Index 0 is open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faq) {
    return null;
  }

  const details = Array.isArray(faq.detail) ? faq.detail : [];

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="my-24 max-w-4xl mx-auto px-6 space-y-6">
      <h2 className="font-flavours text-3xl md:text-4xl font-extrabold text-center text-brand-green mb-8">
        {faq.title}
      </h2>

      {details.length > 0 && (
        <div className="space-y-4">
          {details.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-zinc-50 rounded-3xl border border-zinc-100 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                >
                  <h4 className="font-flavours text-xl font-extrabold text-brand-green">
                    {item?.title ?? ""}
                  </h4>
                  <span className="text-brand-green text-2xl font-bold ml-4">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && item?.description && (
                  <div className="px-6 pb-6 text-zinc-700 font-semibold border-t border-zinc-100 pt-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}