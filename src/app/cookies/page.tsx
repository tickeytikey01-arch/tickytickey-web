import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | TickyTICKEY",
  description: "Cookie Policy and cookie usage disclosure for TickyTICKEY Barangay Health System.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {/* Header Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Cookie Policy
          </h1>
          <p className="text-xs text-gray-500 mb-8 font-medium">
            Last updated: September 18, 2026
          </p>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            
            {/* 1. Introduction */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                1. Introduction
              </h2>
              <p>
                At TickyTICKEY, we take community health and user privacy seriously. This Cookie Policy explains how TickyTICKEY (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) uses cookies and similar technologies when you access our web portal and associated mobile health applications. Please read this policy in conjunction with our{" "}
                <Link href="/privacy" className="text-[#246b38] underline font-medium hover:text-[#194c27]">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="text-[#246b38] underline font-medium hover:text-[#194c27]">
                  Terms of Service
                </Link>.
              </p>
            </div>

            {/* 2. What Are Cookies */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                2. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files placed on your computer, smartphone, or tablet by websites that you visit. They are widely used to make web services work securely, remember user preferences, and provide necessary system session management for authenticated health workers and residents.
              </p>
            </div>

            {/* 3. Cookies We Use */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                3. Cookies We Use
              </h2>
              <p className="mb-3">
                TickyTICKEY operates with a data-minimization principle under Republic Act No. 10173 (Philippine Data Privacy Act of 2012). We utilize only strictly necessary and functional cookies required to deliver barangay healthcare operations:
              </p>

              <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">
                3.1 Strictly Necessary &amp; Security Cookies
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 mb-3">
                <li>
                  <strong>Session Authentication:</strong> Maintains your secure login session when accessing the Barangay Health Worker (BHW) portal, doctor station, or resident consultation interface.
                </li>
                <li>
                  <strong>CSRF &amp; Security Tokens:</strong> Protects residents and medical personnel against Cross-Site Request Forgery and unauthorized session hijacking.
                </li>
                <li>
                  <strong>Load Balancing:</strong> Distributes network traffic across municipal server instances to guarantee high availability during health emergencies.
                </li>
              </ul>

              <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">
                3.2 Preference &amp; Functionality Cookies
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 mb-3">
                <li>
                  <strong>Cookie Consent Record:</strong> Remembers your decision regarding cookie preferences (stored locally as <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">tickytickey_cookie_consent</code>) so the banner does not repeatedly prompt you.
                </li>
                <li>
                  <strong>Interface &amp; Station Preferences:</strong> Remembers your chosen language (Filipino / English) and last-selected barangay health station cluster.
                </li>
              </ul>

              <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">
                3.3 Zero Commercial Ad Tracking or Data Broker Cookies
              </h3>
              <p>
                We do <strong>NOT</strong> deploy behavioral tracking pixels, third-party advertising cookies, retargeting beacons, or commercial analytics scripts. Your health inquiries, consultation logs, and medical records are never shared with advertising networks.
              </p>
            </div>

            {/* 4. Managing Cookies */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                4. How to Manage and Disable Cookies
              </h2>
              <p className="mb-2">
                You have the right to decide whether to accept or decline non-essential cookies. You can manage your preferences through our on-site cookie consent banner or by configuring your web browser settings:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Google Chrome:</strong> Settings → Privacy and Security → Third-party cookies.
                </li>
                <li>
                  <strong>Apple Safari (iOS &amp; macOS):</strong> Preferences/Settings → Privacy → Block All Cookies.
                </li>
                <li>
                  <strong>Mozilla Firefox:</strong> Options/Preferences → Privacy &amp; Security → Cookies and Site Data.
                </li>
                <li>
                  <strong>Microsoft Edge:</strong> Settings → Cookies and Site Permissions → Manage and delete cookies.
                </li>
              </ul>
              <p className="mt-2 text-xs text-gray-500">
                Please note that blocking strictly necessary cookies may disable critical features such as BHW login authentication and teleconsultation messaging.
              </p>
            </div>

            {/* 5. Legal & Regulatory Compliance */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                5. Legal Compliance &amp; App Store Policies
              </h2>
              <p className="mb-2">
                This Cookie Policy is aligned with the following regulatory and platform frameworks:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Republic Act No. 10173 (Data Privacy Act of 2012):</strong> Mandating transparency, proportionality, and legitimate purpose in all digital processing.
                </li>
                <li>
                  <strong>Apple App Store Guideline 5.1.2:</strong> Strictly prohibiting the transmission of health data to third-party ad networks.
                </li>
                <li>
                  <strong>Google Play Store Health Apps Policy:</strong> Ensuring that health and telemetry cookies are not used for undisclosed tracking.
                </li>
              </ul>
            </div>

            {/* 6. Updates to This Policy */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                6. Updates to This Cookie Policy
              </h2>
              <p>
                We may periodically update this Cookie Policy to reflect changes in legal requirements or system enhancements. When updates occur, the &ldquo;Last updated&rdquo; date at the top of this page will be revised accordingly.
              </p>
            </div>

            {/* 7. Contact Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                7. Contact Us
              </h2>
              <p>
                If you have questions regarding this Cookie Policy or our data protection practices, please contact our Data Protection Officer:
              </p>
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p><strong>TickyTICKEY Data Protection Office</strong></p>
                <p>Email: <a href="mailto:tickeytikey01@gmail.com" className="text-[#246b38] underline font-medium">tickeytikey01@gmail.com</a></p>
                <p>National Barangay Health Support Line: 1555</p>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
