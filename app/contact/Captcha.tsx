import React, { useState ,useEffect} from "react";
export default function Captcha({
  value,
  onChange,
  onGenerate,
}: {
  value: string;
  onChange: (value: string) => void;
  onGenerate: (code: string) => void; // Added callback prop
}) {
  const [captcha, setCaptcha] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";

    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setCaptcha(result);
    onChange("");
    onGenerate(result); // Pass the generated string to the parent
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div>
      <label className="block text-sm font-semibold text-zinc-800 mb-2 uppercase tracking-wide">
        CAPTCHA
      </label>

      <div className="flex items-center gap-3">
        <div
          className="relative h-12 w-36 flex items-center justify-center
                     rounded-xl border border-zinc-200
                     bg-zinc-100 overflow-hidden select-none"
        >
          <span
            className="text-xl font-bold tracking-[0.35em] text-brand-green
                       italic"
          >
            {captcha}
          </span>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-5 left-0 w-full border-t border-zinc-400 rotate-6" />
            <div className="absolute top-7 left-0 w-full border-t border-zinc-300 -rotate-3" />
          </div>
        </div>

        <button
          type="button"
          onClick={generateCaptcha}
          className="h-12 px-4 rounded-xl
                     bg-zinc-100 hover:bg-zinc-200
                     text-zinc-700 font-semibold
                     transition-colors"
        >
          ↻
        </button>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter CAPTCHA"
        autoComplete="off"
        className="mt-3 w-full bg-white
                   border border-zinc-200
                   rounded-2xl px-5 py-3.5
                   text-base font-semibold text-zinc-900
                   focus:outline-none
                   focus:border-brand-green
                   transition-colors"
      />
    </div>
  );
}