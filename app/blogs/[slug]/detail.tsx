import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionWaveDivider from "@/components/ui/SectionWaveDivider";
import CTASection from "@/components/home/CTASection";
import type { BlogItem } from "./page";

interface DetailProps {
  blog: BlogItem;
  cta: {
    content:string;
    image: string;
  };
}

export default function BlogPage({ blog,cta }: DetailProps) {
  return (
    <main className="flex flex-col flex-1 pt-20 md:pt-32 bg-white text-zinc-950">
      <article className="max-w-4xl mx-auto px-6 md:px-12 w-full space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500">
          <Link href="/blogs" className="text-brand-green hover:underline">
            &larr; All Articles
          </Link>
          <span>/</span>
          <span className="text-zinc-700 truncate">{blog.title}</span>
        </div>

        {/* Category & Date */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-brand-green/10 text-brand-green text-xs font-semibold px-4 py-1.5 rounded-full">
              {blog.category}
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              {blog.date}
            </span>
          </div>

          <h1 className="font-flavours text-4xl md:text-6xl font-semibold text-zinc-900 leading-tight">
            {blog.title}
          </h1>

          {/* Author Details */}
          <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-200">
              <Image
                src={blog.authorimg || "/placeholder-avatar.webp"}
                alt={blog.name}
                fill
                className="object-cover object-center"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                {blog.name}
              </p>
              <p className="text-xs text-zinc-500 font-medium">
                {blog.role}
              </p>
            </div>
          </div>
        </div>

        {/* Feature Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden border border-zinc-100">
          <Image
            src={blog.image || "/placeholder-cover.webp"}
            alt={blog.title}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* HTML Content Body */}
        <div className="space-y-8 text-zinc-700 leading-relaxed font-medium text-base md:text-lg pt-4 pb-12 border-b border-zinc-200">

          <p className="text-lg md:text-xl font-semibold text-zinc-900 leading-relaxed bg-brand-green/5 border-l-4 border-brand-green p-6 rounded-r-2xl">

            {blog.intro}

          </p>


            <div className="">

              <div className="space-y-4 pt-4 [&_h2]:font-flavours [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_p]:text-zinc-700 [&_p]:leading-relaxed
               [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:marker:text-brand-green [&_ul]:text-zinc-800 [&_li]font-medium" dangerouslySetInnerHTML={{__html:blog.body}}/>

            </div>

          



          <div className="bg-zinc-50 p-6 md:p-8 rounded-3xl border border-zinc-100 space-y-2 mt-8">

            <h3 className="font-flavours text-xl font-semibold text-brand-green">

              Key Takeaway

            </h3>

            <p className="text-zinc-800 font-medium">

              {blog.conclusion}

            </p>

          </div>

        </div>
        {/* Actions / Navigation Links */}
        <div className="pt-4 pb-12 flex justify-between items-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:underline"
          >
            &larr; Back to all articles
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:underline"
          >
            Request Samples &rarr;
          </Link>
        </div>
      </article>

      {/* Footer CTA & Wave Dividers */}
      <CTASection cta={cta}/>
      <SectionWaveDivider fill="#218018" overlap={60} />
    </main>
  );
}