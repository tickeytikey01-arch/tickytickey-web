"use client";

import { Check, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDisclaimer: string;
  onSave: (text: string) => void;
}

export default function EditDisclaimerModal({
  isOpen,
  onClose,
  currentDisclaimer,
  onSave,
}: DisclaimerModalProps) {
  const [disclaimer, setDisclaimer] = useState(currentDisclaimer);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(disclaimer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#133d23] to-[#246b38] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5" />
            <div>
              <h2 className="text-lg font-black">Edit Medical Disclaimer</h2>
              <p className="text-xs text-green-100">
                System-wide disclaimer displayed on mobile and web medicine portals.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">Disclaimer Notice</label>
            <textarea
              rows={5}
              required
              value={disclaimer}
              onChange={(e) => setDisclaimer(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#246b38] hover:bg-[#1a552b] text-white font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Update Disclaimer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
