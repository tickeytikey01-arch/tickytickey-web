"use client";

import { AppointmentRequestItem } from "@/types/appointment";
import { ArrowRight, Check, FileText } from "lucide-react";

interface AppointmentRequestsTableProps {
  requests: AppointmentRequestItem[];
  onApprove: (id: string) => void;
  onReschedule: (item: AppointmentRequestItem) => void;
  onViewAll?: () => void;
}

export default function AppointmentRequestsTable({
  requests,
  onApprove,
  onReschedule,
  onViewAll,
}: AppointmentRequestsTableProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-xs flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-green-100/70 text-[#246b38] flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-black text-gray-900">
            Appointment Requests
          </h3>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#246b38] hover:text-[#133d23] transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Requests Table */}
      <div className="pt-2 overflow-x-auto overflow-y-auto max-h-[380px] overscroll-contain flex-1 scrollbar-thin">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold text-[11px]">
              <th className="py-3 px-3">Resident Name</th>
              <th className="py-3 px-3">Service Type</th>
              <th className="py-3 px-3">Prefererd Time</th>
              <th className="py-3 px-3">Assigned BHW</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right sm:text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {requests.map((req) => (
              <tr
                key={req.id}
                className="hover:bg-gray-50/70 transition-colors group"
              >
                {/* Resident Name with Initials Avatar */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#dcf2fe] text-[#0369a1] font-black text-xs flex items-center justify-center flex-shrink-0">
                      {req.initials}
                    </div>
                    <span className="font-bold text-gray-900 whitespace-nowrap">
                      {req.residentName}
                    </span>
                  </div>
                </td>

                {/* Service Type */}
                <td className="py-3 px-3 font-medium text-gray-600 whitespace-nowrap">
                  {req.serviceType}
                </td>

                {/* Preferred Time */}
                <td className="py-3 px-3 text-gray-700 whitespace-nowrap">
                  {req.preferredTime}
                </td>

                {/* Assigned BHW */}
                <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                  {req.assignedBhw || "Unassigned"}
                </td>

                {/* Status Badge */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      req.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : req.status === "Rescheduled"
                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                        : "bg-[#fdf3e5] text-[#b45309] border border-[#fae2c1]"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-3 whitespace-nowrap text-right sm:text-center">
                  <div className="flex items-center justify-end sm:justify-center gap-2">
                    {req.status === "Approved" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        <Check className="w-3.5 h-3.5" />
                        <span>Confirmed</span>
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => onApprove(req.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#246b38] hover:bg-[#1a552b] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => onReschedule(req)}
                          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                        >
                          Reschedule
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
