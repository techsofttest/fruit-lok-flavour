// components/home/ProductsSection.tsx
"use client";
import React, { useRef } from "react";
import JackfruitButton from "@/components/ui/JackfruitButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "@/components/product/ProductCard";

// Import Swiper styles
import "swiper/css";
import Link from "next/link";

export default function ProductsSection({product}:{product:any[]}) {
  const swiperRef = useRef<any>(null);

  return (
    <section id="products" className="relative bg-white text-foreground pt-12 pb-24 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <div className="text-center mb-24">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            Our Portfolio
          </p>
          <h2 className="font-flavours text-brand-green text-5xl md:text-[56px] font-bold tracking-tight">
            Pure &amp; Authentic <br /> Fruit Solutions
          </h2>
        </div>

        {/* Swiper Container with absolute positioned 3D nav buttons on the left and right ends */}
        <div className="max-w-6xl mx-auto px-16 relative overflow-visible pt-16">

          {/* 3D Prev Button - Left End */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 group cursor-pointer focus:outline-none select-none"
          >
            {/* Shadow layer */}
            <span className="absolute inset-0 rounded-full bg-[#12470d] translate-y-1" />
            {/* Face layer */}
            <span className="relative flex w-12 h-12 rounded-full bg-white border-2 border-brand-green text-brand-green items-center justify-center transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-active:translate-y-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          </button>

          {/* 3D Next Button - Right End */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 group cursor-pointer focus:outline-none select-none"
          >
            {/* Shadow layer */}
            <span className="absolute inset-0 rounded-full bg-[#12470d] translate-y-1" />
            {/* Face layer */}
            <span className="relative flex w-12 h-12 rounded-full bg-white border-2 border-brand-green text-brand-green items-center justify-center transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-active:translate-y-1">
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
            loop={true}
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
            {product.map((product, index) => (
              <SwiperSlide key={index} className="!overflow-visible pt-32 -mt-32 pb-8">
                <ProductCard product={product} priority={index < 2} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-center mt-8">
          <Link href="/products" className="inline-block">
            <JackfruitButton id="explore-products-btn" variant="filled">
              Explore All Products
            </JackfruitButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
