"use client";

import Banner from "@/components/dashboard/Banner";
import { mutateAdminResources } from "@/lib/adminClient";
import type { ClinicalNote, HealthRecordItem, HealthRecordMetrics, PrescriptionRecord } from "@/types/record";
import { useMemo, useState } from "react";
import AddEditHealthRecordModal from "./AddEditHealthRecordModal";
import HealthRecordDossierModal from "./HealthRecordDossierModal";
import HealthRecordFilterToolbar from "./HealthRecordFilterToolbar";
import HealthRecordMetricCards from "./HealthRecordMetricCards";
import HealthRecordsTable from "./HealthRecordsTable";

interface Props { records: HealthRecordItem[]; canManage: boolean; onDataChange: (records: HealthRecordItem[]) => void; onError: (message: string) => void; }

export default function HealthRecordsView({ records, canManage, onDataChange, onError }: Props) {
  const [searchQuery, setSearchQuery] = useState(""); const [selectedPurok, setSelectedPurok] = useState("All"); const [selectedCategory, setSelectedCategory] = useState("All"); const [selectedStatus, setSelectedStatus] = useState("All"); const [viewingRecord, setViewingRecord] = useState<HealthRecordItem | null>(null); const [recordToEdit, setRecordToEdit] = useState<HealthRecordItem | null>(null); const [addEditModalOpen, setAddEditModalOpen] = useState(false); const [saving, setSaving] = useState(false);
  const metrics: HealthRecordMetrics = useMemo(() => ({ totalRecords: records.length, philHealthEnrolled: records.filter((item) => Boolean(item.philHealthId)).length, activeMaintenancePlans: records.filter((item) => item.prescriptions.some((entry) => entry.status === "Active")).length, immunizationPassports: records.filter((item) => item.vaccinations.length > 0).length }), [records]);
  const filtered = useMemo(() => records.filter((item) => { const query = searchQuery.toLowerCase().trim(); return (!query || [item.residentName, item.purok, item.philHealthId ?? "", item.residentId, ...item.chronicConditions].some((value) => value.toLowerCase().includes(query))) && (selectedPurok === "All" || item.purok === selectedPurok) && (selectedCategory === "All" || item.primaryCategory === selectedCategory) && (selectedStatus === "All" || item.status === selectedStatus); }), [records, searchQuery, selectedPurok, selectedCategory, selectedStatus]);
  const save = async (record: HealthRecordItem) => { if (!canManage || saving) return; setSaving(true); try { const next = (await mutateAdminResources("saveHealthRecord", record)).healthRecords; onDataChange(next); const updated = next.find((item) => item.id === record.id || item.residentName === record.residentName); if (updated) setViewingRecord(updated); } catch (error) { onError(error instanceof Error ? error.message : "Unable to save health record."); } finally { setSaving(false); } };
  const updateRecord = (id: string, change: (record: HealthRecordItem) => HealthRecordItem) => { const record = records.find((item) => item.id === id); if (record) void save(change(record)); };
  return <div className="space-y-6 pb-12" aria-busy={saving}>
    <Banner title="Resident Health Records" subtitle="Electronic Health Records (EHR) & Barangay Resident Health Passports" cardTitle="Resident Health Passports" cardSubtitle="Secure electronic health files. Complete triage & medical history!" className="mb-6" />
    <HealthRecordMetricCards metrics={metrics} />
    <HealthRecordFilterToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedPurok={selectedPurok} onPurokChange={setSelectedPurok} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} onAddRecord={() => { if (canManage) { setRecordToEdit(null); setAddEditModalOpen(true); } }} />
    <HealthRecordsTable records={filtered} onViewRecord={setViewingRecord} onEditRecord={(record) => { if (canManage) { setRecordToEdit(record); setAddEditModalOpen(true); } }} onToggleStatus={(id) => updateRecord(id, (record) => ({ ...record, status: record.status === "Active" ? "Archived" : "Active" }))} />
    <HealthRecordDossierModal isOpen={!!viewingRecord} onClose={() => setViewingRecord(null)} record={viewingRecord} onEdit={(record) => { if (canManage) { setRecordToEdit(record); setAddEditModalOpen(true); } }} onAddNote={(id, note: ClinicalNote) => updateRecord(id, (record) => ({ ...record, clinicalNotes: [note, ...record.clinicalNotes] }))} onAddPrescription={(id, prescription: PrescriptionRecord) => updateRecord(id, (record) => ({ ...record, prescriptions: [prescription, ...record.prescriptions] }))} />
    <AddEditHealthRecordModal isOpen={addEditModalOpen && canManage} onClose={() => setAddEditModalOpen(false)} recordToEdit={recordToEdit} onSave={(record) => { void save(record); setAddEditModalOpen(false); }} />
  </div>;
}
