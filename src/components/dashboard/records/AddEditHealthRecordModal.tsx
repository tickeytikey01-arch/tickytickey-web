"use client";

import { HealthRecordItem } from "@/types/record";
import { HeartPulse, Save, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AddEditHealthRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordToEdit: HealthRecordItem | null;
  onSave: (record: HealthRecordItem) => void;
}

export default function AddEditHealthRecordModal({
  isOpen,
  onClose,
  recordToEdit,
  onSave,
}: AddEditHealthRecordModalProps) {
  const [residentName, setResidentName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<"Male" | "Female">("Female");
  const [bloodType, setBloodType] = useState("O+");
  const [purok, setPurok] = useState("Purok 1");
  const [philHealthId, setPhilHealthId] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [primaryCategory, setPrimaryCategory] = useState<HealthRecordItem["primaryCategory"]>("General");
  const [assignedBhw, setAssignedBhw] = useState("Ana Reyes");

  // Emergency contact
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyRel, setEmergencyRel] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Chronic conditions & allergies (comma separated inputs)
  const [chronicConditionsInput, setChronicConditionsInput] = useState("");
  const [allergiesInput, setAllergiesInput] = useState("");

  // Vitals
  const [bp, setBp] = useState("120/80");
  const [heartRate, setHeartRate] = useState("75");
  const [temp, setTemp] = useState("36.5");
  const [weight, setWeight] = useState("60");
  const [height, setHeight] = useState("165");
  const [bloodSugar, setBloodSugar] = useState("");

  useEffect(() => {
    if (recordToEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset the controlled form when the selected record changes
      setResidentName(recordToEdit.residentName);
      setAge(recordToEdit.age);
      setGender(recordToEdit.gender);
      setBloodType(recordToEdit.bloodType);
      setPurok(recordToEdit.purok);
      setPhilHealthId(recordToEdit.philHealthId || "");
      setContactPhone(recordToEdit.contactPhone);
      setPrimaryCategory(recordToEdit.primaryCategory);
      setAssignedBhw(recordToEdit.assignedBhw);
      setEmergencyName(recordToEdit.emergencyContact.name);
      setEmergencyRel(recordToEdit.emergencyContact.relationship);
      setEmergencyPhone(recordToEdit.emergencyContact.phone);
      setChronicConditionsInput(recordToEdit.chronicConditions.join(", "));
      setAllergiesInput(recordToEdit.allergies.join(", "));
      setBp(recordToEdit.vitals.bp);
      setHeartRate(recordToEdit.vitals.heartRate);
      setTemp(recordToEdit.vitals.temp);
      setWeight(recordToEdit.vitals.weight);
      setHeight(recordToEdit.vitals.height);
      setBloodSugar(recordToEdit.vitals.bloodSugar || "");
    } else {
      setResidentName("");
      setAge("");
      setGender("Female");
      setBloodType("O+");
      setPurok("Purok 1");
      setPhilHealthId("");
      setContactPhone("");
      setPrimaryCategory("General");
      setAssignedBhw("Ana Reyes");
      setEmergencyName("");
      setEmergencyRel("");
      setEmergencyPhone("");
      setChronicConditionsInput("");
      setAllergiesInput("");
      setBp("120/80");
      setHeartRate("75");
      setTemp("36.5");
      setWeight("60");
      setHeight("165");
      setBloodSugar("");
    }
  }, [recordToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!residentName.trim()) return;

    const initials = residentName
      .trim()
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    // Calculate BMI
    const wNum = parseFloat(weight) || 60;
    const hNum = (parseFloat(height) || 165) / 100;
    const calculatedBmi = (wNum / (hNum * hNum)).toFixed(1);

    const chronic = chronicConditionsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const allergies = allergiesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const savedRecord: HealthRecordItem = {
      id: recordToEdit ? recordToEdit.id : `ehr-${Date.now()}`,
      residentName: residentName.trim(),
      initials: initials || "RN",
      age: Number(age) || 35,
      gender,
      bloodType,
      purok,
      philHealthId: philHealthId.trim() || undefined,
      residentId: recordToEdit ? recordToEdit.residentId : `EHR-${Math.floor(1000 + Math.random() * 9000)}`,
      contactPhone: contactPhone.trim() || "0917 000 0000",
      emergencyContact: {
        name: emergencyName.trim() || "Family Member",
        relationship: emergencyRel.trim() || "Spouse",
        phone: emergencyPhone.trim() || contactPhone || "0917 000 0000",
      },
      chronicConditions: chronic,
      allergies,
      vitals: {
        bp,
        heartRate,
        temp,
        weight,
        height,
        bmi: calculatedBmi,
        bloodSugar: bloodSugar.trim() || undefined,
        lastUpdated: "Today",
      },
      primaryCategory,
      assignedBhw,
      status: recordToEdit ? recordToEdit.status : "Active",
      lastVisitDate: "Today",
      prescriptions: recordToEdit ? recordToEdit.prescriptions : [],
      vaccinations: recordToEdit ? recordToEdit.vaccinations : [],
      clinicalNotes: recordToEdit
        ? recordToEdit.clinicalNotes
        : [
            {
              id: `n-${Date.now()}`,
              date: "Today",
              author: "Dr. Roberto Mendoza, MD",
              role: "Doctor",
              note: "Resident Electronic Health Record (EHR) passport initialized at barangay station.",
            },
          ],
    };

    onSave(savedRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#edf7ee] border-b border-green-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#246b38] text-white flex items-center justify-center shadow-md">
              {recordToEdit ? <Save className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-black text-[#133d23]">
                {recordToEdit ? "Edit Resident Health Passport" : "Create New Resident EHR Passport"}
              </h2>
              <p className="text-xs text-gray-500">
                Barangay San Isidro Official Electronic Health Dossier
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs">
          {/* Section 1: Demographics */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-400 uppercase tracking-wider text-[11px]">
              1. Resident Identification & Demographics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">Full Resident Name *</label>
                <input
                  type="text"
                  required
                  value={residentName}
                  onChange={(e) => setResidentName(e.target.value)}
                  placeholder="e.g. Maria Elena Santos"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Age *</label>
                <input
                  type="number"
                  required
                  min="0"
                  max="125"
                  value={age}
                  onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 42"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as "Male" | "Female")}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-bold"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Blood Type</label>
                <select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-bold"
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Purok Cluster</label>
                <select
                  value={purok}
                  onChange={(e) => setPurok(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-bold"
                >
                  <option value="Purok 1">Purok 1</option>
                  <option value="Purok 2">Purok 2</option>
                  <option value="Purok 3">Purok 3</option>
                  <option value="Purok 4">Purok 4</option>
                  <option value="Purok 5">Purok 5</option>
                  <option value="Purok 6">Purok 6</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. 0917 123 4567"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">PhilHealth ID (Optional)</label>
                <input
                  type="text"
                  value={philHealthId}
                  onChange={(e) => setPhilHealthId(e.target.value)}
                  placeholder="e.g. 12-054928192-3"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Assigned BHW</label>
                <select
                  value={assignedBhw}
                  onChange={(e) => setAssignedBhw(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-bold"
                >
                  <option value="Ana Reyes">Ana Reyes (Purok 1)</option>
                  <option value="Lito Cruz">Lito Cruz (Purok 2)</option>
                  <option value="May Castro">May Castro (Purok 3)</option>
                  <option value="Grace Lim">Grace Lim (Purok 4)</option>
                  <option value="Teresa Santos">Teresa Santos (Purok 5)</option>
                  <option value="Elena Ramos">Elena Ramos (Purok 6)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Categorization */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-400 uppercase tracking-wider text-[11px]">
              2. Clinical Program & Medical History
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Primary Program</label>
                <select
                  value={primaryCategory}
                  onChange={(e) => setPrimaryCategory(e.target.value as HealthRecordItem["primaryCategory"])}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-bold"
                >
                  <option value="Hypertension">Hypertension</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Maternal/Prenatal">Maternal/Prenatal</option>
                  <option value="Senior Care">Senior Care</option>
                  <option value="Pediatric">Pediatric</option>
                  <option value="General">General Care</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Chronic Conditions (comma separated)</label>
                <input
                  type="text"
                  value={chronicConditionsInput}
                  onChange={(e) => setChronicConditionsInput(e.target.value)}
                  placeholder="e.g. Stage 2 HTN, Type 2 DM"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Allergies (comma separated)</label>
                <input
                  type="text"
                  value={allergiesInput}
                  onChange={(e) => setAllergiesInput(e.target.value)}
                  placeholder="e.g. Penicillin, Shellfish"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Baseline Vitals */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
              <span>3. Initial Clinical Vitals</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Blood Pressure</label>
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  placeholder="120/80"
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Heart Rate (bpm)</label>
                <input
                  type="text"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                  placeholder="75"
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Temp (°C)</label>
                <input
                  type="text"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  placeholder="36.5"
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="60"
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="165"
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Blood Sugar</label>
                <input
                  type="text"
                  value={bloodSugar}
                  onChange={(e) => setBloodSugar(e.target.value)}
                  placeholder="95 mg/dL"
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Emergency Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-400 uppercase tracking-wider text-[11px]">
              4. Emergency Contact Person
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Contact Name</label>
                <input
                  type="text"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  placeholder="e.g. Juan Santos"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Relationship</label>
                <input
                  type="text"
                  value={emergencyRel}
                  onChange={(e) => setEmergencyRel(e.target.value)}
                  placeholder="e.g. Spouse / Sibling / Child"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Emergency Phone</label>
                <input
                  type="text"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="e.g. 0918 999 1122"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#246b38] text-gray-800 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#246b38] hover:bg-[#1b552b] text-white font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {recordToEdit ? "Update Health Record" : "Save Health Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
