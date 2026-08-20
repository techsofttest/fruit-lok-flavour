"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "@/components/product/ProductCard";

// Import Swiper styles
import "swiper/css";

export interface ProductDetailItem {
  id: number;
  name: string;
  slug: string;
  mainimg: string;
  description: string;
  details: {
    detailed_description: {
      title: string;
      description: string;
    }[];
    panel_bg: string;
    card_bg: string;
    rating: string;
    reviews: string;
    origin: string;
    tagline: string;
  };
}
interface OtherProductsCarouselProps {
  currentProductId?: string;
  title?: string;
  subtitle?: string;
  products:ProductDetailItem[];
}

export default function OtherProductsCarousel({
  products,
  title = "Explore Other Pure & Authentic Flavours",
  subtitle = "More Flavours To Love",
}: OtherProductsCarouselProps) {
  const swiperRef = useRef<any>(null);

  return (
    <section className="relative bg-white text-foreground py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {subtitle}
          </p>
          <h2 className="font-flavours text-brand-green text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {title}
          </h2>
        </div>

        {/* Swiper Container with 3D nav buttons */}
        <div className="max-w-6xl mx-auto px-4 sm:px-12 md:px-16 relative overflow-visible pt-16">
          {/* 3D Prev Button */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 group cursor-pointer focus:outline-none select-none"
          >
            <span className="absolute inset-0 rounded-full bg-[#12470d] translate-y-1" />
            <span className="relative flex w-12 h-12 rounded-full bg-white border-2 border-brand-green text-brand-green items-center justify-center transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-active:translate-y-1 shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          </button>

          {/* 3D Next Button */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 group cursor-pointer focus:outline-none select-none"
          >
            <span className="absolute inset-0 rounded-full bg-[#12470d] translate-y-1" />
            <span className="relative flex w-12 h-12 rounded-full bg-white border-2 border-brand-green text-brand-green items-center justify-center transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-active:translate-y-1 shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>

          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation]}
            spaceBetween={32}
            slidesPerView={1}
            loop={products.length > 2}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className="w-full !overflow-visible"
          >
            {products.map((prod, index) => (
              <SwiperSlide key={prod.id || index} className="!overflow-visible pt-32 -mt-32 pb-8">
                <ProductCard product={prod} priority={index < 2} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
