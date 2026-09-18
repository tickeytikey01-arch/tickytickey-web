"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ArrowLeft, CheckCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100/80 text-[#246b38] text-xs font-bold tracking-wide">
                  <span>📬 We&apos;re Here to Help</span>
                </div>
                <h1 className="text-4xl font-extrabold text-[#133d23] tracking-tight">
                  Contact the TickyTICKEY Team
                </h1>
                <p className="text-gray-600 text-base leading-relaxed">
                  Interested in deploying TickyTICKEY in your Barangay, municipality, or clinic? Get in touch with our community team.
                </p>
              </div>

              <div className="space-y-5 bg-white p-6 rounded-3xl border border-green-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">National Support</h4>
                    <p className="text-sm text-gray-600">+63 (02) 8911-0000 / 1555</p>
                    <p className="text-xs text-gray-400">Monday to Friday, 8am – 5pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Email Inquiries</h4>
                    <p className="text-sm text-gray-600">tickeytikey01@gmail.com</p>
                    <p className="text-xs text-gray-400">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Partner Head Office</h4>
                    <p className="text-sm text-gray-600">Barangay Health Innovations Hub</p>
                    <p className="text-xs text-gray-400">Metro Manila, Philippines</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-green-100 shadow-md">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-[#246b38] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#133d23]">Salamat! Message Sent.</h3>
                  <p className="text-gray-600 max-w-md mx-auto text-sm">
                    Our Barangay Partnerships Coordinator will reach out to your office within 1 business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#246b38] text-white text-sm font-bold"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (isSubmitting) return;
                    setIsSubmitting(true);
                    setErrorMessage("");
                    const form = new FormData(e.currentTarget);
                    try {
                      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
                      const result = await response.json();
                      if (!response.ok) throw new Error(result.message || "Unable to submit request.");
                      setSubmitted(true);
                    } catch (error) {
                      setErrorMessage(error instanceof Error ? error.message : "Unable to submit request.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-[#133d23]">Barangay Partnership Form</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="Juan dela Cruz"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#3fa04e] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Official Role</label>
                      <select name="officialRole" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#3fa04e] focus:outline-none">
                        <option>Barangay Captain / Kagawad</option>
                        <option>Barangay Health Worker (BHW)</option>
                        <option>Municipal / City Health Officer</option>
                        <option>Resident / Community Leader</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="juan@barangay.gov.ph"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#3fa04e] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="0917 123 4567"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#3fa04e] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Barangay & Municipality / City</label>
                    <input
                      type="text"
                      name="locality"
                      required
                      placeholder="e.g. Barangay San Antonio, Pasig City"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#3fa04e] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">How can we assist your community?</label>
                    <textarea
                      rows={4}
                      name="message"
                      required
                      placeholder="Tell us about your barangay health center needs, resident population, or desired pilot timeline..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#3fa04e] focus:outline-none"
                    />
                  </div>

                  {errorMessage && <p role="alert" className="text-sm font-semibold text-red-700">{errorMessage}</p>}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#246b38] hover:bg-[#1a552b] disabled:opacity-60 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit Request"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
