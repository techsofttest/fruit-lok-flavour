import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPage from "./detail";

export interface BlogItem {
  id: string | number;
  name: string;
  role: string;
  date: string;
  image: string;
  authorimg: string;
  title: string;
  body: string;
  slug: string;
  category: string;
  conclusion:string
   intro:string
}

export interface BlogResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  blog: BlogItem;
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

// Fetch single blog entry + SEO data
async function getBlogData(slug: string): Promise<BlogResponse | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/blog/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return null;
  }
}

// Pre-render static paths
export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/blogs`);
    if (!res.ok) return [];

    const blogs: BlogItem[] = await res.json();
    return blogs.map((post) => ({
      slug: String(post.slug),
    }));
  } catch {
    return [];
  }
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogData(slug);

  if (!data || !data.blog) {
    return { title: "Article Not Found | Fruitlok" };
  }

  return {
    title: data.seo?.meta_title || `${data.blog.title} | Fruitlok`,
    description: data.seo?.meta_desc || "",
    keywords: data.seo?.meta_key || data.blog.category || "",
    openGraph: {
      title: data.seo?.meta_title || data.blog.title,
      description: data.seo?.meta_desc || "",
      images: data.blog.image ? [data.blog.image] : [],
    },
  };
}

// Main route handler
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = await getBlogData(slug);

  if (!data || !data.blog) {
    notFound();
  }

  return <BlogPage blog={data.blog} cta={data?.cta } />;
}