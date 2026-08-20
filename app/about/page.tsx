import type { Metadata } from "next";
import SectionWaveDivider from "@/components/ui/SectionWaveDivider";
import AboutHero from "@/components/about/AboutHero";
import AboutSourcing from "@/components/about/AboutSourcing";
import AboutProcess from "@/components/about/AboutProcess";
import AboutStandFor from "@/components/about/AboutStandFor";
import AboutRoots from "@/components/about/AboutRoots";
import AboutFounder from "@/components/about/AboutFounder";
import AboutCTA from "@/components/about/AboutCTA";
import CTASection from "@/components/home/CTASection";
interface Detail {
  title: string | null;
  icon?: string | null;
  description: string;
}

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };

  banner: {
    title: string;
    sub: string;
    content: string;
    image: string;
  };

  sourcing: {
    title: string;
    sub: string;
    content: string;
    image: string;
  };

  process: {
    title: string;
    sub: string;
    content: string;
    image: string;
  };

  stand?: {
    title: string;
    detail: Detail[];
  };
 cta: {
    content:string;
    image: string;
  };
  why: {
  title: string;
    sub: string;
    content: string;
    detail: Detail[]; // API currently returns JSON string
    image: string;
  };

  founder: {
    title: string;
    sub: string;
    content: string;
    detail: Detail[]; // API currently returns JSON string
    image: string;
  };
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/about`, {
   next: {
      revalidate: 60,
    },
  });

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
export default async function AboutPage() {
      let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <main className="flex flex-col flex-1 pt-14 md:pt-24">
      {/* 1. Hero Section */}
      <AboutHero banner={data?.banner}/>

      {/* Wave divider into the next white section */}
      <SectionWaveDivider fill="#ffffff" overlap={60} />

      {/* 2. What We Offer & Sourcing Philosophy */}
      <AboutSourcing source={data?.sourcing}/>

      {/* 3. Discover Fruitlok & Freeze-Drying Technology */}
      <AboutProcess data={data?.process}/>

      {/* 4. What We Stand For Section */}
      <AboutStandFor data={data?.stand} />

      {/* 5. Why India? & Our Promise */}
      <AboutRoots data={data?.why} />

      {/* 6. Founder Section */}
      <AboutFounder data={data?.founder} />

      {/* CTA Section with cta.png background */}
      <CTASection cta={data?.cta }/>

      {/* Green organic wave overlapping the CTA section bottom to transition into the green footer */}
      <SectionWaveDivider fill="#218018" overlap={60} />

    </main>
  );
}
