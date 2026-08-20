import type { Metadata } from "next";
import ProductPage from "./product";

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
    banner:{
    title: string;
    content:string;
    sub: string;
  }; cta: {
    content:string;
    image: string;
  };
  product:{
    id: number;
    name:string;
    slug:string;
    mainimg:string;
    description: string;
    details: {
      detailed_description:string;
      panel_bg:string;
      card_bg:string;
      rating:string;
      reviews:string;
      origin: string;
      ingredients: string;
      nutritional_info: {
        calories: string;
        fat: string;
        carbs: string;
        protein:string;
        fiber: string;
      }
    }  
  }[];
  
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/product`, {
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


export default async function Home() {
     let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <main className="flex flex-col flex-1">
     <ProductPage banner={ data?.banner} product={ data?.product ?? []} cta={data?.cta ?? ""} />
    </main>
  );
}