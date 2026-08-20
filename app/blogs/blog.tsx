"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionWaveDivider from "@/components/ui/SectionWaveDivider";
import CTASection from "@/components/home/CTASection";
import PageHeroBanner from "@/components/global/PageHeroBanner";

export default function BlogsPage({ banner, blog ,cta}: { banner: any; cta: any; blog: any[];}) {
  return (
    <main className="flex flex-col flex-1 pt-14 md:pt-24 bg-white text-zinc-950">
      {/* Hero Banner Component */}
      <PageHeroBanner
        tagline={banner.title}
        title={banner.sub}
        description={banner.content}
      />

      {/* Organic Wave Divider */}
      <SectionWaveDivider fill="#ffffff" overlap={60} />

      {/* Blogs Listing Grid Section */}
      <section className="py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full relative z-30">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-10">
          {blog.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="group bg-white border border-zinc-200 rounded-2xl sm:rounded-[2.5rem] p-3.5 sm:p-6 flex flex-col justify-between hover:border-brand-green transition-all duration-300"
            >
              <div className="space-y-2.5 sm:space-y-4">
                {/* Cover Image Container */}
                <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Category & Date */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 pt-0.5">
                  <span className="bg-brand-green/10 text-brand-green text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full truncate max-w-[110px] sm:max-w-none">
                    {post.category}
                  </span>
                  <span className="text-[10px] sm:text-xs text-zinc-500 font-medium">
                    {post.date}
                  </span>
                </div>

                {/* Post Title */}
                <h2 className="font-flavours text-sm sm:text-xl md:text-2xl font-semibold text-zinc-900 group-hover:text-brand-green transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <div className="text-zinc-600 text-xs sm:text-sm font-medium leading-relaxed line-clamp-2 sm:line-clamp-3"dangerouslySetInnerHTML={{__html:post.description}} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection cta={cta }/>

      {/* Wave Transition */}
      <SectionWaveDivider fill="#218018" overlap={60} />
    </main>
  );
}
