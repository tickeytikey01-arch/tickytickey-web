"use client";

import Modal from "@/components/ui/Modal";
import { Clock, HelpCircle, Mail, Phone, ShieldCheck } from "lucide-react";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactSupportModal({ isOpen, onClose }: ContactSupportModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Barangay IT Health Support"
      icon={<HelpCircle className="w-5 h-5 text-[#246b38]" />}
    >
      <div className="space-y-4 text-xs text-gray-600">
        <p className="leading-relaxed">
          For urgent clinic connectivity, database syncing, or tablet replacement assistance:
        </p>

        <div className="p-4 bg-green-50/80 rounded-2xl border border-green-100 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-green-100/80 text-[#1b5e20] flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Support Hotline</div>
              <div className="font-bold text-[#123c21] text-sm">+63 (02) 8911-0000</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-green-100/80 text-[#1b5e20] flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Technical Inquiries</div>
              <div className="font-bold text-gray-800">tickeytikey01@gmail.com</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-green-100/80 text-[#1b5e20] flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Service Availability</div>
              <div className="font-bold text-gray-800">24/7 Priority for Barangay Health Centers</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Encrypted terminal connection ID: BGY-01-SECURE</span>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#246b38] hover:bg-[#1b552b] text-white text-xs font-bold transition-all shadow-sm"
          >
            Close Support Dialog
          </button>
        </div>
      </div>
    </Modal>
  );
}
