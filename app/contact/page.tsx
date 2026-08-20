import type { Metadata } from "next";
import ContactPage from "./contact";

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
  };
    page:{
    title: string;
    content:string;
    sub: string;
image: string;
  }; 
  contact:{
    address?: string;
  phone?: string;
  phone2?: string;
  email?: string;
  map?: string;
  }
  
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/contact`);

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
     <ContactPage banner={ data?.banner} page={ data?.page} contact={ data?.contact} />
    </main>
  );
}