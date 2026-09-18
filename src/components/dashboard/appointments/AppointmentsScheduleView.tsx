"use client";

import Banner from "@/components/dashboard/Banner";
import { mutateAdminResources } from "@/lib/adminClient";
import type { AdminResources } from "@/types/admin";
import type { AppointmentRequestItem, BhwAvailabilityItem, CalendarAppointment } from "@/types/appointment";
import { useMemo, useState } from "react";
import AppointmentDetailModal from "./AppointmentDetailModal";
import AppointmentMetricCards from "./AppointmentMetricCards";
import AppointmentRequestsTable from "./AppointmentRequestsTable";
import BhwAvailabilityCard from "./BhwAvailabilityCard";
import CalendarView from "./CalendarView";
import DailyScheduleList from "./DailyScheduleList";
import NewAppointmentModal from "./NewAppointmentModal";
import QuickScheduleActions from "./QuickScheduleActions";
import RescheduleModal from "./RescheduleModal";

interface Props { appointments: CalendarAppointment[]; requests: AppointmentRequestItem[]; staffList: BhwAvailabilityItem[]; onDataChange: (data: Partial<AdminResources>) => void; onError: (message: string) => void; }

export default function AppointmentsScheduleView({ appointments, requests, staffList, onDataChange, onError }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); const [newAppointmentOpen, setNewAppointmentOpen] = useState(false); const [rescheduleTarget, setRescheduleTarget] = useState<AppointmentRequestItem | null>(null); const [inspectAppointment, setInspectAppointment] = useState<CalendarAppointment | null>(null); const [saving, setSaving] = useState(false);
  const filteredAppointments = useMemo(() => appointments.filter((item) => item.date === selectedDate), [appointments, selectedDate]);
  const mutate = async (action: string, payload: unknown) => { if (saving) return; setSaving(true); try { const data = await mutateAdminResources(action, payload); onDataChange({ appointments: data.appointments, appointmentRequests: data.appointmentRequests, staffAvailability: data.staffAvailability }); } catch (error) { onError(error instanceof Error ? error.message : "Unable to save appointment."); } finally { setSaving(false); } };
  const exportSchedule = () => { const escape = (value: string) => `"${value.replaceAll('"', '""')}"`; const rows = appointments.map((item) => [item.id, item.residentName, item.service, item.date, item.time, item.assignedBhw, item.status].map(escape).join(",")); const url = URL.createObjectURL(new Blob([["ID,Resident Name,Service,Date,Time,Assigned BHW,Status", ...rows].join("\n")], { type: "text/csv;charset=utf-8" })); const link = document.createElement("a"); link.href = url; link.download = `Barangay_Schedule_${selectedDate}.csv`; link.click(); URL.revokeObjectURL(url); };
  return <div className="space-y-6 pb-12" aria-busy={saving}>
    <Banner title="Appointments & Schedule" subtitle="Manage appointments, view schedules, and keep your community healthy." cardTitle="Barangay Clinic Care" cardSubtitle="A healthier community starts with organized care!" className="mb-6" />
    <AppointmentMetricCards />
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"><div className="lg:col-span-7 flex flex-col min-h-0"><CalendarView selectedDate={selectedDate} onSelectDate={setSelectedDate} /></div><div className="lg:col-span-5 flex flex-col min-h-0"><DailyScheduleList selectedDate={selectedDate} appointments={filteredAppointments} onSelectAppointment={setInspectAppointment} /></div></div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"><div className="lg:col-span-7 flex flex-col min-h-0"><AppointmentRequestsTable requests={requests} onApprove={(id) => void mutate("setAppointmentStatus", { id, status: "confirmed" })} onReschedule={setRescheduleTarget} /></div><div className="lg:col-span-5 space-y-6 flex flex-col"><BhwAvailabilityCard staff={staffList} onViewAll={() => onError("Availability is calculated from confirmed appointments.")} /><QuickScheduleActions onNewAppointment={() => setNewAppointmentOpen(true)} onBlockTimeSlot={() => onError("Clinic closures are managed in system settings.")} onManageBhw={() => onError("Staff access and availability are managed under Users.")} onExportSchedule={exportSchedule} /></div></div>
    <NewAppointmentModal key={selectedDate} isOpen={newAppointmentOpen} onClose={() => setNewAppointmentOpen(false)} defaultDate={selectedDate} healthWorkers={staffList.map((item) => item.name)} onAddAppointment={(item) => { void mutate("saveAppointment", item); setSelectedDate(item.date); setNewAppointmentOpen(false); }} />
    <RescheduleModal isOpen={!!rescheduleTarget} onClose={() => setRescheduleTarget(null)} request={rescheduleTarget} onConfirmReschedule={(id, preferredTime, assignedBhw) => { void mutate("rescheduleAppointment", { id, preferredTime, assignedBhw }); setRescheduleTarget(null); }} />
    <AppointmentDetailModal isOpen={!!inspectAppointment} onClose={() => setInspectAppointment(null)} appointment={inspectAppointment} onStatusChange={(id, status) => void mutate("setAppointmentStatus", { id, status: status.toLowerCase() === "walk-in" ? "confirmed" : status.toLowerCase() })} />
  </div>;
}
