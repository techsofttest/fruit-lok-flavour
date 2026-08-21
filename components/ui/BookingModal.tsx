"use client";

import { useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  sampleId?: number;
  sampleName?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  sampleId,
  sampleName,
}: BookingModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Inside handleSubmit in BookingModal.tsx
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // FIX: Changed endpoint from /send to /submit to match your route snippet
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/send`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
            requestType: "Request Sample", // Matches $isSampleRequest logic in PHP
            sampleId: sampleId ? String(sampleId) : "", 
            sampleName: sampleName,
            inquiryType: "Sample Request" // Fallback for the subject line
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        // ... rest of your success logic
      } else {
        setError(result.message || "Failed to send request.");
      }
    } catch (err: any) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
};
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4 animate-fade-in">

      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative z-10
          w-full max-w-xl
          max-h-[90vh]
          overflow-y-auto
          bg-white
          text-foreground
          border border-brand-green/20
          shadow-2xl
          p-5 sm:p-6 md:p-8 lg:p-10
          font-sans
          animate-slide-up
          rounded-3xl
        "
      >

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-5 right-5
            w-9 h-9
            rounded-full
            flex items-center justify-center
            text-zinc-500
            hover:text-white
            bg-zinc-100
            hover:bg-brand-green
            transition-all duration-200
          "
          aria-label="Close modal"
        >
          ✕
        </button>

        {submitted ? (
          /* Success */
          <div className="flex flex-col items-center justify-center py-12 text-center">

            <div
              className="
                w-14 h-14
                rounded-full
                bg-brand-green/10
                border-2 border-brand-green
                flex items-center justify-center
                mb-6
              "
            >
              <svg
                className="w-7 h-7 text-brand-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="font-fruitlok text-2xl mb-2 text-brand-green">
              Sample Request Sent!
            </h3>

            <p className="text-sm text-zinc-600 max-w-sm">
              Thank you for your request. Our team will contact you shortly
              regarding your sample.
            </p>

            {sampleName && (
              <p className="mt-4 text-sm font-semibold text-zinc-800">
                Requested Sample:{" "}
                <span className="text-brand-green">
                  {sampleName}
                </span>
              </p>
            )}
          </div>
        ) : (
          <div>

            {/* Header */}
            <div className="mb-8 border-b border-brand-green/15 pb-5">

              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  tracking-[0.18em]
                  uppercase
                  text-brand-green
                "
              >
                <span className="w-2 h-2 rounded-full bg-brand-yellow" />
                SAMPLE REQUEST
              </span>

              <h2
                className="
                  font-fruitlok
                  text-3xl sm:text-4xl
                  text-brand-green
                  mt-2
                "
              >
                Request a Free Sample
              </h2>

              <p className="text-sm text-zinc-500 mt-2 max-w-md">
                Fill in your details and our team will contact you regarding
                your sample request.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Selected Sample */}
              {sampleName && (
                <div
                  className="
                    bg-brand-green/5
                    border border-brand-green/20
                    px-5 py-4
                    rounded-2xl
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-brand-green
                      mb-1
                    "
                  >
                    Selected Sample
                  </p>

                  <p className="text-base font-bold text-zinc-900">
                    {sampleName}
                  </p>

                  {sampleId && (
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Sample ID: {sampleId}
                    </p>
                  )}
                </div>
              )}

              {/* Name */}
              <div>
                <label
                  className="
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    mb-2
                    text-zinc-700
                  "
                >
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter your full name"
                  className="
                    w-full
                    bg-white
                    border border-zinc-200
                    rounded-xl
                    px-4 py-3
                    text-sm
                    text-zinc-900
                    placeholder:text-zinc-400
                    focus:outline-none
                    focus:border-brand-green
                    focus:ring-2
                    focus:ring-brand-green/10
                    transition-all
                  "
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label
                    className="
                      block
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      mb-2
                      text-zinc-700
                    "
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    placeholder="name@example.com"
                    className="
                      w-full
                      bg-white
                      border border-zinc-200
                      rounded-xl
                      px-4 py-3
                      text-sm
                      text-zinc-900
                      placeholder:text-zinc-400
                      focus:outline-none
                      focus:border-brand-green
                      focus:ring-2
                      focus:ring-brand-green/10
                      transition-all
                    "
                  />
                </div>

                <div>
                  <label
                    className="
                      block
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      mb-2
                      text-zinc-700
                    "
                  >
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="
                      w-full
                      bg-white
                      border border-zinc-200
                      rounded-xl
                      px-4 py-3
                      text-sm
                      text-zinc-900
                      placeholder:text-zinc-400
                      focus:outline-none
                      focus:border-brand-green
                      focus:ring-2
                      focus:ring-brand-green/10
                      transition-all
                    "
                  />
                </div>

              </div>

              {/* Sample */}
              <div>
                <label
                  className="
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    mb-2
                    text-zinc-700
                  "
                >
                  Sample Requested
                </label>

                <input
                  type="text"
                  value={sampleName || ""}
                  readOnly
                  className="
                    w-full
                    bg-zinc-50
                    border border-zinc-200
                    rounded-xl
                    px-4 py-3
                    text-sm
                    font-semibold
                    text-brand-green
                    focus:outline-none
                  "
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    mb-2
                    text-zinc-700
                  "
                >
                  Message
                </label>

                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  placeholder="Tell us anything you'd like to know about this sample..."
                  className="
                    w-full
                    bg-white
                    border border-zinc-200
                    rounded-xl
                    px-4 py-3
                    text-sm
                    text-zinc-900
                    placeholder:text-zinc-400
                    focus:outline-none
                    focus:border-brand-green
                    focus:ring-2
                    focus:ring-brand-green/10
                    transition-all
                    resize-none
                  "
                />
              </div>

              {/* Error */}
              {error && (
                <div
                  className="
                    rounded-xl
                    bg-red-50
                    border border-red-200
                    text-red-600
                    px-4 py-3
                    text-sm
                  "
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="pt-2">

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    bg-brand-green
                    hover:bg-[#196b14]
                    text-white
                    py-3.5
                    px-6
                    rounded-xl
                    text-sm
                    font-bold
                    shadow-lg
                    shadow-brand-green/20
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    disabled:hover:translate-y-0
                  "
                >
                  {loading
                    ? "Sending Request..."
                    : "Request Free Sample"}
                </button>

                <p className="text-center text-[11px] text-zinc-400 mt-3">
                  Our team will contact you regarding your sample request.
                </p>

              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}