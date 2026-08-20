// app/products/page.tsx
import SectionWaveDivider from "@/components/ui/SectionWaveDivider";
import ProductCard from "@/components/product/ProductCard";
import CTASection from "@/components/home/CTASection";
import PageHeroBanner from "@/components/global/PageHeroBanner";

export default function ProductsPage({banner,product,cta}:{banner:any,product:any[],cta:any}) {
  return (
    <main className="flex flex-col flex-1 pt-14 md:pt-24 bg-white text-foreground">
      {/* Product Hero Banner Component */}
      <PageHeroBanner
        tagline={banner.title}
        title={banner.sub}
        description={banner.content}
      />

      {/* Organic Wave Divider */}
      <SectionWaveDivider fill="#ffffff" overlap={60} />

      {/* Product Cards Grid (Centered layout) */}
      <section className="py-16 px-6 md:px-12 relative z-30">
        <div className="max-w-6xl mx-auto">
          {/* Centered Flexbox wrap to beautifully align uneven rows (like 5 items) in the center */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 mt-8">
            {product.map((product, index) => (
              <div key={product.id} className="w-full sm:w-[340px]">
                <ProductCard product={product} priority={index < 3} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection cta={cta }/>

      {/* Wave Transition */}
      <SectionWaveDivider fill="#218018" overlap={60} />
    </main>
  );
}
