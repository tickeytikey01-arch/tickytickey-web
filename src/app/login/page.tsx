"use client";

import { createClient } from "@/lib/supabase/client";
import ForgotPasswordModal from "@/components/auth/ForgotPasswordModal";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  ShieldCheck,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const supabase = createClient();
      const identifier = emailOrUser.trim();
      const credentials = identifier.includes("@")
        ? { email: identifier.toLowerCase(), password }
        : { phone: identifier.replace(/\s/g, "").replace(/^0/, "+63"), password };
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
      setIsSubmitted(true);
      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Sign in failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#dcf0dd] sm:p-6 md:p-8 lg:p-12 flex items-center justify-center">
      {/* Main Container Card matching the design */}
      <div className="w-full max-w-[1240px] bg-[#eef7ef] rounded-[28px] sm:rounded-[36px] md:rounded-[44px] shadow-2xl border border-green-200/80 overflow-hidden relative">
        
        {/* Subtle decorative leaf vines in upper corners */}
        <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-40">
          <div className="w-full h-full bg-radial from-green-400/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-8 md:p-10 lg:p-12 items-stretch min-h-[640px] lg:min-h-[720px]">
          
          {/* LEFT COLUMN: Dedicated Transparent Container with login-asset */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between relative rounded-3xl overflow-hidden">
            
            {/* Separate Transparent Background Container displaying login-asset.png covering the bottom */}
            <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-[360px] sm:h-[420px] lg:h-[470px] w-full">
                <Image
                  src="/assets/login-asset.png"
                  alt="TickyTICKEY Barangay Health Mascot and Community"
                  fill
                  priority
                  className="object-contain object-bottom filter drop-shadow-sm"
                />
              </div>

              {/* Floating Heart positioned above the mascot */}
              <div className="absolute bottom-[230px] sm:bottom-[270px] lg:bottom-[300px] right-6 sm:right-12 lg:right-10 flex items-center gap-2 z-10">
                <div className="text-green-600 text-xl animate-bounce-subtle">
                  💚
                </div>
              </div>
            </div>

            {/* Foreground Content on Left Side */}
            <div className="relative z-10 space-y-6">
              
              {/* Header Logo & Back to Home */}
              <div className="flex items-center justify-between">
                <Link href="/" className="inline-block group">
                  <div className="relative h-14 w-52 sm:h-16 sm:w-60 transition-transform group-hover:scale-105">
                    <Image
                      src="/assets/logo-header.png"
                      alt="TickyTICKEY - Your Barangay Health Partner"
                      fill
                      priority
                      className="object-contain object-left"
                    />
                  </div>
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#246b38] hover:text-[#184d26] px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white transition-colors border border-green-200/80 shadow-2xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </Link>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2.5 pt-1">
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#123c21] leading-[1.12] tracking-tight">
                  Welcome back, <br />
                  <span className="text-[#206334]">Health Partner!</span>
                </h1>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md font-medium">
                  Manage consultations, appointments, and community health in one place.
                </p>
              </div>

              {/* 3 Value Proposition Cards with constrained width matching mockup */}
              <div className="space-y-3 pt-1 max-w-[260px] sm:max-w-[275px]">
                {/* Card 1 */}
                <div className="flex items-start gap-3 bg-white/80 backdrop-blur-xs p-2.5 sm:p-3 rounded-2xl border border-green-100/90 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#eef7ef] text-[#246b38] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#123c21] leading-tight">
                      Serve your community
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-600 leading-snug pt-0.5">
                      Access resident records and consultations.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-start gap-3 bg-white/80 backdrop-blur-xs p-2.5 sm:p-3 rounded-2xl border border-green-100/90 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#eef7ef] text-[#246b38] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#123c21] leading-tight">
                      Stay organized
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-600 leading-snug pt-0.5">
                      Manage appointments and schedules.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="flex items-start gap-3 bg-white/80 backdrop-blur-xs p-2.5 sm:p-3 rounded-2xl border border-green-100/90 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#eef7ef] text-[#246b38] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#123c21] leading-tight">
                      Make a bigger impact
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-600 leading-snug pt-0.5">
                      Better insights for a healthier barangay.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Spacer for bottom illustration alignment */}
            <div className="h-44 sm:h-52 lg:h-60" />

          </div>

          {/* RIGHT COLUMN: White Login Card (Auto-detecting Role) */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center">
            <div className="w-full bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-9 md:p-10 shadow-xl border border-gray-100 flex flex-col justify-between relative">
              
              {isSubmitted ? (
                <div className="py-16 text-center space-y-5 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-[#246b38] flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#123c21]">
                    Welcome Back!
                  </h2>
                  <p className="text-sm text-gray-600 max-w-xs mx-auto">
                    Account identified and authenticated. Redirecting you to your health system dashboard...
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#2f7543] hover:bg-[#256036] text-white font-bold text-sm shadow-md transition-all"
                    >
                      <span>Go to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Card Header with Sprout Icon */}
                  <div className="flex items-center gap-3.5 pb-2">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        src="/assets/mascot.png"
                        alt="Ticky"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#123c21] tracking-tight">
                        Admin & BHW Login
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Sign in to your TickyTICKEY Barangay Health System account.
                      </p>
                    </div>
                  </div>

                  {/* Email or Username Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">
                      Email or Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={emailOrUser}
                        onChange={(e) => setEmailOrUser(e.target.value)}
                        placeholder="Enter your email or username"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] focus:border-transparent bg-white shadow-2xs transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Input with Eye Toggle */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-11 py-3.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] focus:border-transparent bg-white shadow-2xs transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded text-[#2f7543] focus:ring-[#3fa04e] border-gray-300 accent-[#2f7543]"
                      />
                      <span className="text-xs font-medium text-gray-700">Remember me</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(true)}
                      className="text-xs font-semibold text-[#246b38] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Sign In Button */}
                  {errorMessage && (
                    <p role="alert" className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                      {errorMessage}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#2f7543] hover:bg-[#256036] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
                  </button>

                  {/* Create Account / Request Access Button */}
                  <Link
                    href="/contact"
                    className="w-full py-3 rounded-full bg-[#eaf4eb] hover:bg-[#dcf0dd] text-[#246b38] font-bold text-xs sm:text-sm border border-[#c2e4c7] transition-all duration-150 flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Create account / Request access</span>
                  </Link>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center pt-1">
                    <div className="w-full border-t border-gray-200" />
                    <span className="absolute bg-white px-3 text-[11px] text-gray-400 uppercase font-semibold">
                      or
                    </span>
                  </div>

                  {/* Footer Security Note */}
                  <div className="text-center pt-2 space-y-1.5">
                    <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                      <span>Secure access for authorized health personnel only.</span>
                    </p>
                    <div className="flex items-center justify-center gap-3 text-[10.5px] text-gray-400">
                      <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
                      <span>•</span>
                      <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
      <ForgotPasswordModal isOpen={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
    </div>
  );
}
