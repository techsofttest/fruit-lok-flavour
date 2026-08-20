import JackfruitButton from "@/components/ui/JackfruitButton";

export default function AboutCTA() {
  return (
    <section className="bg-brand-green py-16 text-center text-white relative z-30">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-flavours text-4xl md:text-5xl font-extrabold mb-6">
          Ready to Discover Genuine Tropical Flavours?
        </h2>
        <p className="text-lg md:text-xl font-medium text-white/90 mb-8 max-w-2xl mx-auto">
          Experience 100% natural, freeze-dried fruit solutions directly from the tropical heart of India.
        </p>
        <div>
          <JackfruitButton variant="outline" colorClass="text-brand-green">
            Explore Our Products
          </JackfruitButton>
        </div>
      </div>
    </section>
  );
}
