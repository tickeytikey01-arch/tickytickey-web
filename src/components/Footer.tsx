"use client";

import { Heart, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#12311b] text-white pt-16 pb-12 border-t border-green-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Branding & Mission */}
          <div className="lg:col-span-2 space-y-5">
            <div className="relative h-14 w-56">
              <Image
                src="/assets/logo-header.webp"
                alt="TickyTICKEY Logo"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              TickyTICKEY is the modern digital health bridge connecting Filipino families, Barangay Health Workers, and community leaders for faster, compassionate care.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/assets/app-icon.webp"
                  alt="TickyTICKEY App Icon"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">TickyTICKEY Mobile & Web</div>
                <div className="text-green-300">Your Barangay Health Partner</div>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-green-400">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
              </li>
              <li>
                <Link href="/for-barangays" className="hover:text-white transition-colors">For Barangays</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">Admin & Staff Log In</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Core Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-green-400">Health Services</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>Online Consultations</li>
              <li>Clinic Appointments</li>
              <li>Free Medicine Library</li>
              <li>Family Health Records</li>
              <li>Emergency Rescue SOS</li>
              <li>Barangay Analytics</li>
            </ul>
          </div>

          {/* Col 5: Emergency Hotlines & Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-green-400">Emergency & Care</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white">National Emergency: 911</div>
                  <div className="text-xs text-gray-400">DOH Health Line: 1555</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>tickeytikey01@gmail.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-400">Barangay Health System Partner Offices, Philippines</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} TickyTICKEY. Care, Connect, Community. Made for Filipino Barangays</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current ml-1 inline" />
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/login" className="hover:text-white transition-colors">BHW Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
