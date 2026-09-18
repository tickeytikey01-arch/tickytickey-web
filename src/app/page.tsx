import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Navbar from "@/components/Navbar";
import StakeholdersSection from "@/components/StakeholdersSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfdfa]">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Hero Section with Mockup Assets */}
      <main className="flex-1">
        <HeroSection />

        {/* Core Barangay Health Services */}
        <FeaturesSection />

        {/* Stakeholder Highlights (Residents, BHWs, Barangay Leaders) */}
        <StakeholdersSection />

        {/* 3-Step Process */}
        <HowItWorksSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
