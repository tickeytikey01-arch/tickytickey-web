"use client";

import { ClinicalNote, HealthRecordItem, PrescriptionRecord } from "@/types/record";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  HeartPulse,
  MapPin,
  Phone,
  Pill,
  Plus,
  Printer,
  ShieldCheck,
  Syringe,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

interface HealthRecordDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: HealthRecordItem | null;
  onEdit: (r: HealthRecordItem) => void;
  onAddNote?: (recordId: string, note: ClinicalNote) => void;
  onAddPrescription?: (recordId: string, rx: PrescriptionRecord) => void;
}

export default function HealthRecordDossierModal({
  isOpen,
  onClose,
  record,
  onEdit,
  onAddNote,
  onAddPrescription,
}: HealthRecordDossierModalProps) {
  const [activeTab, setActiveTab] = useState<
    "demographics" | "vitals" | "prescriptions" | "immunization" | "notes"
  >("demographics");

  // Local state for adding a clinical note
  const [newNoteText, setNewNoteText] = useState("");
  const newNoteAuthor = "Dr. Roberto Mendoza, MD";
  const newNoteRole = "Doctor";

  // Local state for adding a quick prescription
  const [showAddRx, setShowAddRx] = useState(false);
  const [rxName, setRxName] = useState("");
  const [rxDosage, setRxDosage] = useState("");
  const [rxFreq, setRxFreq] = useState("");
  const rxDuration = "30 days";

  if (!isOpen || !record) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !onAddNote) return;

    const newNote: ClinicalNote = {
      id: `note-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      author: newNoteAuthor,
      role: newNoteRole,
      note: newNoteText.trim(),
    };

    onAddNote(record.id, newNote);
    setNewNoteText("");
  };

  const handleCreateRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rxName.trim() || !onAddPrescription) return;

    const newRx: PrescriptionRecord = {
      id: `rx-${Date.now()}`,
      medicineName: rxName.trim(),
      dosage: rxDosage.trim() || "500mg",
      frequency: rxFreq.trim() || "Once daily with food",
      duration: rxDuration.trim() || "30 days",
      prescribedBy: "Dr. Roberto Mendoza, MD",
      status: "Active",
    };

    onAddPrescription(record.id, newRx);
    setRxName("");
    setRxDosage("");
    setRxFreq("");
    setShowAddRx(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#edf7ee] border-b border-green-100 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#246b38] text-white font-black text-xl flex items-center justify-center shadow-md flex-shrink-0">
              {record.initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-black text-[#133d23]">{record.residentName}</h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-200/70 text-[#133d23]">
                  {record.residentId}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  Blood Type: {record.bloodType}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-gray-700 border border-gray-200">
                  {record.age} yrs • {record.gender}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-1.5 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {record.purok}, Barangay San Isidro
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  {record.contactPhone}
                </span>
                {record.philHealthId && (
                  <span className="flex items-center gap-1 text-emerald-800 font-mono font-bold bg-emerald-100/60 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    PhilHealth: {record.philHealthId}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              title="Print Health Passport"
              className="p-2 rounded-xl text-gray-600 hover:text-[#246b38] hover:bg-white transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(record);
              }}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors"
            >
              Edit EHR
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-gray-100 overflow-x-auto bg-gray-50/50">
          <button
            type="button"
            onClick={() => setActiveTab("demographics")}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "demographics"
                ? "border-[#246b38] text-[#246b38] bg-white shadow-2xs"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-white/50"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Demographics & Emergency</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("vitals")}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "vitals"
                ? "border-[#246b38] text-[#246b38] bg-white shadow-2xs"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-white/50"
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Clinical Vitals & Triage</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("prescriptions")}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "prescriptions"
                ? "border-[#246b38] text-[#246b38] bg-white shadow-2xs"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-white/50"
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Prescriptions ({record.prescriptions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("immunization")}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "immunization"
                ? "border-[#246b38] text-[#246b38] bg-white shadow-2xs"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-white/50"
            }`}
          >
            <Syringe className="w-3.5 h-3.5" />
            <span>Immunization Passport ({record.vaccinations.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notes")}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "notes"
                ? "border-[#246b38] text-[#246b38] bg-white shadow-2xs"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-white/50"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Clinical Notes ({record.clinicalNotes.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: Demographics */}
          {activeTab === "demographics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Identification & Family */}
                <div className="bg-gray-50/70 p-4 sm:p-5 rounded-2xl border border-gray-200">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Resident & Station Registration
                  </h4>
                  <dl className="space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-gray-500 font-medium">Assigned BHW:</dt>
                      <dd className="font-bold text-gray-800">{record.assignedBhw}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500 font-medium">Resident ID:</dt>
                      <dd className="font-mono font-bold text-gray-800">{record.residentId}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500 font-medium">Purok Cluster:</dt>
                      <dd className="font-bold text-[#1c552c]">{record.purok}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500 font-medium">Status:</dt>
                      <dd className="font-bold text-emerald-700">{record.status}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500 font-medium">Last Health Visit:</dt>
                      <dd className="font-bold text-gray-700">{record.lastVisitDate}</dd>
                    </div>
                  </dl>
                </div>

                {/* Emergency Contact */}
                <div className="bg-gray-50/70 p-4 sm:p-5 rounded-2xl border border-gray-200">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Emergency Contact Person
                  </h4>
                  <dl className="space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-gray-500 font-medium">Full Name:</dt>
                      <dd className="font-bold text-gray-800">{record.emergencyContact.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500 font-medium">Relationship:</dt>
                      <dd className="font-bold text-gray-800">{record.emergencyContact.relationship}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500 font-medium">Phone Number:</dt>
                      <dd className="font-bold text-[#1c552c]">{record.emergencyContact.phone}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Medical Alerts: Allergies & Chronic Conditions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Allergies */}
                <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/60 border border-rose-200">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                      Known Allergies & Sensitivities
                    </h4>
                  </div>
                  {record.allergies.length === 0 ? (
                    <p className="text-xs text-rose-700 font-medium">No known drug or food allergies reported.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {record.allergies.map((allergy, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-white text-rose-700 border border-rose-300 font-bold text-xs rounded-xl shadow-2xs"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Chronic Conditions */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <div className="flex items-center gap-2 mb-3">
                    <HeartPulse className="w-4 h-4 text-amber-700" />
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                      Chronic Medical Conditions
                    </h4>
                  </div>
                  {record.chronicConditions.length === 0 ? (
                    <p className="text-xs text-amber-800 font-medium">No chronic diagnoses documented.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {record.chronicConditions.map((cond, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-white text-amber-800 border border-amber-300 font-bold text-xs rounded-xl shadow-2xs"
                        >
                          {cond}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Vitals & Triage */}
          {activeTab === "vitals" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#133d23]">Current Clinical Vitals</h4>
                  <p className="text-xs text-gray-400">Measured on {record.vitals.lastUpdated}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-[#1b552b] border border-green-200 rounded-full">
                  Recent Triage Verified
                </span>
              </div>

              {/* Vitals Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-rose-50/60 border border-rose-100 p-3.5 rounded-2xl text-center">
                  <p className="text-[11px] font-bold text-rose-600">Blood Pressure</p>
                  <p className="text-lg font-black text-rose-950 mt-1">{record.vitals.bp}</p>
                  <p className="text-[10px] text-rose-700 font-medium">mmHg</p>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-100 p-3.5 rounded-2xl text-center">
                  <p className="text-[11px] font-bold text-emerald-600">Heart Rate</p>
                  <p className="text-lg font-black text-emerald-950 mt-1">{record.vitals.heartRate}</p>
                  <p className="text-[10px] text-emerald-700 font-medium">bpm</p>
                </div>

                <div className="bg-amber-50/60 border border-amber-100 p-3.5 rounded-2xl text-center">
                  <p className="text-[11px] font-bold text-amber-600">Body Temp</p>
                  <p className="text-lg font-black text-amber-950 mt-1">{record.vitals.temp}</p>
                  <p className="text-[10px] text-amber-700 font-medium">°C</p>
                </div>

                <div className="bg-blue-50/60 border border-blue-100 p-3.5 rounded-2xl text-center">
                  <p className="text-[11px] font-bold text-blue-600">Weight</p>
                  <p className="text-lg font-black text-blue-950 mt-1">{record.vitals.weight}</p>
                  <p className="text-[10px] text-blue-700 font-medium">kg</p>
                </div>

                <div className="bg-indigo-50/60 border border-indigo-100 p-3.5 rounded-2xl text-center">
                  <p className="text-[11px] font-bold text-indigo-600">Height</p>
                  <p className="text-lg font-black text-indigo-950 mt-1">{record.vitals.height}</p>
                  <p className="text-[10px] text-indigo-700 font-medium">cm</p>
                </div>

                <div className="bg-purple-50/60 border border-purple-100 p-3.5 rounded-2xl text-center">
                  <p className="text-[11px] font-bold text-purple-600">BMI Index</p>
                  <p className="text-lg font-black text-purple-950 mt-1">{record.vitals.bmi}</p>
                  <p className="text-[10px] text-purple-700 font-medium">Normal / Monitored</p>
                </div>
              </div>

              {/* Blood sugar note if present */}
              {record.vitals.bloodSugar && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900">Random Blood Sugar (RBS):</span>
                  <span className="font-black text-amber-950 text-sm">{record.vitals.bloodSugar}</span>
                </div>
              )}

              {/* Triage Reference Note */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-600">
                <p className="font-bold text-gray-800 mb-1">Standard Triage Evaluation Notice:</p>
                <p>
                  Vitals recorded by assigned Barangay Health Worker ({record.assignedBhw}). If systolic BP exceeds 140 mmHg or diastolic exceeds 90 mmHg, mandatory referral to Barangay Physician Dr. Roberto Mendoza is triggered.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Prescriptions */}
          {activeTab === "prescriptions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#133d23]">Active Prescriptions & Maintenance Meds</h4>
                  <p className="text-xs text-gray-400">Prescribed medications and dispensary logs</p>
                </div>
                {onAddPrescription && (
                  <button
                    type="button"
                    onClick={() => setShowAddRx((prev) => !prev)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#246b38] text-white text-xs font-bold shadow-sm hover:bg-[#1b552b] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showAddRx ? "Cancel" : "Add Medication"}</span>
                  </button>
                )}
              </div>

              {/* Quick Add Prescription Form */}
              {showAddRx && (
                <form onSubmit={handleCreateRx} className="p-4 bg-green-50/50 rounded-2xl border border-green-200 space-y-3 animate-in fade-in">
                  <p className="text-xs font-bold text-[#133d23]">Prescribe New Medicine for Resident</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <input
                      type="text"
                      placeholder="Medicine Name (e.g. Amlodipine)"
                      value={rxName}
                      onChange={(e) => setRxName(e.target.value)}
                      required
                      className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38]"
                    />
                    <input
                      type="text"
                      placeholder="Dosage (e.g. 5mg or 500mg)"
                      value={rxDosage}
                      onChange={(e) => setRxDosage(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38]"
                    />
                    <input
                      type="text"
                      placeholder="Frequency (e.g. Once daily OD)"
                      value={rxFreq}
                      onChange={(e) => setRxFreq(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#246b38] hover:bg-[#1b552b] text-white font-bold text-xs rounded-xl shadow-2xs"
                    >
                      Save to Passport
                    </button>
                  </div>
                </form>
              )}

              {/* Prescriptions List */}
              {record.prescriptions.length === 0 ? (
                <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
                  No maintenance medications recorded for this resident.
                </div>
              ) : (
                <div className="space-y-3">
                  {record.prescriptions.map((rx) => (
                    <div
                      key={rx.id}
                      className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-green-200 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00695c] flex items-center justify-center flex-shrink-0">
                          <Pill className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-gray-900">{rx.medicineName}</h5>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {rx.dosage} • {rx.frequency} • Duration: {rx.duration}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-1">Prescribed by {rx.prescribedBy}</p>
                        </div>
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold self-start sm:self-center ${
                          rx.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {rx.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Immunization */}
          {activeTab === "immunization" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#133d23]">Vaccination & Immunization Passport</h4>
                  <p className="text-xs text-gray-400">Official barangay & DOH immunization records</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-lime-50 text-[#33691e] border border-lime-200 rounded-full">
                  DOH Verified
                </span>
              </div>

              {record.vaccinations.length === 0 ? (
                <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
                  No immunization records found.
                </div>
              ) : (
                <div className="space-y-3">
                  {record.vaccinations.map((vac) => (
                    <div
                      key={vac.id}
                      className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-green-200 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-lime-50 text-[#33691e] flex items-center justify-center flex-shrink-0">
                          <Syringe className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sm text-gray-900">{vac.vaccineName}</h5>
                            <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-lime-100 text-lime-800">
                              {vac.dose}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Administered by {vac.healthcareProvider}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-700 self-start sm:self-center">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{vac.dateAdministered}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-1" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Clinical Notes */}
          {activeTab === "notes" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-[#133d23]">Clinical Notes & Doctor Observations</h4>
                <p className="text-xs text-gray-400">Confidential clinical diary and progress observations</p>
              </div>

              {/* Add Note Form */}
              {onAddNote && (
                <form onSubmit={handleCreateNote} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700">Add Clinical Note / Observation</span>
                    <span className="text-[11px] text-gray-400">{newNoteAuthor}</span>
                  </div>
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Enter clinical assessment, physical exam findings, or instructions..."
                    className="w-full p-3 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38]"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#246b38] hover:bg-[#1b552b] text-white font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
                    >
                      Save Clinical Note
                    </button>
                  </div>
                </form>
              )}

              {/* Notes Timeline */}
              {record.clinicalNotes.length === 0 ? (
                <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
                  No clinical notes recorded yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {record.clinicalNotes.map((n) => (
                    <div
                      key={n.id}
                      className="p-4 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50/50 transition-colors space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{n.author}</span>
                          <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-green-50 text-[#1b552b] font-bold">
                            {n.role}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {n.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{n.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
          <span className="text-gray-400">
            Confidential Health Record • Barangay San Isidro Health Center
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold transition-colors cursor-pointer"
          >
            Close Passport
          </button>
        </div>
      </div>
    </div>
  );
}
