import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductMarquee from "@/components/product/ProductMarquee";
import ProductFAQ from "@/components/product/ProductFAQ";
import OtherProductsCarousel from "@/components/product/OtherProductsCarousel";
import SectionWaveDivider from "@/components/ui/SectionWaveDivider";
import CTASection from "@/components/home/CTASection";

export interface ProductDetailItem {
  id: number;
  name: string;
  slug: string;
  mainimg: string;
  pdf: string;
  galimg: string[];
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
    ingredients: string;
    nutritional_info: {
      calories: string;
      fat: string;
      carbs: string;
      protein: string;
      fiber: string;
    };
    tagline: string;
  };
}

export interface FAQItem {
  title:string;
  detail:{ title: string;
  description: string;}[];
}

export interface BlogResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  pro: ProductDetailItem;
  products: ProductDetailItem[];
  faq: FAQItem; 
  cta: {
    content:string;
    image: string;
  };
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch single product data + SEO info
async function getBlogData(slug: string): Promise<BlogResponse | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/product/${slug}`);

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch product post:", error);
    return null;
  }
}

// Pre-render static paths for all products
export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/products`);
    if (!res.ok) return [];

    const products: ProductDetailItem[] = await res.json();
    return products.map((item) => ({
      slug: String(item.slug),
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogData(slug);

  if (!data || !data.pro) {
    return { title: "Product Not Found | Fruitlok" };
  }

  return {
    title: data.seo?.meta_title || "",
    description: data.seo?.meta_desc || "",
    keywords: data.seo?.meta_key || "",
    openGraph: {
      title: data.seo?.meta_title || "",
      description: data.seo?.meta_desc || "",
    },
  };
}

// Main route handler
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = await getBlogData(slug);

  if (!data || !data.pro) {
    notFound();
  }

  return (
    <main className="flex flex-col flex-1 pt-14 md:pt-24 bg-white max-w-full">
         {/* 50/50 Screen Split Layout */}
         <div className="w-full max-w-full">
           <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
             {/* Left Sticky Gallery Column */}
             <ProductGallery product={data.pro} />
   
             {/* Right Product Details Info Column */}
             <ProductInfo product={data.pro} />
           </div>
         </div>
   
         {/* Marquee slider */}
         <ProductMarquee />
   
         {/* Other Products Carousel */}
         <OtherProductsCarousel
           products={data.products??[]}
           title="Explore Other Refreshing Flavours"
           subtitle="You May Also Like"
         />
   
         {/* Frequently Asked Questions */}
         <ProductFAQ faq={data.faq} />
   
         {/* CTA Section */}
         <CTASection cta={data?.cta  }/>
   
         {/* Wave Transition */}
         <SectionWaveDivider fill="#218018" overlap={60} />
       </main>
  );
}