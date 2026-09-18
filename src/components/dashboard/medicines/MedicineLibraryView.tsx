"use client";

import Banner from "@/components/dashboard/Banner";
import { mutateAdminResources } from "@/lib/adminClient";
import type { MedicineItem } from "@/types/medicine";
import { useMemo, useState } from "react";
import AddEditMedicineModal from "./AddEditMedicineModal";
import MedicalDisclaimerBanner from "./MedicalDisclaimerBanner";
import MedicineDetailModal from "./MedicineDetailModal";
import MedicineFilterToolbar from "./MedicineFilterToolbar";
import MedicineMetricCards from "./MedicineMetricCards";
import MedicineTable from "./MedicineTable";

interface Props { medicines: MedicineItem[]; canManage: boolean; onDataChange: (medicines: MedicineItem[]) => void; onError: (message: string) => void; }

export default function MedicineLibraryView({ medicines, canManage, onDataChange, onError }: Props) {
  const [selectedId, setSelectedId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStockStatus, setSelectedStockStatus] = useState("All");
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<MedicineItem | null>(null);
  const [saving, setSaving] = useState(false);
  const filteredMedicines = useMemo(() => medicines.filter((medicine) => { const query = searchQuery.toLowerCase().trim(); return (!query || [medicine.name, medicine.genericName, medicine.use, ...medicine.symptomTags].some((value) => value.toLowerCase().includes(query))) && (selectedCategory === "All" || medicine.category === selectedCategory) && (selectedStockStatus === "All" || medicine.stockStatus === selectedStockStatus); }), [medicines, searchQuery, selectedCategory, selectedStockStatus]);
  const selectedMedicine = medicines.find((medicine) => medicine.id === selectedId) ?? filteredMedicines[0] ?? null;
  const runMutation = async (action: string, payload: unknown) => { if (saving) return; setSaving(true); try { onDataChange((await mutateAdminResources(action, payload)).medicines); } catch (error) { onError(error instanceof Error ? error.message : "Unable to save medicine."); } finally { setSaving(false); } };
  return <div className="space-y-6 pb-12" aria-busy={saving}>
    <Banner title="Medicine Library" subtitle="Manage medicines, stock information, and usage guidance for your barangay." cardTitle="Barangay Pharmacy Depot" cardSubtitle="Safe medicines. Healthier communities." className="mb-6" />
    <MedicineMetricCards />
    <MedicineFilterToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} selectedStockStatus={selectedStockStatus} onStockStatusChange={setSelectedStockStatus} onAddMedicine={() => { if (canManage) { setEditingMedicine(null); setAddEditModalOpen(true); } }} />
    <MedicineTable medicines={filteredMedicines} selectedId={selectedMedicine?.id ?? ""} onSelectMedicine={(medicine) => { setSelectedId(medicine.id); setDetailModalOpen(true); }} onEditMedicine={(medicine) => { if (canManage) { setEditingMedicine(medicine); setAddEditModalOpen(true); } }} />
    <MedicalDisclaimerBanner onEditDisclaimer={() => onError("The medical disclaimer is managed in system settings by an administrator.")} />
    <MedicineDetailModal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)} medicine={selectedMedicine} onEdit={(medicine) => { if (canManage) { setEditingMedicine(medicine); setAddEditModalOpen(true); } }} onDeactivate={(id) => { if (canManage && window.confirm("Deactivate this medicine?")) void runMutation("deactivateMedicine", { id }); }} />
    <AddEditMedicineModal isOpen={addEditModalOpen && canManage} onClose={() => setAddEditModalOpen(false)} medicineToEdit={editingMedicine} onSave={(medicine) => { void runMutation("saveMedicine", medicine); setAddEditModalOpen(false); }} />
  </div>;
}
