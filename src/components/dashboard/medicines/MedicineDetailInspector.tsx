"use client";

import { MedicineItem } from "@/types/medicine";
import { AlertTriangle, Edit, Trash2, X } from "lucide-react";

interface InspectorProps {
  medicine: MedicineItem | null;
  onClose?: () => void;
  onEdit: (m: MedicineItem) => void;
  onDeactivate: (id: string) => void;
}

export default function MedicineDetailInspector({
  medicine,
  onClose,
  onEdit,
  onDeactivate,
}: InspectorProps) {
  if (!medicine) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex items-center justify-center text-center text-xs text-gray-400 h-full">
        Select a medicine from the list to inspect details.
      </div>
    );
  }

  const isLowStock = medicine.stockStatus === "Low Stock";

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-xs flex flex-col justify-between h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <h3 className="text-base sm:text-lg font-black text-gray-900">
            {medicine.name}
          </h3>
        </div>

        <span
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${
            isLowStock
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isLowStock ? "bg-amber-500" : "bg-emerald-500"
            }`}
          />
          <span>{medicine.stockStatus}</span>
        </span>
      </div>

      {/* Scrollable details */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 scrollbar-thin text-xs">
        {/* Medicine Product Box Illustration matching mockup */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#f8faf9] to-[#edf7ef]/50 border border-green-100/80 flex items-center justify-center relative overflow-hidden">
          <div className="flex items-center gap-4">
            {/* Box package card */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-xs text-left w-36">
              <div className="text-[11px] font-black text-blue-900 leading-tight">
                {medicine.name}
              </div>
              <div className="text-[9px] font-bold text-gray-400 mt-0.5">
                {medicine.dosage}
              </div>
              <div className="w-full h-1 bg-blue-500 rounded-full mt-2" />
            </div>

            {/* Blister pack illustration */}
            <div className="bg-gray-100 p-2.5 rounded-xl border border-gray-300 shadow-2xs grid grid-cols-3 gap-1.5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-3.5 h-3.5 rounded-full bg-white border border-gray-300 shadow-2xs"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Data Meta Rows */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-1 border-b border-gray-50">
            <span className="text-gray-400 font-semibold">Category</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 text-[11px]">
              {medicine.category}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-gray-50">
            <span className="text-gray-400 font-semibold">Generic Name</span>
            <span className="font-bold text-gray-900">{medicine.genericName}</span>
          </div>

          <div className="py-1 border-b border-gray-50">
            <span className="text-gray-400 font-semibold block mb-0.5">Use</span>
            <p className="font-semibold text-gray-800 leading-relaxed">
              {medicine.use}
            </p>
          </div>

          <div className="py-1 border-b border-gray-50 space-y-1">
            <span className="text-gray-400 font-semibold block">Dosage Guidance</span>
            <div className="text-gray-800 font-bold">
              Adults: <span className="font-medium text-gray-600">{medicine.adultDosage}</span>
            </div>
            <div className="text-gray-800 font-bold">
              Children: <span className="font-medium text-gray-600">{medicine.pediatricDosage}</span>
            </div>
          </div>

          {/* Caution Alert Card */}
          <div className="p-3 rounded-2xl bg-[#fef8ed] border border-[#fae2bd] flex items-start gap-2.5 text-[#b45309]">
            <AlertTriangle className="w-4 h-4 text-[#d97706] flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed font-semibold">
              {medicine.caution}
            </p>
          </div>

          {/* Symptom Tags */}
          <div className="py-1 space-y-1.5">
            <span className="text-gray-400 font-semibold block">Common Symptom Tags</span>
            <div className="flex flex-wrap gap-1.5">
              {medicine.symptomTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-md text-[10px] border border-blue-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center py-1 border-t border-gray-50 text-[11px]">
            <span className="text-gray-400 font-semibold">Stock Information</span>
            <span className="font-bold text-[#133d23]">{medicine.stockQuantity} pieces available</span>
          </div>

          <div className="flex justify-between items-center py-1 text-[11px]">
            <span className="text-gray-400 font-semibold">Last Updated</span>
            <span className="font-medium text-gray-600">
              {medicine.updatedDate} by {medicine.updatedBy}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={() => onEdit(medicine)}
          className="flex-1 py-2.5 rounded-xl bg-[#246b38] hover:bg-[#1a552b] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>Edit Medicine</span>
        </button>

        <button
          type="button"
          onClick={() => onDeactivate(medicine.id)}
          className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Deactivate</span>
        </button>
      </div>
    </div>
  );
}
