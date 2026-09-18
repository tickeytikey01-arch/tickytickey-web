"use client";

import { MonthlyReportRow } from "@/types/reports";
import { FileSpreadsheet } from "lucide-react";

interface Props {
  rows?: MonthlyReportRow[];
}

export default function MonthlySummaryTable({ rows }: Props) {
  const tableRows: MonthlyReportRow[] = rows || [
    {
      month: "January",
      consultations: "1,120",
      appointments: "801",
      resolvedCases: "684",
      announcements: 12,
    },
    {
      month: "February",
      consultations: "1,248",
      appointments: "892",
      resolvedCases: "761",
      announcements: 10,
    },
    {
      month: "March",
      consultations: "1,382",
      appointments: "956",
      resolvedCases: "845",
      announcements: 14,
    },
    {
      month: "April",
      consultations: "1,462",
      appointments: "1,028",
      resolvedCases: "912",
      announcements: 16,
      isCurrent: true,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-[#246b38] flex items-center justify-center">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900">Monthly Summary</h3>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto pt-2 flex-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold text-[10.5px]">
              <th className="py-2.5 px-2">Month</th>
              <th className="py-2.5 px-2 text-center">Consultations</th>
              <th className="py-2.5 px-2 text-center">Appointments</th>
              <th className="py-2.5 px-2 text-center">Resolved Cases</th>
              <th className="py-2.5 px-2 text-center">Announcements</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-medium">
            {tableRows.map((row) => (
              <tr
                key={row.month}
                className={`transition-colors ${
                  row.isCurrent
                    ? "bg-[#eef7f0] font-bold text-[#133d23] rounded-xl"
                    : "text-gray-700 hover:bg-gray-50/70"
                }`}
              >
                <td className="py-3 px-2 font-bold whitespace-nowrap">
                  {row.month}
                </td>
                <td className="py-3 px-2 text-center whitespace-nowrap">
                  {row.consultations}
                </td>
                <td className="py-3 px-2 text-center whitespace-nowrap">
                  {row.appointments}
                </td>
                <td className="py-3 px-2 text-center whitespace-nowrap">
                  {row.resolvedCases}
                </td>
                <td className="py-3 px-2 text-center whitespace-nowrap">
                  {row.announcements}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
