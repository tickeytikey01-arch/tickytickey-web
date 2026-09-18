"use client";

import { ArrowRight, Heart, Play, ShieldCheck, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HeroSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[#eef6ee] bg-[url('/assets/hero-background.png')] bg-cover bg-top sm:bg-center bg-no-repeat min-h-[660px] lg:min-h-[760px] flex items-center pt-8 pb-16 lg:py-20">
        {/* Subtle decorative background gradient overlay to guarantee text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent lg:to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start space-y-6 pt-4 lg:pt-0">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5e9]/95 border border-[#b9e4be] text-[#246b38] text-xs sm:text-sm font-bold shadow-xs">
                <span className="text-base">🌱</span>
                <span>Stronger Communities, Healthier Lives</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-black text-[#133d23] leading-[1.08] tracking-tight">
                A Healthier <br />
                <span className="text-[#1e6132]">Barangay Starts</span> <br />
                with Better Access
              </h1>

              {/* Subheading Paragraph */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                TickyTICKEY connects residents, Barangay Health Workers, and local leaders through easy access to health services, information, and care — for a healthier, happier community.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1 w-full sm:w-auto">
                {/* Get Started Button */}
                <Link
                  href="/#features"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full text-base font-bold bg-[#246b38] hover:bg-[#1c552c] text-white shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                {/* Watch Video Button */}
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full text-base font-bold bg-white/95 hover:bg-white text-[#246b38] border border-gray-200 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5"
                >
                  <span className="w-7 h-7 rounded-full bg-[#246b38] text-white flex items-center justify-center shadow-xs">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </span>
                  <span>Watch Video</span>
                </button>
              </div>

              {/* Value Proposition Highlights */}
              <div className="pt-4 sm:pt-6 flex flex-wrap items-center gap-5 sm:gap-7 border-t border-green-900/10 w-full text-[#1f4e2d]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#e1f3e3] flex items-center justify-center text-[#246b38]">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold tracking-tight">Easier Access</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#e1f3e3] flex items-center justify-center text-[#246b38]">
                    <Users className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold tracking-tight">Healthier People</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#e1f3e3] flex items-center justify-center text-[#246b38]">
                    <ShieldCheck className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold tracking-tight">Stronger Barangays</span>
                </div>
              </div>

            </div>

            {/* Right Visual Showcase Column */}
            <div className="lg:col-span-6 xl:col-span-7 relative flex justify-center lg:justify-end items-center mt-6 lg:mt-0">
              
              {/* Decorative Handwritten Flourish on top right */}
              <div className="absolute -top-6 sm:-top-8 right-2 sm:right-6 lg:right-4 z-20 select-none pointer-events-none text-right">
                <div className="font-handwriting text-2xl sm:text-3xl font-bold text-[#2e683b] leading-[1.18] drop-shadow-xs rotate-[2deg]">
                  <div>Care</div>
                  <div className="pr-2">Connect</div>
                  <div className="pr-4">Community</div>
                  <div className="pr-3">Thrive</div>
                  <div className="pr-1 flex items-center justify-end gap-1">
                    <span>Together</span>
                    <span className="text-red-500 font-sans text-lg">❤</span>
                  </div>
                </div>
              </div>

              {/* Showcase Container */}
              <div className="relative w-full max-w-[620px] lg:max-w-[720px] pt-14 pb-8 sm:pb-12">
                
                {/* Mascot Artwork */}
                <div className="absolute top-4 left-12 sm:left-24 lg:left-16 z-20 flex flex-col items-center">
                  {/* Mascot Sprout Doctor */}
                  <div className="relative w-28 h-32 sm:w-36 sm:h-40 filter drop-shadow-md">
                    <Image
                      src="/assets/mascot.png"
                      alt="Ticky - Barangay Health Mascot"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Laptop Asset (Dashboard) */}
                <div className="relative z-10 w-full drop-shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
                  <Image
                    src="/assets/laptop-asset.png"
                    alt="TickyTICKEY Barangay Admin Dashboard on Laptop"
                    width={1536}
                    height={1024}
                    priority
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Mobile Asset (Resident App) Overlapping in front */}
                <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:left-6 md:left-8 z-30 w-[170px] sm:w-[210px] md:w-[240px] lg:w-[260px] drop-shadow-2xl transition-transform duration-300 hover:scale-[1.03]">
                  <Image
                    src="/assets/mobile.png"
                    alt="TickyTICKEY Resident Health App on Mobile Phone"
                    width={1024}
                    height={1536}
                    priority
                    className="w-full h-auto object-contain"
                  />
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-3xl border border-gray-100">
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-gray-100 bg-[#f8faf8]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 font-bold text-sm text-[#1e6132]">TickyTICKEY Product Tour & Barangay Impact</span>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 sm:p-8 space-y-6">
              <div className="aspect-video bg-gradient-to-br from-[#1b4b27] to-[#2d773c] rounded-2xl flex flex-col items-center justify-center text-white p-6 relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]" />
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/40 shadow-lg">
                  <Play className="w-8 h-8 fill-current text-white ml-1" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-center">Transforming Barangay Healthcare</h3>
                <p className="text-sm text-green-100 text-center max-w-md mt-2">
                  See how local health workers and residents use TickyTICKEY to schedule check-ups, distribute free medicines, and respond to emergencies.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3.5 rounded-xl bg-green-50 border border-green-100">
                  <div className="text-2xl font-black text-[#246b38]">1,280+</div>
                  <div className="text-xs text-gray-600 font-semibold mt-0.5">Barangay Residents Served</div>
                </div>
                <div className="p-3.5 rounded-xl bg-green-50 border border-green-100">
                  <div className="text-2xl font-black text-[#246b38]">99.4%</div>
                  <div className="text-xs text-gray-600 font-semibold mt-0.5">Faster Care Coordination</div>
                </div>
                <div className="p-3.5 rounded-xl bg-green-50 border border-green-100">
                  <div className="text-2xl font-black text-[#246b38]">24/7</div>
                  <div className="text-xs text-gray-600 font-semibold mt-0.5">Emergency Help Access</div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-6 py-2.5 rounded-full text-sm font-bold bg-[#246b38] hover:bg-[#1c552c] text-white transition-colors"
                >
                  Close Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
