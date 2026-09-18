import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "How It Works | TickyTICKEY",
  description: "Step-by-step guide to using TickyTICKEY in your barangay community.",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfdfa]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#246b38] hover:text-[#194c27] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          <HowItWorksSection />

          {/* FAQ Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-[#133d23] text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white border border-green-100 shadow-2xs">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Is TickyTICKEY free for residents?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! For barangay residents, downloading the mobile app, consulting with health workers, and requesting free barangay medicines is completely free.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-green-100 shadow-2xs">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  What if a resident doesn&apos;t have a smartphone or internet?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Barangay Health Workers (BHWs) have access to the tablet/laptop admin portal. During routine house-to-house profiling or health center visits, BHWs update records directly on the resident&apos;s behalf.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-green-100 shadow-2xs">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Is patient health data secure?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All medical information is strictly encrypted and complies with Republic Act 10173 (Philippine Data Privacy Act). Only certified health workers and the resident themselves have authorized access.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
