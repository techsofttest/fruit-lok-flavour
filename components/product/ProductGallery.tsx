"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ProductDetailItem {
  product: {
    id: number;
    name: string;
    mainimg: string;
    galimg: string[];
  };
}

export default function ProductGallery({ product }: ProductDetailItem) {
  const [activeImage, setActiveImage] = useState(product.mainimg);

  // Combine mainimg with galimg so mainimg appears in the thumbnail gallery (de-duplicated)
  const allImages = Array.from(
    new Set([product.mainimg, ...(product.galimg || [])])
  );

  return (
    <div className="lg:sticky lg:top-28 bg-brand-green/10 p-6 sm:p-8 md:p-12 lg:p-16 rounded-3xl lg:rounded-l-none lg:rounded-r-[2.5rem] lg:self-start max-w-full">
      {/* Breadcrumbs inside the green panel */}
      <nav className="text-xs sm:text-sm font-bold text-brand-green/90 mb-4 sm:mb-6 flex flex-wrap items-center gap-1.5 sm:gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>&gt;</span>
        <Link href="/products" className="hover:underline">Products</Link>
        <span>&gt;</span>
        <span className="text-zinc-700 font-bold truncate max-w-[150px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      <div className="relative w-full aspect-square bg-white rounded-[2.5rem] border border-zinc-100 flex items-center justify-center p-8 overflow-hidden">
        {/* Background design pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "url('/pattern/pattern.png')",
            backgroundSize: "cover",
          }}
        />
        <div className="relative w-full h-full">
          <Image
            src={activeImage}
            alt={product.name}
            fill
            className="object-contain object-center transition-all duration-300"
            priority
          />
        </div>
      </div>

      {/* Thumbnails Carousel */}
      <div className="mt-4 pt-4 pb-2 w-full flex justify-center max-w-full overflow-hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          centerInsufficientSlides={true}
          className="w-full flex justify-center max-w-full overflow-hidden"
        >
          {allImages.map((img, idx) => (
            <SwiperSlide key={idx} className="!w-auto flex justify-center py-2">
              <button
                type="button"
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-20 rounded-2xl bg-white border overflow-hidden flex-shrink-0 cursor-pointer transition-all ${
                  activeImage === img
                    ? "border-brand-green scale-105 shadow-sm"
                    : "border-zinc-200 hover:border-brand-green/50"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} gallery image ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}