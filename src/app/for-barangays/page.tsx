import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StakeholdersSection from "@/components/StakeholdersSection";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "For Barangays | TickyTICKEY Community Health",
  description: "Learn how TickyTICKEY empowers barangay leaders, local health workers, and families.",
};

export default function ForBarangaysPage() {
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

          <StakeholdersSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
