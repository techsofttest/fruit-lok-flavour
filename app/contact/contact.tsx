"use client";

import React, { useState } from "react";
import Image from "next/image";
import SectionWaveDivider from "@/components/ui/SectionWaveDivider";
import JackfruitButton from "@/components/ui/JackfruitButton";
import PageHeroBanner from "@/components/global/PageHeroBanner";
import Captcha from "./Captcha";

export default function ContactPage({ banner, contact, page }: { banner: any; contact: any; page: any }) {
  const inquiryOptions = [
  "Request Free Samples",
  "Wholesale & Bulk Orders",
  "Custom Mesh & Thickness",
  "General Question",
];

const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Request Free Samples",
    message: "",
  });

  const [status, setStatus] = useState<{
    loading: boolean;
    success: boolean | null;
    message: string;
  }>({
    loading: false,
    success: null,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
 const [captchaValue, setCaptchaValue] = useState("");
const [expectedCaptcha, setExpectedCaptcha] = useState(""); // 1. Add state variable
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus({ loading: true, success: null, message: "" });

  // 1. Local CAPTCHA Check (Case Insensitive & Trimmed)
  if (captchaValue.trim().toUpperCase() !== expectedCaptcha.toUpperCase()) {
    setStatus({
      loading: false,
      success: false,
      message: "Incorrect CAPTCHA code. Please try again.",
    });
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        captcha: captchaValue,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setStatus({
        loading: false,
        success: true,
        message: data.message,
      });
      // Clear Form
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "Request Free Samples",
        message: "",
      });
      setCaptchaValue("");
      // Logic inside Captcha component handles refreshing the code via onGenerate
    } else {
      throw new Error(data.message || "Something went wrong.");
    }
  } catch (err: any) {
    setStatus({
      loading: false,
      success: false,
      message: err.message,
    });
  }
};
  return (
    <main className="flex flex-col flex-1 pt-14 md:pt-24 bg-white text-zinc-950">
      {/* Hero Banner Component */}
      <PageHeroBanner
        tagline={banner.title ?? ""}
        title={banner.sub ?? ""}
        description={banner.content ?? ""}
      />

      {/* Organic Wave Divider */}
      <SectionWaveDivider fill="#ffffff" overlap={60} />

      {/* SECTION 1: Contact Information */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Contact Details Text */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green mb-2">{page.title}</p>
              <h2 className="font-flavours text-4xl md:text-5xl font-semibold text-brand-green leading-tight mb-4">{page.sub}</h2>
              <div className="text-zinc-700 font-medium text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>

            {/* Direct Contact Items */}
            <div className="space-y-6 pt-2">
              {/* Address */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-1">
                    Company Address
                  </h3>
                  <div className="text-zinc-900 font-semibold text-lg leading-snug [&_p_strong]:hidden" dangerouslySetInnerHTML={{ __html: contact.address }} />
                </div>
              </div>

              {/* Phone Support */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-1">
                    Phone Support
                  </h3>
                  <div className="space-y-1">
                    <p className="text-zinc-900 font-semibold text-lg">
                      International: <a href={`tel:${contact.phone}`} className="text-brand-green hover:underline font-semibold">{contact.phone}</a>
                    </p>
                    <p className="text-zinc-900 font-semibold text-lg">
                      India Office: <a href={`tel:${contact.phone2}`} className="text-brand-green hover:underline font-semibold">{contact.phone2}</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-1">
                    Email Address
                  </h3>
                  <a href={`mailto:${contact.email}`} className="text-zinc-900 font-semibold text-xl hover:text-brand-green transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Section Image */}
          <div className="lg:col-span-6 relative h-[500px] md:h-[600px] lg:h-[650px] w-full overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-300">
            <Image
              src={page.image}
              alt="Fruitlok Flavours Facilities and Fruit Sourcing"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* SECTION: Google Map Location */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-30">
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green mb-2">
              Our Location
            </p>
            <h2 className="font-flavours text-3xl md:text-4xl font-semibold text-brand-green">
              Find Us On The Map
            </h2>
          </div>

          <div className="w-full h-[380px] md:h-[480px] rounded-[2.5rem] overflow-hidden border border-zinc-200">
            <iframe
              title="Fruitlok Flavours Location Map"
              src={contact.map}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Contact Form */}
      <section className="py-16 md:py-24 bg-zinc-50/70 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Form Section Image */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative h-[500px] md:h-[620px] lg:h-[680px] w-full overflow-hidden -rotate-2 hover:rotate-0 transition-transform duration-300">
              <Image
                src="/hero-section/c2.webp"
                alt="Fruitlok Premium Freeze-Dried Ingredients"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green mb-2">
                  Send A Message
                </p>
                <h2 className="font-flavours text-4xl md:text-5xl font-semibold text-brand-green leading-tight mb-3">
                  Let’s Start A Conversation
                </h2>
                <p className="text-zinc-700 font-medium text-base leading-relaxed">
                  Fill out the details below and our technical sales team will contact you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-800 mb-2 uppercase tracking-wide">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-3.5 text-base font-semibold text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-brand-green transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-800 mb-2 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-3.5 text-base font-semibold text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-brand-green transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-800 mb-2 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-3.5 text-base font-semibold text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-brand-green transition-colors"
                    />
                  </div>
                  <div>
  <label className="block text-sm font-semibold text-zinc-800 mb-2 uppercase tracking-wide">
    Inquiry Type
  </label>

  <div className="relative">
    {/* Selected value */}
    <button
      type="button"
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-3.5 text-left text-base font-semibold text-zinc-900 focus:outline-none focus:border-brand-green transition-all cursor-pointer flex items-center justify-between"
    >
      <span>{formData.inquiryType}</span>

      <svg
        className={`w-5 h-5 text-zinc-500 transition-transform duration-200 ${
          dropdownOpen ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m6 9 6 6 6-6"
        />
      </svg>
    </button>

    {/* Options */}
    {dropdownOpen && (
      <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-2xl shadow-lg overflow-hidden">
        <div className="h-1 bg-yellow-400" />

        <div className="py-2">
          {inquiryOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  inquiryType: option,
                }));

                setDropdownOpen(false);
              }}
              className={`w-full text-left px-5 py-4 text-sm font-bold transition-colors ${
                formData.inquiryType === option
                  ? "text-brand-green bg-green-50"
                  : "text-brand-green hover:bg-zinc-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
</div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-800 mb-2 uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your product needs or formulation requirements..."
                    className="w-full bg-white border border-zinc-200 rounded-2xl p-5 text-base font-semibold text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-brand-green transition-colors resize-y"
                  />
                </div>
<Captcha
  value={captchaValue}
  onChange={setCaptchaValue}
  onGenerate={setExpectedCaptcha} // 3. Store generated value in parent
/>
                {status.message && (
                  <p className={`text-sm font-semibold ${status.success ? "text-green-600" : "text-red-600"}`}>
                    {status.message}
                  </p>
                )}

                <div>
                  <JackfruitButton
                    variant="filled"
                    size="md"
                    type="submit"
                    disabled={status.loading}
                    textClass="font-semibold text-white"
                  >
                    {status.loading ? "Submitting..." : "Submit Message"}
                  </JackfruitButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Transition */}
      <SectionWaveDivider fill="#218018" overlap={60} />
    </main>
  );
}