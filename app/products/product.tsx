"use client";

import React, { useState } from "react";
import SectionWaveDivider from "@/components/ui/SectionWaveDivider";
import ProductCard from "@/components/product/ProductCard";
import CTASection from "@/components/home/CTASection";
import PageHeroBanner from "@/components/global/PageHeroBanner";
import JackfruitButton from "@/components/ui/JackfruitButton";

export default function ProductsPage({banner,product,cta}:{banner:any,product:any[],cta:any}) {
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsLoading(false);
    }, 600);
  };

  const displayedProducts = product.slice(0, visibleCount);
  const hasMore = visibleCount < product.length;

  return (
    <main className="flex flex-col flex-1 pt-14 md:pt-24 bg-white text-foreground">
      {/* Product Hero Banner Component */}
      <PageHeroBanner
        tagline={banner?.title}
        title={banner?.sub}
        description={banner?.content}
      />

      {/* Organic Wave Divider */}
      <SectionWaveDivider fill="#ffffff" overlap={60} />

      {/* Product Cards Grid */}
      <section className="py-16 px-6 md:px-12 relative z-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 mt-8">
            {displayedProducts.map((item, index) => (
              <div key={item.id || index} className="w-full sm:w-[340px]">
                <ProductCard product={item} priority={index < 3} />
              </div>
            ))}
          </div>
        </div>

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
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading More Products...
                </span>
              ) : (
                "Load More Products"
              )}
            </JackfruitButton>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <CTASection cta={cta} />

      {/* Wave Transition */}
      <SectionWaveDivider fill="#218018" overlap={60} />
    </main>
  );
}