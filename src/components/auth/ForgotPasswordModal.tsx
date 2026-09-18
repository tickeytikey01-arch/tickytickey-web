"use client";

import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_PATTERN = /^\d{6}$/;

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const close = () => {
    if (isSubmitting) return;
    setEmail("");
    setOtp("");
    setPassword("");
    setCodeSent(false);
    setCompleted(false);
    setMessage("");
    setError("");
    onClose();
  };

  const sendCode = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setError("Enter a valid registered email address.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const { error: sendError } = await createClient().auth.resetPasswordForEmail(normalizedEmail);
      if (sendError) throw sendError;
      setEmail(normalizedEmail);
      setCodeSent(true);
      setMessage(`If an account exists for ${normalizedEmail}, a six-digit code has been sent.`);
    } catch {
      setError("Unable to send a verification code. Please try again shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updatePassword = async () => {
    if (!OTP_PATTERN.test(otp)) {
      setError("Enter the six-digit email code.");
      return;
    }
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError("Use at least eight characters with a letter and number.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "recovery",
      });
      if (verifyError) throw verifyError;

      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;

      await supabase.auth.signOut();
      setCompleted(true);
      setCodeSent(false);
      setOtp("");
      setPassword("");
      setMessage("Password updated. You can now sign in with the new password.");
    } catch {
      setError("The code is invalid or expired. Check it and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrimaryAction = () => {
    if (completed) {
      close();
      return;
    }
    void (codeSent ? updatePassword() : sendCode());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-password-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="w-full max-w-md rounded-3xl border border-green-100 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="reset-password-title" className="text-lg font-black text-[#133d23]">
              Reset password
            </h2>
            <p className="mt-1 text-xs text-gray-500">Receive a six-digit code by email.</p>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close password reset"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <label htmlFor="reset-email" className="block text-xs font-bold text-gray-700">
            Registered email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#246b38]" />
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={codeSent || completed}
              autoComplete="email"
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-[#3fa04e]"
              placeholder="you@example.com"
            />
          </div>

          {codeSent && (
            <>
              <label htmlFor="reset-code" className="block text-xs font-bold text-gray-700">
                Verification code
              </label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#246b38]" />
                <input
                  id="reset-code"
                  inputMode="numeric"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  autoComplete="one-time-code"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm tracking-[0.3em] outline-none focus:ring-2 focus:ring-[#3fa04e]"
                  placeholder="000000"
                />
              </div>
              <label htmlFor="reset-password" className="block text-xs font-bold text-gray-700">
                New password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#246b38]" />
                <input
                  id="reset-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  maxLength={72}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-[#3fa04e]"
                  placeholder="8+ characters with a letter and number"
                />
              </div>
            </>
          )}

          {message && (
            <p role="status" className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-800">
              {message}
            </p>
          )}
          {error && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </p>
          )}

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handlePrimaryAction}
            className="w-full rounded-full bg-[#2f7543] py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {isSubmitting
              ? "Please wait…"
              : completed
                ? "Back to sign in"
                : codeSent
                  ? "Verify and update password"
                  : "Send email code"}
          </button>
        </div>
      </div>
    </div>
  );
}
