"use client";

import { MedicineItem } from "@/types/medicine";
import { Check, Pill, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AddEditProps {
  isOpen: boolean;
  onClose: () => void;
  medicineToEdit: MedicineItem | null;
  onSave: (m: MedicineItem) => void;
}

export default function AddEditMedicineModal({
  isOpen,
  onClose,
  medicineToEdit,
  onSave,
}: AddEditProps) {
  const [name, setName] = useState("");
  const [genericName, setGenericName] = useState("");
  const [category, setCategory] = useState<MedicineItem["category"]>("Fever & Pain");
  const [dosage, setDosage] = useState("500 mg");
  const [adultDosage, setAdultDosage] = useState("500 mg every 4-6 hours");
  const [pediatricDosage, setPediatricDosage] = useState("10-15 mg/kg every 4-6 hours");
  const [stockQuantity, setStockQuantity] = useState(100);
  const [use, setUse] = useState("");
  const [caution, setCaution] = useState("Do not exceed recommended dose. Consult a health professional if symptoms persist.");
  const [symptomTags, setSymptomTags] = useState("Fever, Headache, Body Pain");
  const [imageType, setImageType] = useState<MedicineItem["imageType"]>("tablet");

  useEffect(() => {
    if (medicineToEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset the controlled form when the selected record changes
      setName(medicineToEdit.name);
      setGenericName(medicineToEdit.genericName);
      setCategory(medicineToEdit.category);
      setDosage(medicineToEdit.dosage);
      setAdultDosage(medicineToEdit.adultDosage);
      setPediatricDosage(medicineToEdit.pediatricDosage);
      setStockQuantity(medicineToEdit.stockQuantity);
      setUse(medicineToEdit.use);
      setCaution(medicineToEdit.caution);
      setSymptomTags(medicineToEdit.symptomTags.join(", "));
      setImageType(medicineToEdit.imageType);
    } else {
      setName("");
      setGenericName("");
      setCategory("Fever & Pain");
      setDosage("500 mg");
      setAdultDosage("500 mg every 4-6 hours");
      setPediatricDosage("10-15 mg/kg every 4-6 hours");
      setStockQuantity(100);
      setUse("");
      setCaution("Do not exceed recommended dose. Consult a health professional if symptoms persist.");
      setSymptomTags("Fever, Headache, Body Pain");
      setImageType("tablet");
    }
  }, [medicineToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const tags = symptomTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const stockStatus: MedicineItem["stockStatus"] =
      stockQuantity > 30 ? "In Stock" : stockQuantity > 0 ? "Low Stock" : "Out of Stock";

    const savedItem: MedicineItem = {
      id: medicineToEdit ? medicineToEdit.id : `med-${Date.now()}`,
      name: name.trim(),
      genericName: genericName.trim() || name.trim(),
      category,
      dosage: dosage.trim(),
      adultDosage: adultDosage.trim(),
      pediatricDosage: pediatricDosage.trim(),
      stockStatus,
      stockQuantity: Number(stockQuantity),
      use: use.trim() || "Treats common symptoms",
      caution: caution.trim(),
      symptomTags: tags.length > 0 ? tags : ["General"],
      updatedBy: "Admin",
      updatedDate: new Date().toLocaleDateString("en-PH"),
      imageType,
    };

    onSave(savedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#133d23] to-[#246b38] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Pill className="w-5 h-5" />
            <div>
              <h2 className="text-lg font-black">
                {medicineToEdit ? "Edit Medicine" : "Add New Medicine"}
              </h2>
              <p className="text-xs text-green-100">
                Update stock, dosage instructions, and symptom indications.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Brand Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Paracetamol"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Generic Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Acetaminophen"
                value={genericName}
                onChange={(e) => setGenericName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MedicineItem["category"])}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] outline-none bg-white"
              >
                <option value="Fever & Pain">Fever &amp; Pain</option>
                <option value="Cough & Cold">Cough &amp; Cold</option>
                <option value="Allergy">Allergy</option>
                <option value="Hydration">Hydration</option>
                <option value="Hypertension">Hypertension</option>
                <option value="Antibiotic">Antibiotic</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Package Type</label>
              <select
                value={imageType}
                onChange={(e) => setImageType(e.target.value as MedicineItem["imageType"])}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] outline-none bg-white"
              >
                <option value="tablet">Tablet / Pill</option>
                <option value="capsule">Capsule</option>
                <option value="syrup">Syrup Bottle</option>
                <option value="sachet">Powder Sachet</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Standard Dosage</label>
              <input
                type="text"
                required
                placeholder="e.g. 500 mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Initial Stock (pcs)</label>
              <input
                type="number"
                required
                min={0}
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">Primary Use / Indications</label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Reduces fever and relieves mild to moderate pain"
              value={use}
              onChange={(e) => setUse(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Adult Dosage Instructions</label>
              <input
                type="text"
                value={adultDosage}
                onChange={(e) => setAdultDosage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Pediatric Dosage Instructions</label>
              <input
                type="text"
                value={pediatricDosage}
                onChange={(e) => setPediatricDosage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">Caution & Warnings</label>
            <input
              type="text"
              value={caution}
              onChange={(e) => setCaution(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">Common Symptom Tags (Comma separated)</label>
            <input
              type="text"
              placeholder="Fever, Headache, Body Pain"
              value={symptomTags}
              onChange={(e) => setSymptomTags(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3fa04e] outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#246b38] hover:bg-[#1a552b] text-white font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{medicineToEdit ? "Save Changes" : "Create Medicine"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
