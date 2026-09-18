"use client";

import { ConsultationItem } from "@/types/dashboard";
import { ArrowRight, FileText } from "lucide-react";

interface PendingConsultationsTableProps {
  consultations: ConsultationItem[];
  onStatusChange?: (id: string, newStatus: ConsultationItem["status"]) => void;
  onViewAll?: () => void;
  onSelectConsultation?: (consultation: ConsultationItem) => void;
}

export default function PendingConsultationsTable({
  consultations,
  onStatusChange,
  onViewAll,
  onSelectConsultation,
}: PendingConsultationsTableProps) {
  const getStatusBadge = (status: ConsultationItem["status"]) => {
    switch (status) {
      case "Waiting":
        return "bg-amber-50 text-amber-700 border-amber-200/60";
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Replied":
        return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "Resolved":
      case "Completed":
        return "bg-purple-50 text-purple-700 border-purple-200/60";
    }
  };

  const getStatusDot = (status: ConsultationItem["status"]) => {
    switch (status) {
      case "Waiting":
        return "bg-amber-500";
      case "Active":
        return "bg-emerald-500";
      case "Replied":
        return "bg-blue-500";
      case "Completed":
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Pending Consultations</h3>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-[#246b38] hover:text-[#184e27] inline-flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto overflow-y-auto max-h-[350px] overscroll-contain scrollbar-thin">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
              <th className="pb-3 font-semibold">Resident Name</th>
              <th className="pb-3 font-semibold">Concern</th>
              <th className="pb-3 font-semibold">Assigned BHW</th>
              <th className="pb-3 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {consultations.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectConsultation && onSelectConsultation(item)}
                className="hover:bg-green-50/60 transition-colors cursor-pointer group"
              >
                {/* Initials & Name */}
                <td className="py-3 pr-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#dcf0dd] text-[#1c552c] font-black text-[10px] flex items-center justify-center flex-shrink-0 group-hover:bg-[#cbe6cf] transition-colors">
                      {item.initials}
                    </div>
                    <span className="font-bold text-gray-900 truncate max-w-[120px] group-hover:text-[#184e27] transition-colors">
                      {item.residentName}
                    </span>
                  </div>
                </td>

                {/* Concern */}
                <td className="py-3 px-2 text-gray-600 font-medium">
                  {item.concern}
                </td>

                {/* Assigned BHW */}
                <td className="py-3 px-2 text-gray-600 font-medium">
                  {item.assignedBHW}
                </td>

                {/* Status Badge */}
                <td className="py-3 pl-2 text-right">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onStatusChange) {
                        const nextStatus =
                          item.status === "Waiting"
                            ? "Active"
                            : item.status === "Active"
                            ? "Replied"
                            : item.status === "Replied"
                            ? "Resolved"
                            : "Waiting";
                        onStatusChange(item.id, nextStatus);
                      }
                    }}
                    title="Click to advance status"
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(item.status)}`} />
                    <span>{item.status}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
