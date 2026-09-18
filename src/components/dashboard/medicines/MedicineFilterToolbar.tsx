"use client";

import { Layers, LayoutGrid, Plus, Search } from "lucide-react";

interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedStockStatus: string;
  onStockStatusChange: (status: string) => void;
  onAddMedicine: () => void;
}

export default function MedicineFilterToolbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStockStatus,
  onStockStatusChange,
  onAddMedicine,
}: ToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
      {/* Left Filters Group */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 min-w-0">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search medicines (e.g. Paracetamol)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-gray-200/80 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] shadow-2xs"
          />
        </div>

        {/* Categories Dropdown */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full sm:w-auto appearance-none pl-9 pr-8 py-2.5 rounded-2xl bg-white border border-gray-200/80 text-xs font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] cursor-pointer shadow-2xs"
          >
            <option value="All">All Categories</option>
            <option value="Fever & Pain">Fever &amp; Pain</option>
            <option value="Cough & Cold">Cough &amp; Cold</option>
            <option value="Allergy">Allergy</option>
            <option value="Hydration">Hydration</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Antibiotic">Antibiotic</option>
          </select>
          <LayoutGrid className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Stock Status Dropdown */}
        <div className="relative">
          <select
            value={selectedStockStatus}
            onChange={(e) => onStockStatusChange(e.target.value)}
            className="w-full sm:w-auto appearance-none pl-9 pr-8 py-2.5 rounded-2xl bg-white border border-gray-200/80 text-xs font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3fa04e] cursor-pointer shadow-2xs"
          >
            <option value="All">All Stock Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <Layers className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Right Action: + Add Medicine */}
      <button
        type="button"
        onClick={onAddMedicine}
        className="px-5 py-2.5 rounded-2xl bg-[#246b38] hover:bg-[#1a552b] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-shrink-0"
      >
        <Plus className="w-4 h-4" />
        <span>Add Medicine</span>
      </button>
    </div>
  );
}
