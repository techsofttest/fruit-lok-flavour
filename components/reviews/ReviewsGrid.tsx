"use client";

import React, { useState } from "react";
import Image from "next/image";
import JackfruitButton from "@/components/ui/JackfruitButton";

interface Review {
  id: number;
  heading: string;
  quote: string;
  author: string;
  role: string;
  photo: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    heading: "A WHOLE lotta love for our whole fruit!",
    quote:
      "Fruitlok's freeze-dried jackfruit powder is unlike anything else on the market. The flavour is incredibly authentic — our customers love the difference it makes in our product formulation.",
    author: "Ananya R.",
    role: "Product Development Lead, NutriCraft Foods",
    photo: "/awatar/Photo by Luise and Nic.jpg",
    rating: 5,
  },
  {
    id: 2,
    heading: "Unmatched quality and consistency!",
    quote:
      "Consistent quality, lot after lot. The MRL testing gives us full confidence when exporting to European markets. Fruitlok has become our most trusted ingredient partner.",
    author: "Priya M.",
    role: "Quality Assurance Manager, TropicBlend Exports",
    photo: "/awatar/Photo by Taylor.jpg",
    rating: 5,
  },
  {
    id: 3,
    heading: "Pure tropical goodness in every pack!",
    quote:
      "Working with Fruitlok means we never compromise on tropical authenticity. Their mango powder gives our beverages a freshness no artificial flavouring can replicate.",
    author: "Rajan K.",
    role: "CEO, SunSip Beverages",
    photo: "/awatar/Photo by Luise and Nic-1.jpg",
    rating: 5,
  },
  {
    id: 4,
    heading: "Exceptional crisp texture and natural sweetness!",
    quote:
      "The freeze-dried mango slices hold their structure amazingly well in baking mixes and cereal bowls. Crisp, natural, and completely free of added sugars.",
    author: "Marcus Vance",
    role: "Senior R&D Chef, Artisan Bakers Co.",
    photo: "/awatar/Photo by Luise and Nic-2.jpg",
    rating: 5,
  },
  {
    id: 5,
    heading: "Reliable bulk supply and export standards!",
    quote:
      "Fruitlok delivers export-grade purity with every batch. Their customer service and quick sample turnaround make our supply chain seamless.",
    author: "Sophia Chen",
    role: "Sourcing Manager, Global Health Foods",
    photo: "/awatar/Photo by Luise and Nic-3.jpg",
    rating: 5,
  },
  {
    id: 6,
    heading: "Bold flavor profile & crisp peppercorn notes!",
    quote:
      "The freeze-dried green peppercorns rehydrate rapidly and deliver an incredible aroma to our premium spice blends. A game-changer for gourmet manufacturing.",
    author: "David Miller",
    role: "Master Blender, SpiceCraft International",
    photo: "/awatar/Photo by Luise and Nic-4.jpg",
    rating: 5,
  },
  {
    id: 7,
    heading: "Essential ingredient for clean label products!",
    quote:
      "Zero additives and zero synthetic preservatives. Our health-conscious consumers demand transparency, and Fruitlok provides 100% pure fruit powders.",
    author: "Elena Rostova",
    role: "Head of Ingredient Sourcing, BioPure Organics",
    photo: "/awatar/Photo by Luise and Nic.jpg",
    rating: 5,
  },
  {
    id: 8,
    heading: "Incredible shelf stability and aroma preservation!",
    quote:
      "Even after 12 months in inventory, Fruitlok's jackfruit pieces retain their vibrant aroma and original crunch. Highly recommended for industrial food processing.",
    author: "Vikram Sharma",
    role: "Plant Manager, Apex FoodTech India",
    photo: "/awatar/Photo by Taylor.jpg",
    rating: 5,
  },
  {
    id: 9,
    heading: "Smooth integration into dairy & plant-based yogurts!",
    quote:
      "We tested multiple freeze-dried mango suppliers before choosing Fruitlok. The solubility and natural golden hue elevate our premium yogurt line.",
    author: "Camille Dubois",
    role: "Senior Product Manager, Lait&Fruit France",
    photo: "/awatar/Photo by Luise and Nic-1.jpg",
    rating: 5,
  },
  {
    id: 10,
    heading: "Outstanding customer service and rapid sampling!",
    quote:
      "Whenever our team requests custom mesh size samples for R&D, Fruitlok responds within 48 hours. Their technical guidance is invaluable.",
    author: "Jonathan Hayes",
    role: "Technical Sourcing Lead, FlavorWorks North America",
    photo: "/awatar/Photo by Luise and Nic-2.jpg",
    rating: 5,
  },
  {
    id: 11,
    heading: "Authentic tropical flavor profile for confectionery!",
    quote:
      "Adding Fruitlok freeze-dried jackfruit bits into our dark chocolate bars created an instant bestseller. The natural crunch is unbeatable.",
    author: "Isabella Rossi",
    role: "Master Chocolatier, Dolce Vita Chocolates",
    photo: "/awatar/Photo by Luise and Nic-3.jpg",
    rating: 5,
  },
  {
    id: 12,
    heading: "Purity guaranteed by thorough lab testing!",
    quote:
      "Every shipment comes complete with batch COAs and zero pesticide residue verification. They are our go-to partner for clean ingredients.",
    author: "Karthik Nambiar",
    role: "Quality Control Lead, Heritage Foods Asia",
    photo: "/awatar/Photo by Luise and Nic-4.jpg",
    rating: 5,
  },
  {
    id: 13,
    heading: "Superior freeze-drying technology!",
    quote:
      "The low-temperature vacuum freeze drying preserves cell structure like no thermal drying method can. You taste real fresh fruit with every bite.",
    author: "Sarah Jenkins",
    role: "Food Scientist, PureHarvest Innovations",
    photo: "/awatar/Photo by Luise and Nic.jpg",
    rating: 5,
  },
  {
    id: 14,
    heading: "A truly reliable B2B partner!",
    quote:
      "From Kerala groves directly to our manufacturing facilities in Europe, Fruitlok ensures seamless logistics, pristine quality, and competitive pricing.",
    author: "Henrik Lindqvist",
    role: "Procurement Director, Nordic Fruit Imports",
    photo: "/awatar/Photo by Taylor.jpg",
    rating: 5,
  },
];

export default function ReviewsGrid({review}:{review:any[]}) {
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsLoading(false);
    }, 600);
  };

  const displayedReviews = review.slice(0, visibleCount);
  const hasMore = visibleCount < review.length;

  return (
    <section className="py-16 md:py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Grid of 2 reviews per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {displayedReviews.map((rev, index) => (
          <div
            key={rev.id}
            className={`bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden transition-all duration-300 ease-out ${
              index % 2 === 0 ? "rotate-2 hover:rotate-0" : "-rotate-2 hover:rotate-0"
            }`}
          >
            {/* Background quotation accent */}
            <span
              className="absolute top-2 right-6 font-serif text-brand-yellow/25 leading-none select-none pointer-events-none text-8xl"
              aria-hidden="true"
            >
              “
            </span>

            <div className="space-y-3 relative z-10">
              {/* Heading */}
              <div className="[&_h2]:font-flavours [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-semibold [&_h2]:text-brand-green [&_h2]:leading-snug [&_p]:text-zinc-700 [&_p]:text-sm [&_p]:md:text-base [&_p]:font-medium [&_p]:leading-relaxed [&_p]:italic" dangerouslySetInnerHTML={{ __html:rev.description}}/>        </div>

            {/* Author details with avatar photo */}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 relative z-10">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-200">
                <Image
                  src={rev.image}
                  alt={rev.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div>
                <p className="font-flavours text-lg font-semibold text-brand-green">
                  — {rev.name}
                </p>
                <p className="text-xs md:text-sm text-zinc-500 font-medium">
                  {rev.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <JackfruitButton
            variant="outline"
            colorClass="text-brand-green"
            textClass="text-brand-green"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading More Reviews...
              </span>
            ) : (
              "Load More Reviews"
            )}
          </JackfruitButton>
        </div>
      )}
    </section>
  );
}
