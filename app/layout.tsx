import type { Metadata } from "next";
import { Pacifico, Patrick_Hand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: ["400"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: ["400"],
});

export interface ContactData {
  address?: string;
  phone?: string;
  phone2?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}
export interface ProductData {
  image?: string;
  name?: string;
  slug?: string;
  description?: string;
}

interface LayoutResponse {
  contact?: ContactData;
  product?: ProductData[];
}

async function getSEO(): Promise<LayoutResponse | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.warn("NEXT_PUBLIC_API_URL is not defined in environment variables.");
    return null;
  }

  try {
    const res = await fetch(`${baseUrl}/layout`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch SEO layout data: ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching layout data:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getSEO();

  return (
    <html
      lang="en"
      className={`${pacifico.variable} ${patrickHand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background">
        <Navbar product={data?.product ??[]} />
        <main className="flex-1">{children}</main>
        <Footer contact={data?.contact} product={data?.product??[]}/>
      </body>
    </html>
  );
}