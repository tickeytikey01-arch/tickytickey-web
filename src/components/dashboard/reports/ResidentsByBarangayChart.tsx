"use client";

import { BarangayResidentItem } from "@/types/reports";
import { Users } from "lucide-react";

interface Props {
  data?: BarangayResidentItem[];
}

export default function ResidentsByBarangayChart({ data }: Props) {
  const items: BarangayResidentItem[] = data || [
    { barangay: "San Isidro", count: 320, color: "#246b38" },
    { barangay: "Poblacion", count: 285, color: "#3a844f" },
    { barangay: "Mabini", count: 210, color: "#529e67" },
    { barangay: "Rizal", count: 182, color: "#6cb880" },
    { barangay: "Del Pilar", count: 165, color: "#88d09b" },
    { barangay: "Bonifacio", count: 145, color: "#a6e5b6" },
    { barangay: "New Hope", count: 98, color: "#c6f2d1" },
    { barangay: "Others", count: 57, color: "#dff8e6" },
  ];

  const maxVal = 320;

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900">Residents by Barangay</h3>
        </div>
      </div>

      {/* Horizontal Bars List */}
      <div className="space-y-2.5 pt-3 flex-1">
        {items.map((item) => {
          const percent = Math.round((item.count / maxVal) * 100);

          return (
            <div key={item.barangay} className="flex items-center gap-2.5 text-xs">
              {/* Barangay Name */}
              <span className="w-20 sm:w-22 text-right font-semibold text-gray-700 truncate">
                {item.barangay}
              </span>

              {/* Bar track and bar */}
              <div className="flex-1 bg-transparent h-4 rounded-r-md flex items-center">
                <div
                  className="h-4 rounded-r-md transition-all duration-500 hover:opacity-90 flex items-center"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: item.color,
                  }}
                />
                <span className="pl-2 font-bold text-gray-800 text-[11px]">
                  {item.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
