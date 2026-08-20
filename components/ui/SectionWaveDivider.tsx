// components/ui/SectionWaveDivider.tsx
// White organic wave that overlaps the section above it.
// Place between <HeroSection /> and <ProductsSection /> in page.tsx.

interface SectionWaveDividerProps {
  /** Tailwind bg colour of the section BELOW this divider (default: white) */
  fill?: string;
  /** How much (px) to overlap the section above — controls the negative margin */
  overlap?: number;
}

export default function SectionWaveDivider({
  fill = "#ffffff",
  overlap = 80,
}: SectionWaveDividerProps) {
  return (
    <div
      className="relative z-20 w-full pointer-events-none"
      style={{ marginTop: `-${overlap}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
        style={{ height: `${overlap}px` }}
      >
        {/*
          Organic blob wave:
          - Starts top-left at y≈50 (dips into hero above)
          - Uses cubic bezier curves for a natural, hand-drawn feel
          - Irregular bumps of varying height — like the reference image
          - Fills downward with the page background colour
        */}
        <path
          d="
            M0,55
            C60,20  130,70  210,40
            C290,10  360,65  450,35
            C540,5   610,60  700,30
            C790,0   870,55  960,28
            C1050,5  1120,62 1220,38
            C1300,18 1380,55 1440,42
            L1440,90
            L0,90
            Z
          "
          fill={fill}
        />
      </svg>
    </div>
  );
}
