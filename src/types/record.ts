export interface ClinicalVitals {
  bp: string;
  heartRate: string;
  temp: string;
  weight: string;
  height: string;
  bmi: string;
  bloodSugar?: string;
  lastUpdated: string;
}

export interface PrescriptionRecord {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  status: "Active" | "Completed" | "Discontinued";
}

export interface VaccinationRecord {
  id: string;
  vaccineName: string;
  dose: string;
  dateAdministered: string;
  healthcareProvider: string;
}

export interface ClinicalNote {
  id: string;
  date: string;
  author: string;
  role: string;
  note: string;
}

export interface HealthRecordItem {
  id: string;
  residentName: string;
  initials: string;
  age: number;
  gender: "Male" | "Female";
  bloodType: string;
  purok: string;
  philHealthId?: string;
  residentId: string;
  contactPhone: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  chronicConditions: string[];
  allergies: string[];
  vitals: ClinicalVitals;
  primaryCategory: "Hypertension" | "Diabetes" | "Maternal/Prenatal" | "Senior Care" | "Pediatric" | "General";
  assignedBhw: string;
  status: "Active" | "Archived" | "Pending";
  lastVisitDate: string;
  prescriptions: PrescriptionRecord[];
  vaccinations: VaccinationRecord[];
  clinicalNotes: ClinicalNote[];
}

export interface HealthRecordMetrics {
  totalRecords: number;
  philHealthEnrolled: number;
  activeMaintenancePlans: number;
  immunizationPassports: number;
}
