import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProductsSection from "@/components/home/ProductsSection";
import JackfruitFeature from "@/components/home/JackfruitFeature";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import CTASection from "@/components/home/CTASection";
import SectionWaveDivider from "@/components/ui/SectionWaveDivider";

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
    banner:{
    id:number;
    title: string;
    content:string;
    color: string;
    image: string;
    imgalt: string;
  }[],
  product:  {
    id: number;
  name: string;
  slug: string;
  mainimg: string;
  description: string;

  details?: {
    detailed_description?: {
      title: string;
      description: string;
    }[];
    panel_bg?: string;
    card_bg?: string;
    rating?: string;
    reviews?: string | number;
    origin?: string;
    tagline?: string;
  };
  }[];
    page: {
    content:string;
    image: string;
  };
     cta: {
    content:string;
    image: string;
  };
     who: {
       title:string;
    sub: string;
    content:string;
    image: string;
  };
 review:  {
    name: string;
    description: string;
    image: string;
    designation: string;
  }[];
   partner:  {
    title: string;
    desc: string;
    image: string;
  }[];
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/pages`);

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

export default async function Home() {
     let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <main className="flex flex-col flex-1">
      <HeroSection banner={data?.banner ?? []}/>

      {/* White organic wave that overlaps the hero bottom */}
      <SectionWaveDivider fill="#ffffff" overlap={80} />

      <ProductsSection  product={data?.product ??[]} />

      {/* Jackfruit spotlight */}
      <JackfruitFeature page={data?.page ?? ""} />

      {/* Short brand intro — white bg, brand-green title */}
      <AboutSection who={data?.who} />

      {/* Client testimonials — green bg slider */}
      <TestimonialsSection review={data?.review ??[]} />

      <WhyUsSection partner={data?.partner ?? []}  />

      {/* CTA Section with cta.png background */}
      <CTASection  cta={data?.cta }/>

      {/* Green organic wave overlapping the CTA section bottom to transition into the green footer */}
      <SectionWaveDivider fill="#218018" overlap={60} />
    </main>
  );
}