"use client";

import { MedicineItem } from "@/types/medicine";
import { ArrowUpDown, ChevronLeft, ChevronRight, Edit2, Eye, MoreVertical, Pill } from "lucide-react";

interface TableProps {
  medicines: MedicineItem[];
  selectedId: string;
  onSelectMedicine: (m: MedicineItem) => void;
  onEditMedicine: (m: MedicineItem) => void;
}

export default function MedicineTable({
  medicines,
  selectedId,
  onSelectMedicine,
  onEditMedicine,
}: TableProps) {
  const getCategoryBadge = (cat: MedicineItem["category"]) => {
    switch (cat) {
      case "Fever & Pain":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Cough & Cold":
        return "bg-green-50 text-green-700 border-green-200";
      case "Allergy":
        return "bg-pink-50 text-pink-700 border-pink-200";
      case "Hydration":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Hypertension":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Antibiotic":
        return "bg-teal-50 text-teal-700 border-teal-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStockBadge = (status: MedicineItem["stockStatus"]) => {
    switch (status) {
      case "In Stock":
        return {
          dot: "bg-emerald-500",
          text: "text-emerald-700",
        };
      case "Low Stock":
        return {
          dot: "bg-amber-500",
          text: "text-amber-700",
        };
      case "Out of Stock":
        return {
          dot: "bg-rose-500",
          text: "text-rose-700",
        };
      default:
        return {
          dot: "bg-gray-400",
          text: "text-gray-700",
        };
    }
  };

  const renderIcon = (type: MedicineItem["imageType"]) => {
    switch (type) {
      case "tablet":
        return (
          <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
            ⚪
          </div>
        );
      case "capsule":
        return (
          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 flex-shrink-0">
            💊
          </div>
        );
      case "syrup":
        return (
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 flex-shrink-0">
            🧪
          </div>
        );
      case "sachet":
        return (
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
            💧
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-[#246b38] flex-shrink-0">
            <Pill className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-xs flex flex-col h-full justify-between">
      {/* Table Content */}
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] overscroll-contain scrollbar-thin">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold text-[11px]">
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Name</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Category</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Use</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Dosage</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Stock Status</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Updated By</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th className="py-3 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {medicines.map((med) => {
              const isSelected = med.id === selectedId;
              const stock = getStockBadge(med.stockStatus);

              return (
                <tr
                  key={med.id}
                  onClick={() => onSelectMedicine(med)}
                  className={`hover:bg-gray-50/70 transition-colors cursor-pointer group ${
                    isSelected ? "bg-green-50/50" : ""
                  }`}
                >
                  {/* Name + Thumbnail */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      {renderIcon(med.imageType)}
                      <span className="font-bold text-gray-900 whitespace-nowrap">
                        {med.name}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getCategoryBadge(
                        med.category
                      )}`}
                    >
                      {med.category}
                    </span>
                  </td>

                  {/* Use */}
                  <td className="py-3.5 px-3 text-gray-600 max-w-xs truncate">
                    {med.use}
                  </td>

                  {/* Dosage */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="font-bold text-gray-900">{med.dosage}</div>
                    <div className="text-[10px] text-gray-400">{med.adultDosage}</div>
                  </td>

                  {/* Stock Status */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                      <span className={`w-2 h-2 rounded-full ${stock.dot}`} />
                      <span className={stock.text}>{med.stockStatus}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 pl-3.5">
                      {med.stockQuantity} pcs
                    </div>
                  </td>

                  {/* Updated By */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="font-semibold text-gray-800">{med.updatedBy}</div>
                    <div className="text-[10px] text-gray-400">{med.updatedDate}</div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-3 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onSelectMedicine(med)}
                        className="px-2.5 py-1 rounded-lg border border-green-200 bg-green-50/80 hover:bg-green-100 text-[#246b38] font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditMedicine(med)}
                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-[#246b38] transition-colors cursor-pointer"
                        title="Edit Medicine"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Options for ${med.name}: Stock Adjustment, Batch Number, Supplier History`)}
                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                        title="More Options"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer matching mockup */}
      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <div>Showing 1-5 of 58 medicines</div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer disabled:opacity-40"
            disabled
          >
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg bg-[#246b38] text-white font-bold flex items-center justify-center shadow-2xs cursor-pointer"
          >
            1
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center cursor-pointer"
          >
            2
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center cursor-pointer"
          >
            3
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center cursor-pointer"
          >
            4
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center cursor-pointer"
          >
            5
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
