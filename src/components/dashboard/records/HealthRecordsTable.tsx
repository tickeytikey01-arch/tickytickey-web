"use client";

import { HealthRecordItem } from "@/types/record";
import { Archive, CheckCircle2, Edit2, Eye, HeartPulse, ShieldCheck } from "lucide-react";

interface HealthRecordsTableProps {
  records: HealthRecordItem[];
  onViewRecord: (r: HealthRecordItem) => void;
  onEditRecord: (r: HealthRecordItem) => void;
  onToggleStatus: (id: string) => void;
}

export default function HealthRecordsTable({
  records,
  onViewRecord,
  onEditRecord,
  onToggleStatus,
}: HealthRecordsTableProps) {
  const getCategoryBadge = (category: HealthRecordItem["primaryCategory"]) => {
    switch (category) {
      case "Hypertension":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Diabetes":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Maternal/Prenatal":
        return "bg-pink-50 text-pink-700 border-pink-200";
      case "Senior Care":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Pediatric":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "General":
      default:
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  const getStatusBadge = (status: HealthRecordItem["status"]) => {
    switch (status) {
      case "Active":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        };
      case "Pending":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
        };
      case "Archived":
        return {
          bg: "bg-gray-100 text-gray-600 border-gray-200",
          dot: "bg-gray-400",
        };
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-2xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[#133d23]">Resident Health Passports ({records.length})</h3>
          <p className="text-[11px] text-gray-400">Electronic records, clinical vitals history, and maintenance programs</p>
        </div>
        <div className="text-[11px] text-gray-400 font-medium hidden sm:block">
          Click row to inspect full clinical passport
        </div>
      </div>

      {/* Table responsive container */}
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] overscroll-contain scrollbar-thin">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold text-[11px]">
              <th className="py-3 px-3">Resident / PhilHealth</th>
              <th className="py-3 px-3">Age / Blood</th>
              <th className="py-3 px-3">Purok & BHW</th>
              <th className="py-3 px-3">Latest Vitals</th>
              <th className="py-3 px-3">Condition & Tags</th>
              <th className="py-3 px-3">Last Visit</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-medium">
            {records.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-gray-400">
                  No resident health records match your current filters.
                </td>
              </tr>
            ) : (
              records.map((r) => {
                const statusBadge = getStatusBadge(r.status);

                return (
                  <tr
                    key={r.id}
                    className="hover:bg-gray-50/70 transition-colors cursor-pointer group"
                    onClick={() => onViewRecord(r)}
                  >
                    {/* Resident Info */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#edf7ee] text-[#1c552c] font-black text-xs flex items-center justify-center flex-shrink-0 border border-green-200 group-hover:scale-105 transition-transform">
                          {r.initials}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 leading-tight group-hover:text-[#246b38] transition-colors">
                            {r.residentName}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {r.philHealthId ? (
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                <ShieldCheck className="w-2.5 h-2.5" />
                                {r.philHealthId}
                              </span>
                            ) : (
                              <span className="text-[10px] text-gray-400">No PhilHealth</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Age / Blood */}
                    <td className="py-3.5 px-3">
                      <div className="text-gray-800 font-semibold">{r.age} yrs • {r.gender}</div>
                      <div className="text-[10px] text-rose-600 font-bold mt-0.5">
                        Type {r.bloodType}
                      </div>
                    </td>

                    {/* Purok & BHW */}
                    <td className="py-3.5 px-3">
                      <div className="text-gray-900 font-semibold">{r.purok}</div>
                      <div className="text-[11px] text-gray-400">BHW: {r.assignedBhw}</div>
                    </td>

                    {/* Vitals */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5 text-gray-800 font-bold">
                        <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                        <span>{r.vitals.bp}</span>
                      </div>
                      <div className="text-[10.5px] text-gray-400 mt-0.5">
                        {r.vitals.heartRate} bpm • BMI {r.vitals.bmi}
                      </div>
                    </td>

                    {/* Category & Tags */}
                    <td className="py-3.5 px-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${getCategoryBadge(r.primaryCategory)}`}>
                        {r.primaryCategory}
                      </span>
                      {r.chronicConditions.length > 0 && (
                        <div className="text-[10.5px] text-gray-500 mt-1 truncate max-w-[150px]">
                          {r.chronicConditions.join(", ")}
                        </div>
                      )}
                    </td>

                    {/* Last Visit */}
                    <td className="py-3.5 px-3 text-gray-600 whitespace-nowrap">
                      {r.lastVisitDate}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${statusBadge.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                        {r.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => onViewRecord(r)}
                          title="View Health Passport Dossier"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#246b38] hover:bg-green-50 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onEditRecord(r)}
                          title="Edit Health Record"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleStatus(r.id)}
                          title={r.status === "Active" ? "Archive Record" : "Activate Record"}
                          className={`p-1.5 rounded-lg transition-colors ${
                            r.status === "Active"
                              ? "text-gray-400 hover:text-amber-600 hover:bg-amber-50"
                              : "text-emerald-600 hover:bg-emerald-50"
                          }`}
                        >
                          {r.status === "Active" ? (
                            <Archive className="w-3.5 h-3.5" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
