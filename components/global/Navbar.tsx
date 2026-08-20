"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import JackfruitButton from "@/components/ui/JackfruitButton";

export default function Navbar({product}:{product:any[]}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const [searchResults, setSearchResults] = useState<any[]>([]);
const handleSearch = (value: string) => {
  setSearchQuery(value);

  if (!value.trim()) {
    setSearchResults([]);
    return;
  }

  const query = value.toLowerCase();

  const results = product.filter((prod) =>
    prod.name?.toLowerCase().includes(query) ||
    prod.description?.toLowerCase().includes(query)
  );

  setSearchResults(results);
};
  const handleLinkClick = (id: string, path?: string) => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    if (path) {
      router.push(path);
      return;
    }
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Products", id: "products", path: "/products", hasDropdown: true },
    { label: "Contact Us", id: "contact", path: "/contact" },
    { label: "About Us", id: "about", path: "/about" },
    { label: "Reviews", id: "testimonials", path: "/reviews" },
    { label: "Blogs", id: "blogs", path: "/blogs" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 md:py-4 px-4 sm:px-6 md:px-12 bg-white rounded-b-[1.5rem] md:rounded-b-[2rem] border-b-2 border-zinc-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6">

        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <Image
            src="/logo/logo.png"
            alt="Fruitlok Flavours Logo"
            width={170}
            height={128}
            className="h-12 sm:h-14 md:h-20 w-auto cursor-pointer object-contain"
            onClick={handleLogoClick}
            priority
          />
        </div>

        {/* Middle-Left: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            if (item.hasDropdown) {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setProductsDropdownOpen(true)}
                  onMouseLeave={() => setProductsDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleLinkClick(item.id, item.path)}
                    className="flex items-center gap-1.5 font-flavours text-lg xl:text-xl font-bold text-brand-green hover:opacity-85 transition-opacity focus:outline-none cursor-pointer py-2"
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-4 h-4 xl:w-5 xl:h-5 text-brand-green mt-0.5 transition-transform duration-200 ${productsDropdownOpen ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* Mega Dropdown Panel */}
                  {productsDropdownOpen && (
                    <div className="absolute top-full -left-4 w-[540px] bg-white border border-zinc-200 rounded-3xl p-5 shadow-xl z-50 animate-fade-in space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                          Our Products
                        </p>
                        <Link
                          href="/products"
                          onClick={() => setProductsDropdownOpen(false)}
                          className="text-xs font-semibold text-brand-green hover:underline flex items-center gap-1"
                        >
                          View All Products <span>&rarr;</span>
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {product.map((prod , idx) => (
                          <Link
                            key={idx}
                            href={`/products/${prod.slug}`}
                            onClick={() => setProductsDropdownOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-zinc-50 border border-transparent transition-all group/item"
                          >
                            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                              <Image
                                src={prod.image}
                                alt={prod.name}
                                fill
                                sizes="50px"
                                className="object-contain group-hover/item:scale-105 transition-transform"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-flavours font-semibold text-brand-green text-md leading-tight truncate group-hover/item:text-brand-yellow transition-colors">
                                {prod.name}
                              </p>
                              <p className="text-[11px] text-zinc-500 font-medium truncate mt-0.5">
                                {prod.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id, item.path)}
                className="flex items-center gap-1.5 font-flavours text-lg xl:text-xl font-bold text-brand-green hover:opacity-85 transition-opacity focus:outline-none cursor-pointer"
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

       <div className="flex-1 max-w-xs mx-2 hidden md:block">
  <div className="relative group/search pb-1">

    {/* Yellow shadow */}
    <div className="absolute inset-0 top-1 left-2 w-full h-full bg-brand-yellow rounded-full z-0 pointer-events-none" />

    <div className="relative z-20 w-full">

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search tropical ingredients..."
          className="w-full bg-white border-2 border-brand-green rounded-full py-2 px-10 sm:pl-11 pr-4 text-xs sm:text-sm font-sans font-bold focus:outline-none text-zinc-900 placeholder-brand-green/75"
        />

        {/* Search Icon */}
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-green">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-zinc-200 shadow-xl overflow-hidden">

          {searchResults.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">

              {searchResults.map((prod, idx) => (
                <Link
                  key={idx}
                  href={`/products/${prod.slug}`}
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-zinc-50 transition-colors"
                >

                  {/* Product Image */}
                  <div className="relative w-12 h-12 shrink-0">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="min-w-0">
                    <p className="font-flavours font-bold text-brand-green text-sm truncate">
                      {prod.name}
                    </p>

                    <p className="text-xs text-zinc-500 truncate">
                      {prod.description}
                    </p>
                  </div>

                </Link>
              ))}

            </div>
          ) : (
            <div className="p-4 text-center text-sm text-zinc-500">
              No ingredients found
            </div>
          )}

        </div>
      )}

    </div>
  </div>
</div>

        {/* Right: CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="block">
            <JackfruitButton
              variant="filled"
              size="sm"
              colorClass="text-brand-green"
              textClass="text-white text-[11px] sm:text-sm md:text-base tracking-wide"
              onClick={() => handleLinkClick("contact", "/contact")}
              className="px-5 sm:px-8"
            >
              <span className="inline-flex flex-row items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0 inline-block" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <span>Order Samples!</span>
              </span>
            </JackfruitButton>
          </div>

          {/* Hamburger Menu Toggle (Mobile & Tablet) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-brand-green focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden pt-4 pb-6 px-4 border-t border-zinc-100 mt-3 space-y-4 bg-white rounded-b-[1.5rem] max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-3">
            {/* Products with Collapsible Mobile List */}
            <div>
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between font-flavours text-xl font-bold text-brand-green py-1"
              >
                <span>Products</span>
                <svg
                  className={`w-5 h-5 text-brand-green transition-transform ${mobileProductsOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {mobileProductsOpen && (
                <div className="pl-3 pt-2 space-y-2.5 border-l-2 border-brand-green/20 my-2">
                  {product.map((prod,idx) => (
                    <Link
                      key={idx}
                      href={`/products/${prod.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-zinc-50"
                    >
                      <div className="relative w-8 h-8 flex-shrink-0">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          sizes="35px"
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-semibold text-zinc-800">
                        {prod.name}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-bold text-brand-green pt-1 hover:underline"
                  >
                    View All Products &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            <button
              onClick={() => handleLinkClick("contact", "/contact")}
              className="text-left font-flavours text-xl font-bold text-brand-green py-1 hover:text-brand-yellow transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={() => handleLinkClick("about", "/about")}
              className="text-left font-flavours text-xl font-bold text-brand-green py-1 hover:text-brand-yellow transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => handleLinkClick("testimonials", "/reviews")}
              className="text-left font-flavours text-xl font-bold text-brand-green py-1 hover:text-brand-yellow transition-colors"
            >
              Reviews
            </button>
            <button
              onClick={() => handleLinkClick("blogs", "/blogs")}
              className="text-left font-flavours text-xl font-bold text-brand-green py-1 hover:text-brand-yellow transition-colors"
            >
              Blogs
            </button>
          </nav>

          <div className="pt-2 sm:hidden">
            <JackfruitButton
              variant="filled"
              size="sm"
              colorClass="text-brand-green"
              textClass="text-white text-sm"
              onClick={() => handleLinkClick("contact", "/contact")}
              className="w-full"
            >
              <span className="inline-flex flex-row items-center justify-center gap-1.5 whitespace-nowrap">
                <svg className="w-4 h-4 text-white shrink-0 inline-block" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <span>Order Samples!</span>
              </span>
            </JackfruitButton>
          </div>
        </div>
      )}
    </header>
  );
}
