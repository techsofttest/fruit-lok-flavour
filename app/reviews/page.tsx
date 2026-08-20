import type { Metadata } from "next";
import React from "react";
import SectionWaveDivider from "@/components/ui/SectionWaveDivider";
import ReviewsGrid from "@/components/reviews/ReviewsGrid";
import CTASection from "@/components/home/CTASection";
import PageHeroBanner from "@/components/global/PageHeroBanner";

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
     banner: {
       title:string;
    sub: string;
    content:string;
  }; cta: {
    content:string;
    image: string;
  };
 review:  {
    id: string;
    name: string;
    description: string;
    image: string;
    designation: string;
  }[];
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/testimony`);

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getSEO();

    return {
      title: data?.seo?.meta_title ?? "Home",
      description: data?.seo?.meta_desc ?? "",
      keywords: data?.seo?.meta_key ?? "",
    };
  } catch (error) {
    return {
      title: "Home",
    };
  }
}

export default async function ReviewsPage() {
  let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <main className="flex flex-col flex-1 pt-14 md:pt-24 bg-white text-foreground">
      {/* Hero Banner Component */}
      <PageHeroBanner
        tagline={data?.banner.title ?? ""}
        title={data?.banner.sub ?? ""}
        description={data?.banner.content}
      />

      {/* Organic Wave Divider */}
      <SectionWaveDivider fill="#ffffff" overlap={60} />

      {/* 2-Column Reviews Grid Component */}
      <ReviewsGrid review={data?.review ?? []} />

      {/* CTA Section */}
      <CTASection cta={data?.cta } />

      {/* Wave Transition */}
      <SectionWaveDivider fill="#218018" overlap={60} />
    </main>
  );
}
