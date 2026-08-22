import Link from "next/link";
import Image from "next/image";

export interface ProductDetailItem {
  id: number;
  name: string;
  slug: string;
  mainimg: string;
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
    tagline: string;
  };
}
interface ProductCardProps {
  product: ProductDetailItem;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group !overflow-visible block pt-32 -mt-32 pb-8 cursor-pointer w-full max-w-[340px] mx-auto"
    >
      <div
        style={{ backgroundColor: product.details.card_bg  || ""}}
        className="relative overflow-visible rounded-[2.5rem] p-6 pt-0 pb-5 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-black/5 h-[370px]"
      >
        {/* Pattern Overlay on Card Background */}
        <div
          className="absolute inset-0 rounded-[2.5rem] opacity-[0.5] pointer-events-none mix-blend-overlay z-0"
          style={{
            backgroundImage: "url('/pattern/pattern.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Pocket/Envelope Panel Container with Card Background Color */}
        <div
          style={{ backgroundColor: product.details.panel_bg || ""}}
          className="relative -mx-6 h-48 rounded-t-[2.5rem] rounded-b-[2rem] mb-5 flex items-center justify-center overflow-visible transition-transform duration-500 group-hover:scale-[0.98] z-10"
        >
          {/* Black gradient overlay on the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/25 to-transparent rounded-b-[2rem] pointer-events-none z-0" />

          {/* Product PNG Image - overflows card top */}
           {product.mainimg&& (
          <div className="absolute -top-32 bottom-2 left-1/2 -translate-x-1/2 w-60 z-10 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-3">
            <Image
              src={product.mainimg ||""}
              alt={product.name||""}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-contain object-bottom"
              priority={priority}
            />
          </div>)}
        </div>

        {/* Product Details */}
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4 text-white">
          {/* Star Ratings */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex text-white text-lg">
              {[1, 2, 3, 4, 5].map((star) => {
                const rating = parseFloat(product.details.rating || "0");

                return (
                  <span
                    key={star}
                    className={
                      star <= Math.round(rating)
                        ? "text-zinc-500"
                        : "text-brand-white"
                    }
                  >
                    ★
                  </span>
                );
              })}
            </div>
             {/* {Number(product?.details?.reviews) > 0 && (    
            <span className="text-sm font-semibold text-white/80">
              ({product.details.reviews })
            </span>)} */}
          </div>

          {/* Name */}
          <h3 className="font-flavours text-2xl md:text-3xl font-extrabold text-white mb-2">
            {product.name|| ""}
          </h3>

          {/* Description */}
          <p className="text-xs md:text-sm font-medium text-white/90 line-clamp-2 max-w-sm">
            {product.description || ""}
          </p>
        </div>
      </div>
    </Link>
  );
}
