import Image from "next/image";

interface Detail {
  title: string | null;
  icon?: string | null;
  description: string;
}

interface Data {
  data?: {
    title: string;
    detail: Detail[] | string;
  };
}

function Icon({ name }: { name?: string | null }) {
  switch (name) {
    case "sun":
      return (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      );

    case "moon":
      return (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );

    case "calendar":
      return (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      );

    case "heart":
      return (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      );

    default:
      return null;
  }
}

export default function AboutStandFor({ data }: Data) {
  let details: Detail[] = [];

  if (typeof data?.detail === "string") {
    try {
      const parsed = JSON.parse(data.detail);

      if (Array.isArray(parsed)) {
        details = parsed;
      }
    } catch (error) {
      console.error("Invalid detail JSON:", error);
    }
  } else if (Array.isArray(data?.detail)) {
    details = data.detail;
  }

  return (
    <section className="relative bg-brand-green py-40 px-6 md:px-12 z-30 overflow-hidden">

      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/section-bg/bg-green2.svg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="font-flavours text-white text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">
            {data?.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-16 max-w-5xl mx-auto">

          {details.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl p-8 pt-12 shadow-md flex flex-col items-center text-center"
            >

              <div className="absolute -top-8 w-16 h-16 bg-brand-green rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
                <Icon name={item.icon} />
              </div>

              <h3 className="font-flavours text-3xl font-extrabold text-brand-green mb-3 mt-2">
                {item.title}
              </h3>

              <p className="text-base text-zinc-700 leading-relaxed font-semibold">
                {item.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}