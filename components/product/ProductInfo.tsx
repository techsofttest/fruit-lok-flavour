"use client";
import Link from "next/link";
import { useState } from "react";
import JackfruitButton from "@/components/ui/JackfruitButton";

interface ProductDetailItem {
  product: {
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
  };
}

export default function ProductInfo({ product }: ProductDetailItem) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    0: true,
  });
  const [isDownloading, setIsDownloading] = useState(false);

  const toggleSection = (key: string | number) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Fixed function to handle opening in new tab and forcing a direct file download
  const handlePdfAction = async () => {
    if (!product.pdf) return;

    const pdfUrl = product.pdf;
    setIsDownloading(true);

    try {
      // 1. Open PDF in a new tab for instant viewing
      window.open(pdfUrl, "_blank", "noopener,noreferrer");

      // 2. Fetch the file as a blob to force direct browser download
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = `${product.slug || "product"}-spec-sheet.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Cleanup DOM and Blob URL
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed, falling back to direct link:", error);
      
      // Fallback method if fetch fails (e.g., CORS restrictions)
      const downloadLink = document.createElement("a");
      downloadLink.href = pdfUrl;
      downloadLink.target = "_blank";
      downloadLink.download = `${product.slug || "product"}-spec-sheet.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 md:p-12 lg:p-16 space-y-6 sm:space-y-8 flex flex-col justify-center">
      <div>
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-brand-green mb-2">
          {product.details.tagline || ""}
        </p>
        <h1 className="font-flavours text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-green leading-tight mb-3">
          {product.name || ""}
        </h1>

        {/* Star Rating & PDF Button */}
        <div className="flex flex-wrap items-center gap-4">
          {product.details.rating && (
          <div className="flex items-center gap-2">
            <div className="flex text-brand-yellow text-xl">
              {"★".repeat(Math.round(parseFloat(product.details.rating || "0")))}
            </div>
            <span className="text-sm font-bold text-zinc-600">
              {product.details.rating} rating
            </span>
          </div>)}

          {/* {product.pdf && (
            <button
              type="button"
              onClick={handlePdfAction}
              disabled={isDownloading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-zinc-100 text-brand-green font-bold text-sm rounded-xl border border-brand-green/30 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {isDownloading ? "Downloading..." : "Download Tech Spec (PDF)"}
            </button>
          )} */}
          {product.pdf && (
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/products/download-pdf/${product.pdf.split('/').pop()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-zinc-100 text-brand-green font-bold text-sm rounded-xl border border-brand-green/30 shadow-xs transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Tech Spec (PDF)
          </a>
        )}
        </div>
      </div>

      {/* Accordion Section */}
      <div className="border-t border-b border-zinc-200 divide-y divide-zinc-200">
        {Array.isArray(product.details?.detailed_description) &&
          product.details.detailed_description.length > 0 &&
          product.details.detailed_description.map((item, idx) => {
            const isOpen = openSections[idx];

            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between text-left group focus:outline-none cursor-pointer"
                >
                  <span className="text-base md:text-lg font-bold text-zinc-900 group-hover:text-brand-green transition-colors">
                    {item?.title || ""}
                  </span>

                  <svg
                    className={`w-5 h-5 text-zinc-700 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isOpen && item?.description && (
                  <div className="mt-3 text-zinc-600 transition-all duration-200">
                    {item.description}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Origin & Ingredients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
          {product.details.origin && (
        <div>
          <h4 className="text-sm font-bold uppercase text-brand-green mb-1">Origin</h4>
          <p className="text-base text-zinc-900 font-bold">{product.details.origin || ""}</p>
        </div>)}
        {product.details.ingredients && (
        <div>
          <h4 className="text-sm font-bold uppercase text-brand-green mb-1">Ingredients</h4>
          <p className="text-base text-zinc-900 font-bold">{product.details.ingredients || ""}</p>
        </div>)}
      </div>

      {/* Nutritional Table */}
      <div className="space-y-4">
        <h3 className="font-flavours text-2xl font-extrabold text-zinc-900">
          Nutritional Information (Typical Values)
        </h3>

        <div className="border border-zinc-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 bg-zinc-50 py-3 px-4 border-b border-zinc-200 font-bold text-sm text-zinc-600">
            <div>Nutrient</div>
            <div>Per 100g</div>
          </div>
          <div className="divide-y divide-zinc-200 font-semibold text-zinc-700 text-sm">
            {product.details.nutritional_info.calories && (
            <div className="grid grid-cols-2 py-3 px-4">
              <div>Calories</div>
              <div className="text-zinc-950 font-bold">{product.details.nutritional_info.calories}</div>
            </div>)}
            {product.details.nutritional_info.fat && (
            <div className="grid grid-cols-2 py-3 px-4">
              <div>Fat</div>
              <div className="text-zinc-950 font-bold">{product.details.nutritional_info.fat}</div>
            </div>)}
            {product.details.nutritional_info.carbs && (
            <div className="grid grid-cols-2 py-3 px-4">
              <div>Carbohydrates</div>
              <div className="text-zinc-950 font-bold">{product.details.nutritional_info.carbs}</div>
            </div>)}
            {product.details.nutritional_info.protein && (
            <div className="grid grid-cols-2 py-3 px-4">
              <div>Protein</div>
              <div className="text-zinc-950 font-bold">{product.details.nutritional_info.protein}</div>
            </div>)}
            {product.details.nutritional_info.fiber && (
            <div className="grid grid-cols-2 py-3 px-4">
              <div>Dietary Fiber</div>
              <div className="text-zinc-950 font-bold">{product.details.nutritional_info.fiber ||""}</div>
            </div>)}
          </div>
        </div>
      </div>

      {/* B2B Call to Action */}
      <div className="bg-brand-green/5 border border-brand-green/15 rounded-[2rem] p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link href="/contact" className="inline-block">
            <JackfruitButton variant="filled" className="whitespace-nowrap w-full sm:w-auto">
              Request Samples
            </JackfruitButton>
          </Link>
          <p className="text-sm font-bold text-brand-green max-w-sm leading-relaxed">
            *Free sample batches are available for registered food manufacturers and wholesale brands.
          </p>
        </div>
      </div>
    </div>
  );
}