import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Privacy Policy | TickyTICKEY",
  description: "Privacy Policy and Data Protection Notice for TickyTICKEY Barangay Health System.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {/* Header Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-500 mb-8 font-medium">
            Last updated: September 18, 2026
          </p>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            
            {/* 1. Introduction */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                1. Introduction
              </h2>
              <p>
                At TickyTICKEY, we take your privacy and the security of community health data seriously. This Privacy Policy explains how TickyTICKEY (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects, uses, discloses, and safeguards your information when you use our barangay health web application and associated mobile services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access or use the application.
              </p>
              <p className="mt-2">
                TickyTICKEY operates in accordance with <strong>Republic Act No. 10173 (Philippine Data Privacy Act of 2012)</strong>, its Implementing Rules and Regulations, National Privacy Commission (NPC) issuances, and applicable Department of Health (DOH) guidelines.
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                2. Information We Collect
              </h2>
              <p className="mb-3">
                We collect personal information and sensitive personal health information necessary to provide barangay triage assistance, clinic scheduling, and digital health records management.
              </p>

              <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">
                2.1 Information You Provide
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 mb-3">
                <li>
                  <strong>Account &amp; Resident Identity:</strong> Full legal name, date of birth, age, sex/gender, Purok cluster, home address, and contact mobile phone number.
                </li>
                <li>
                  <strong>Emergency Contacts:</strong> Name, relationship, and contact phone number of your designated family member or guardian.
                </li>
                <li>
                  <strong>Clinical Vitals &amp; Health Data:</strong> Blood pressure readings, heart rate, body temperature, weight, height, body mass index (BMI), blood sugar levels, and chief health symptoms submitted for triage.
                </li>
                <li>
                  <strong>Medical History &amp; Records:</strong> Documented chronic medical conditions (e.g., hypertension, diabetes, asthma), known drug and food allergies, active prescription maintenance regimens, and DOH immunization passport entries.
                </li>
                <li>
                  <strong>Government Identifiers:</strong> PhilHealth Identification Number (PIN) and Barangay Resident ID for health program verification, and Professional Regulation Commission (PRC) license numbers for medical personnel.
                </li>
                <li>
                  <strong>Consultation Communications:</strong> Messages, triage inquiries, and uploaded medical documentation shared with assigned Barangay Health Workers (BHWs) and clinic physicians.
                </li>
              </ul>

              <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">
                2.2 Automatically Collected Information
              </h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Device Information:</strong> Device model, operating system version, browser type, and preferred application language.
                </li>
                <li>
                  <strong>Log &amp; Security Data:</strong> IP address, login timestamps, and anonymized system error logs used for cybersecurity audits and service reliability.
                </li>
                <li>
                  <strong>Approximate Location:</strong> Purok and barangay station routing data used strictly to map health inquiries to local health workers.
                </li>
              </ul>
            </div>

            {/* 3. How We Use Your Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                3. How We Use Your Information
              </h2>
              <p className="mb-2">
                We process your personal and sensitive health information exclusively for legitimate barangay public health objectives:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Triage &amp; Clinical Communication:</strong> Facilitating secure, encrypted communication between residents and authorized Barangay Health Workers or clinic doctors.
                </li>
                <li>
                  <strong>Clinic Appointment Coordination:</strong> Reserving and managing in-person clinic visits for maternal care, immunization drives, senior wellness, and general consultations.
                </li>
                <li>
                  <strong>Electronic Health Passports (EHR):</strong> Maintaining longitudinal vital history, prescription continuity, and vaccination tracking for residents.
                </li>
                <li>
                  <strong>Public Health Notifications:</strong> Transmitting appointment reminders, verification SMS, and official barangay health alerts (e.g., dengue, flu, vaccination advisories).
                </li>
                <li>
                  <strong>Epidemiological Reporting:</strong> Producing aggregate, fully de-identified census reports for the Municipal Health Office (MHO) and Department of Health (DOH).
                </li>
              </ul>
            </div>

            {/* 4. Legal Basis for Processing */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                4. Legal Basis for Processing (RA 10173)
              </h2>
              <p className="mb-2">
                Under Section 12 and Section 13 of the Philippine Data Privacy Act of 2012, processing of Sensitive Personal Information is conducted under the following lawful criteria:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Consent:</strong> Explicit, informed consent provided during resident registration and health passport initialization.
                </li>
                <li>
                  <strong>Medical Treatment:</strong> Processing carried out by healthcare providers and supervised health workers for medical consultation and patient care (Section 13(e)).
                </li>
                <li>
                  <strong>Vital Interests:</strong> Protecting the life and physical health of the resident or community in public health scenarios (Section 13(c)).
                </li>
              </ul>
            </div>

            {/* 5. Data Security */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                5. Data Security &amp; Storage
              </h2>
              <p>
                We enforce comprehensive technical and organizational safeguards. All communications are encrypted in transit via Transport Layer Security (TLS 1.3 / HTTPS). Health records stored in our databases are protected by industry-standard AES-256 encryption at rest. Access to resident records is strictly governed by role-based permissions, ensuring that only verified health workers assigned to your Purok cluster can view clinical details.
              </p>
            </div>

            {/* 6. Third-Party Disclosures */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                6. Third-Party Disclosures &amp; No Sale of Health Data
              </h2>
              <p>
                <strong>Zero Commercial Sale or Advertising:</strong> We do <strong>NOT</strong> sell, rent, monetize, or disclose your personal health information to third-party commercial advertisers, pharmaceutical sales representatives, or data brokers.
              </p>
              <p className="mt-2">
                Information is shared strictly with public health authorities (Municipal Health Office and DOH) in anonymized format as required by Philippine public health reporting laws, and with our telecommunications gateway partners (e.g., Semaphore Philippines) solely to deliver appointment notifications and verification codes.
              </p>
            </div>

            {/* 7. Mandatory Medical Emergency Disclaimer */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                7. Medical Emergency Disclaimer (Apple &amp; Google Compliance)
              </h2>
              <p>
                TickyTICKEY is designed for non-emergency community health coordination and appointment management. <strong>It does not provide immediate emergency medical rescue services.</strong> In the event of an acute medical emergency, chest pain, difficulty breathing, profuse bleeding, or severe trauma, immediately contact national emergency services at <strong>911</strong> or go to the nearest hospital emergency room.
              </p>
              <p className="mt-2">
                Always seek the advice of a qualified physician or healthcare provider before making any medical decisions or modifying existing treatment regimens.
              </p>
            </div>

            {/* 8. Data Subject Rights */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                8. Your Data Subject Rights
              </h2>
              <p className="mb-2">
                In accordance with Republic Act No. 10173, you retain the following rights:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Right to Access:</strong> Inspect your complete Electronic Health Record (EHR) dossier, vitals history, and past consultation logs.
                </li>
                <li>
                  <strong>Right to Rectification:</strong> Request correction of inaccurate, outdated, or misleading demographic and contact information.
                </li>
                <li>
                  <strong>Right to Erasure / Blocking:</strong> Request deletion or suspension of your account and personal information in accordance with DOH medical retention guidelines.
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Obtain an electronic export of your personal health passport data.
                </li>
              </ul>
            </div>

            {/* 9. Account & Data Deletion */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                9. Account &amp; Data Deletion (Google Play &amp; Apple Guideline 5.1.1)
              </h2>
              <p>
                In compliance with Apple App Store Review Guideline 5.1.1 and Google Play Store Data Safety policies, users may request the complete deletion of their account and associated health records at any time.
              </p>
              <p className="mt-2">
                To delete your account and associated data:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-1">
                <li>
                  <strong>In the Mobile App:</strong> Open <em>Settings → Account &amp; Security → Delete Account</em>.
                </li>
                <li>
                  <strong>Via Email:</strong> Send an email to our Data Protection Officer at <a href="mailto:tickeytikey01@gmail.com" className="text-[#246b38] underline font-medium">tickeytikey01@gmail.com</a> with the subject &ldquo;Account Deletion Request&rdquo; from your registered contact email or mobile number.
                </li>
              </ul>
              <p className="mt-2 text-xs text-gray-500">
                Upon identity verification, your personal profile and account credentials will be permanently erased within 30 days, subject only to mandatory legal retention of clinical audit logs as prescribed by Philippine healthcare statutes.
              </p>
            </div>

            {/* 10. Contact Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                10. Contact Information &amp; Data Protection Officer
              </h2>
              <p>
                If you have questions, concerns, or wish to exercise any of your data privacy rights, please reach our Data Protection Office:
              </p>
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p><strong>TickyTICKEY Data Protection Office</strong></p>
                <p>Email: <a href="mailto:tickeytikey01@gmail.com" className="text-[#246b38] underline font-medium">tickeytikey01@gmail.com</a></p>
                <p>National Health Hotline: 1555 / National Emergency: 911</p>
                <p>National Privacy Commission (NPC) Portal: <a href="https://privacy.gov.ph" target="_blank" rel="noreferrer" className="text-[#246b38] underline">https://privacy.gov.ph</a></p>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
