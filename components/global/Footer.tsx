// components/global/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer({contact,product}:{contact:any,product:any[]}) {
  return (
    <footer className="bg-brand-green text-white">
      {/* Upper footer grid */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

        {/* Column 1: Branding & Social Icons */}
        <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
          <div className="flex-shrink-0">
            <Image
              src="/logo/logo-white.png"
              alt="Fruitlok Flavours Logo"
              width={160}
              height={138}
              style={{ width: "auto", height: "auto" }}
              className="brightness-0 invert max-h-[80px]"
            />
          </div>
          <p className="text-sm text-white max-w-xs leading-relaxed font-medium">
            Premium freeze-dried tropical fruit ingredients — from the heart of Kerala to the world. Sourced responsibly, processed with care.
          </p>

          {/* Big Social Media Icons */}
          <div className="flex items-center gap-6 mt-4">
            {/* LinkedIn */}
            <a
              href={contact?.linkedin ?? ""}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-24 h-24 rounded-full bg-white/10 hover:bg-white hover:text-brand-green flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 text-white"
            >
              <svg className="w-11 h-11 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href={contact?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-24 h-24 rounded-full bg-white/10 hover:bg-white hover:text-brand-green flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 text-white"
            >
              <svg className="w-11 h-11 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href={contact?.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-24 h-24 rounded-full bg-white/10 hover:bg-white hover:text-brand-green flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 text-white"
            >
              <svg className="w-11 h-11 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <h4 className="font-flavours text-2xl font-extrabold text-white">
            Explore
          </h4>
          <nav className="flex flex-col gap-3 font-bold text-white">
            <a href="/products" className="hover:underline hover:text-zinc-200 transition-colors">Our Products</a>
            <a href="/about" className="hover:underline hover:text-zinc-200 transition-colors">About Us</a>
            <a href="/reviews" className="hover:underline hover:text-zinc-200 transition-colors">Reviews</a>
            <a href="/blogs" className="hover:underline hover:text-zinc-200 transition-colors">Blogs &amp; Insights</a>
            <a href="/contact" className="hover:underline hover:text-zinc-200 transition-colors">Contact Us</a>
          </nav>
        </div>

        {/* Column 3: Products List */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <h4 className="font-flavours text-2xl font-extrabold text-white">
            Products
          </h4>
          <nav className="flex flex-col gap-3 font-bold text-white text-sm">
            {product.map((prod,idx) => (
              <Link
                key={idx}
                href={`/products/${prod.slug}`}
                className="hover:underline hover:text-zinc-200 transition-colors"
              >
                {prod.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 4: Contact Details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <h4 className="font-flavours text-2xl font-extrabold text-white">
            Contact Details
          </h4>
          <div className="flex flex-col gap-4 text-sm text-white font-bold">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/70">Address</p>
                <div className="
              [&_h4]:mt-1 
              [&_p]:font-medium 
              [&_p]:text-white/90" 
              dangerouslySetInnerHTML={{ __html:contact?.address }}/>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-white/70">Email</p>
              <a href={`mailto:${contact?.email}`} className="hover:underline hover:text-zinc-200 transition-colors">
                {contact?.email}
              </a>
            </div>
            <div>
               <p className="text-xs uppercase tracking-wider text-white/70">Phone</p>

              <a href={`tel:${contact?.phone}`} className="hover:underline hover:text-zinc-200 transition-colors">
               {contact?.phone}
              </a><br />
              <a href={`tel:${contact?.phone2}`} className="hover:underline hover:text-zinc-200 transition-colors">
               {contact?.phone2}
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Footer bottom bar */}
      <div className="border-t border-white/20 py-8 bg-zinc-950/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white font-semibold">
          <p>© {new Date().getFullYear()} Fruitlok Flavours. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-white">From the Heart of Kerala</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
