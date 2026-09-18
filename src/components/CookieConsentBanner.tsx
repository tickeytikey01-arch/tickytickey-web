"use client";

import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("tickytickey_cookie_consent");
    if (!consent) {
      // Small delay so it slides in smoothly
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("tickytickey_cookie_consent", "all");
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("tickytickey_cookie_consent", "essential");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Cookie Message */}
        <div className="flex items-start gap-3 text-xs text-gray-700 leading-relaxed pr-2">
          <div className="w-8 h-8 rounded-full bg-green-100 text-[#246b38] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-0.5">
              We value your privacy &amp; community health data
            </p>
            <p className="text-gray-600">
              We use essential cookies to maintain secure sessions, verify health worker credentials, and ensure proper functionality. We do not sell your health data or use tracking cookies for third-party advertising. Read our{" "}
              <Link href="/cookies" className="text-[#246b38] underline font-semibold hover:text-[#184e27]">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#246b38] underline font-semibold hover:text-[#184e27]">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto flex-shrink-0 justify-end text-xs font-bold">
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="px-4 py-2 rounded-xl bg-[#246b38] hover:bg-[#1b552b] text-white shadow-sm hover:shadow transition-all cursor-pointer"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
