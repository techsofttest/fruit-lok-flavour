"use client";

import React, { useState } from "react";
import Image from "next/image";
import JackfruitButton from "@/components/ui/JackfruitButton";

interface Review {
  id: number;
  heading: string;
  quote: string;
  author: string;
  role: string;
  photo: string;
  rating: number;
}

export default function ReviewsGrid({review}:{review:any[]}) {
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsLoading(false);
    }, 600);
  };

  const displayedReviews = review.slice(0, visibleCount);
  const hasMore = visibleCount < review.length;

  return (
    <section className="py-16 md:py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Grid of 2 reviews per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {displayedReviews.map((rev, index) => (
          <div
            key={rev.id}
            className={`bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden transition-all duration-300 ease-out ${
              index % 2 === 0 ? "rotate-2 hover:rotate-0" : "-rotate-2 hover:rotate-0"
            }`}
          >
            {/* Background quotation accent */}
            <span
              className="absolute top-2 right-6 font-serif text-brand-yellow/25 leading-none select-none pointer-events-none text-8xl"
              aria-hidden="true"
            >
              “
            </span>

            <div className="space-y-3 relative z-10">
              {/* Heading */}
              <div className="[&_h2]:font-flavours [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-semibold [&_h2]:text-brand-green [&_h2]:leading-snug [&_p]:text-zinc-700 [&_p]:text-sm [&_p]:md:text-base [&_p]:font-medium [&_p]:leading-relaxed [&_p]:italic" 
              dangerouslySetInnerHTML={{ __html:rev.description,}}/>        </div>

            {/* Author details with avatar photo */}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 relative z-10">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-200">
                <Image
                  src={rev.image}
                  alt={rev.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div>
                <p className="font-flavours text-lg font-semibold text-brand-green">
                  — {rev.name}
                </p>
                <p className="text-xs md:text-sm text-zinc-500 font-medium">
                  {rev.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <JackfruitButton
            variant="outline"
            colorClass="text-brand-green"
            textClass="text-brand-green"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading More Reviews...
              </span>
            ) : (
              "Load More Reviews"
            )}
          </JackfruitButton>
        </div>
      )}
    </section>
  );
}
