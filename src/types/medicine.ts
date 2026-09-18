export interface MedicineItem {
  id: string;
  name: string;
  genericName: string;
  category: "Fever & Pain" | "Cough & Cold" | "Allergy" | "Hydration" | "Hypertension" | "Antibiotic" | "Supplements";
  use: string;
  dosage: string;
  adultDosage: string;
  pediatricDosage: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  stockQuantity: number;
  updatedBy: string;
  updatedDate: string;
  caution: string;
  symptomTags: string[];
  imageType: "tablet" | "capsule" | "syrup" | "sachet";
  isActive?: boolean;
}

export interface MedicineStats {
  totalMedicines: number;
  totalChange: string;
  lowStock: number;
  symptomTagsCount: number;
  lastUpdated: string;
  lastUpdatedDate: string;
}
