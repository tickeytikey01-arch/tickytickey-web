"use client";

import { MedicineItem } from "@/types/medicine";
import { AlertTriangle, Clock, Edit, Pill, Sparkles, Trash2, X } from "lucide-react";

interface MedicineDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicine: MedicineItem | null;
  onEdit: (medicine: MedicineItem) => void;
  onDeactivate: (id: string) => void;
}

export default function MedicineDetailModal({
  isOpen,
  onClose,
  medicine,
  onEdit,
  onDeactivate,
}: MedicineDetailModalProps) {
  if (!isOpen || !medicine) return null;

  const isLowStock = medicine.stockStatus === "Low Stock";

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-green-50 text-[#246b38] flex items-center justify-center border border-green-100 flex-shrink-0">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">
                  {medicine.name}
                </h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                    isLowStock
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isLowStock ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
                    }`}
                  />
                  <span>{medicine.stockStatus}</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">{medicine.genericName}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          {/* Packaging Illustration */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#f8faf9] to-[#edf7ef]/70 border border-green-100 flex items-center justify-center relative overflow-hidden shadow-inner">
            <div className="flex items-center gap-5">
              {/* Product Box */}
              <div className="bg-white p-3.5 rounded-xl border border-blue-200 shadow-sm text-left w-40">
                <div className="text-[11px] font-black text-blue-900 leading-tight">
                  {medicine.name}
                </div>
                <div className="text-[9px] font-bold text-gray-400 mt-0.5">
                  {medicine.dosage}
                </div>
                <div className="w-full h-1.5 bg-blue-500 rounded-full mt-2.5" />
                <div className="text-[8px] text-gray-400 mt-1">Rx Only • DOH Approved</div>
              </div>

              {/* Blister pack foil card */}
              <div className="bg-gray-100/90 p-3 rounded-xl border border-gray-300 shadow-2xs grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full bg-white border border-gray-300 shadow-2xs flex items-center justify-center text-[7px] text-gray-400 font-bold"
                  >
                    •
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Table Card */}
          <div className="space-y-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500 font-semibold">Category</span>
              <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 text-xs">
                {medicine.category}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500 font-semibold">Generic Name</span>
              <span className="font-bold text-gray-900 text-xs">{medicine.genericName}</span>
            </div>

            <div className="py-1 border-b border-gray-100">
              <span className="text-gray-500 font-semibold block mb-0.5">Therapeutic Use</span>
              <p className="font-medium text-gray-800 leading-relaxed text-xs">
                {medicine.use}
              </p>
            </div>

            <div className="py-1 border-b border-gray-100 space-y-1.5">
              <div className="flex items-center gap-1.5 text-gray-700 font-bold">
                <Clock className="w-3.5 h-3.5 text-[#246b38]" />
                <span>Dosage Guidance</span>
              </div>
              <div className="text-gray-800 font-semibold pl-5">
                Adults: <span className="font-medium text-gray-600">{medicine.adultDosage}</span>
              </div>
              <div className="text-gray-800 font-semibold pl-5">
                Children: <span className="font-medium text-gray-600">{medicine.pediatricDosage}</span>
              </div>
            </div>

            {/* Caution Alert Card */}
            <div className="p-3.5 rounded-xl bg-[#fef8ed] border border-[#fae2bd] flex items-start gap-2.5 text-[#b45309]">
              <AlertTriangle className="w-4 h-4 text-[#d97706] flex-shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed font-semibold">
                {medicine.caution}
              </p>
            </div>

            {/* Symptom Tags */}
            <div className="py-1 space-y-1.5">
              <span className="text-gray-500 font-semibold block">Common Symptom Tags</span>
              <div className="flex flex-wrap gap-1.5">
                {medicine.symptomTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-lg text-[11px] border border-blue-100 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-xs">
              <span className="text-gray-500 font-semibold">Current Stock</span>
              <span className="font-black text-[#133d23] text-sm">{medicine.stockQuantity} pcs available</span>
            </div>

            <div className="flex justify-between items-center text-[11px] text-gray-400">
              <span>Last inventory check by</span>
              <span className="font-medium text-gray-600">{medicine.updatedBy} ({medicine.updatedDate})</span>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onDeactivate(medicine.id);
            }}
            className="px-4 py-2.5 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 font-bold text-xs transition-colors flex items-center gap-1.5 border border-rose-200 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Deactivate</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gray-200 font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(medicine);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#246b38] hover:bg-[#1b552b] text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Medicine</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
