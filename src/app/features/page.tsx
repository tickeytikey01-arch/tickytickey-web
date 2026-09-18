import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Features | TickyTICKEY Barangay Health",
  description: "Explore all healthcare features available for barangay residents, health workers, and administrators.",
};

export default function FeaturesPage() {
  const featureList = [
    {
      title: "Online Consultation",
      tagline: "Teleconsultation for Barangays",
      asset: "/assets/online-consulation.png",
      details:
        "Residents can consult with volunteer barangay physicians and health workers from the comfort of their home. Avoid crowded waiting rooms while receiving preliminary triage, health advice, and medical certificates.",
      benefits: [
        "Secure chat and video consultations",
        "Assigned Barangay Health Worker supervision",
        "Prescriptions automatically synced with the health center",
      ],
    },
    {
      title: "Appointment Scheduling",
      tagline: "Organized Clinic Operations",
      asset: "/assets/appointment.png",
      details:
        "No more waking up at 4:00 AM to line up for clinic numbers. Residents book prioritized slots for prenatal checkups, infant vaccinations, dental missions, and blood pressure monitoring.",
      benefits: [
        "SMS and mobile push notification reminders",
        "Real-time queue tracking on mobile",
        "Emergency triage prioritization",
      ],
    },
    {
      title: "Medicine Library & Request",
      tagline: "Transparent Medicine Inventory",
      asset: "/assets/medicine.png",
      details:
        "Check which free maintenance medicines (hypertension, diabetes, antibiotics, vitamins) are currently available in the Barangay Health Center before visiting.",
      benefits: [
        "Submit prescription refill requests digitally",
        "Track expiration and stock levels in real time",
        "Automated alerts when vital supplies arrive",
      ],
    },
    {
      title: "Digital Health Records",
      tagline: "Lifetime Barangay Health Card",
      asset: "/assets/health-records.png",
      details:
        "Replace damaged paper folders with encrypted cloud records. Health workers and visiting doctors can instantly see allergies, chronic conditions, and past vital signs.",
      benefits: [
        "Family group health profiles",
        "Vaccine card backups for travel & school",
        "Strict adherence to Philippine Data Privacy Act",
      ],
    },
    {
      title: "Emergency Assistance",
      tagline: "One-Tap Barangay SOS",
      asset: "/assets/emergency-help.png",
      details:
        "In critical situations, press one button to alert the Barangay Emergency Response Team (BDRRMO), sending GPS location and vital medical information directly to dispatch.",
      benefits: [
        "Instant location broadcast to ambulance teams",
        "Pre-filled emergency contact notification",
        "Offline SMS fallback when internet is unavailable",
      ],
    },
    {
      title: "Barangay Health Analytics",
      tagline: "Epidemiological Surveillance",
      asset: "/assets/reports.png",
      details:
        "Give Barangay Captains and the Municipal Health Office instant visibility into disease surges (dengue, flu, measles) so preventive action can be taken immediately.",
      benefits: [
        "Automated reports compliant with DOH formats",
        "Heatmaps of resident cases and risk factors",
        "Inventory usage audits to prevent stockouts",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfdfa]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#246b38] hover:text-[#194c27] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100/80 text-[#246b38] text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>Full System Capabilities</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#133d23] tracking-tight">
              Barangay Health Services & Features
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Discover how TickyTICKEY turns community healthcare into a seamless, modern experience for both citizens and local providers.
            </p>
          </div>

          {/* Features Detailed List */}
          <div className="space-y-12">
            {featureList.map((f, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-green-100 shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 drop-shadow-lg">
                    <Image
                      src={f.asset}
                      alt={f.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <span className="text-xs font-bold text-[#246b38] uppercase tracking-wider">
                    {f.tagline}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#133d23]">
                    {f.title}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {f.details}
                  </p>

                  <div className="space-y-2 pt-2">
                    {f.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#3fa04e] flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-16 text-center bg-green-50 rounded-3xl p-8 sm:p-12 border border-green-200/80">
            <h3 className="text-2xl font-bold text-[#133d23] mb-3">Want to see these features in your Barangay?</h3>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mb-6">
              We provide free onboarding, staff training, and support for municipal health units.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#246b38] hover:bg-[#1a552b] text-white font-bold text-sm shadow-md transition-all"
            >
              Get Started with Your Barangay
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
