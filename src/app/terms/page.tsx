import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | TickyTICKEY",
  description: "Terms of Service, End User License Agreement (EULA), and Medical Disclaimers for TickyTICKEY Barangay Health System.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {/* Header Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Terms of Service
          </h1>
          <p className="text-xs text-gray-500 mb-8 font-medium">
            Last updated: September 18, 2026
          </p>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            
            {/* 1. Introduction & Acceptance */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                1. Acceptance of Terms
              </h2>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the TickyTICKEY web portal and associated mobile applications (collectively, the &ldquo;Service&rdquo;), developed in partnership with local barangay governments, municipal health offices, and licensed healthcare practitioners in the Republic of the Philippines.
              </p>
              <p className="mt-2">
                By accessing or using our Service, you agree to be bound by these Terms, our{" "}
                <Link href="/privacy" className="text-[#246b38] underline font-medium hover:text-[#194c27]">
                  Privacy Policy
                </Link>, and our{" "}
                <Link href="/cookies" className="text-[#246b38] underline font-medium hover:text-[#194c27]">
                  Cookie Policy
                </Link>. If you do not agree to these Terms, please do not use the Service.
              </p>
            </div>

            {/* 2. Mandatory Medical Emergency Disclaimer */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                2. Mandatory Medical Emergency Disclaimer
              </h2>
              <p className="font-semibold text-gray-900 mb-2">
                PLEASE READ THIS SECTION CAREFULLY BEFORE USING THE SERVICE.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Not an Emergency Rescue Service:</strong> TickyTICKEY is an administrative, appointment scheduling, and community triage tool. It does <strong>NOT</strong> provide emergency medical rescue or acute hospital care. If you or someone you know is experiencing a life-threatening medical emergency (such as severe chest pain, shortness of breath, acute stroke symptoms, or severe trauma), dial <strong>911</strong> or go to the nearest hospital emergency room immediately.
                </li>
                <li>
                  <strong>Not a Substitute for In-Person Medical Examination:</strong> Information and triage guidance provided through the Service do not constitute formal in-person clinical diagnosis. Always seek the advice of a qualified physician or licensed medical professional with any questions regarding a medical condition.
                </li>
                <li>
                  <strong>Supervised Healthcare Personnel:</strong> Triage messages are handled by trained Barangay Health Workers (BHWs) operating under the supervision of licensed municipal physicians. TickyTICKEY does not perform unverified automated AI diagnoses.
                </li>
              </ul>
            </div>

            {/* 3. Scope of Service */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                3. Scope of Barangay Health Services
              </h2>
              <p className="mb-2">
                TickyTICKEY provides digital coordination tools for community healthcare, including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Non-emergency health inquiries and community triage communication.</li>
                <li>Online booking for barangay clinic consultations, vaccinations, prenatal checkups, and senior wellness visits.</li>
                <li>Electronic Health Passports (EHR) displaying resident vital sign trends, PhilHealth enrolment status, and chronic condition maintenance plans.</li>
                <li>Dissemination of official public health advisories, vaccination drives, and dengue/epidemic notices.</li>
              </ul>
            </div>

            {/* 4. User Accounts & Responsibilities */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                4. User Accounts &amp; Responsibilities
              </h2>
              <p className="mb-2">
                When registering for an account, you agree to provide truthful, accurate, and current information. You are responsible for maintaining the confidentiality of your credentials and One-Time Passwords (OTPs).
              </p>
              <p>
                Authorized healthcare personnel (BHWs, nurses, doctors) are strictly required to hold valid local government or Professional Regulation Commission (PRC) credentials. Sharing staff login accounts is strictly prohibited.
              </p>
            </div>

            {/* 5. Telehealth Guidelines */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                5. Telehealth &amp; Virtual Consultation Protocols
              </h2>
              <p className="mb-2">
                All virtual triage interactions through TickyTICKEY conform to Joint DOH-DILG-PhilHealth Telemedicine Guidelines (Administrative Orders No. 2020-0041 and 2021-0040):
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Virtual triage requires voluntary informed consent by the resident or their legal guardian.</li>
                <li>Triage guidance is contingent upon the accuracy of symptoms reported by the patient. Incomplete descriptions may impair clinical judgment.</li>
                <li>If virtual assessment is deemed inadequate, the patient must be referred for an in-person physical evaluation at the Barangay Health Station or Municipal Health Center.</li>
              </ul>
            </div>

            {/* 6. Electronic Prescriptions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                6. Electronic Prescriptions &amp; Medicine Library
              </h2>
              <p>
                Medical prescriptions logged in the system must be issued by a licensed doctor holding a valid PRC and S2 license. Dispensary stock listings indicate availability at the local health station; medicines are dispensed in person strictly upon presentation of a valid prescription in accordance with Philippine Food and Drug Administration (FDA) regulations.
              </p>
            </div>

            {/* 7. Prohibited Uses */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                7. Prohibited Uses
              </h2>
              <p className="mb-2">You agree not to use the Service for any of the following:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Impersonating any person, resident, health worker, or physician.</li>
                <li>Submitting fraudulent prescriptions, falsified health records, or abusive messages.</li>
                <li>Attempting to bypass security authentications, reverse-engineer, or scrape patient databases.</li>
                <li>Transmitting unsolicited commercial advertisements or promotional materials.</li>
              </ul>
            </div>

            {/* 8. Intellectual Property */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                8. Intellectual Property &amp; EULA
              </h2>
              <p>
                All software, user interface designs, logos, and mascot graphics (&ldquo;Dr. Ticky&rdquo;) are the proprietary property of TickyTICKEY and its partners. We grant you a revocable, non-exclusive, non-transferable license to use the Service strictly for authorized personal healthcare and barangay public health workflows.
              </p>
            </div>

            {/* 9. Apple App Store & Google Play Terms */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                9. Apple App Store &amp; Google Play Store Supplemental Terms
              </h2>
              <p className="mb-2">
                If you access our mobile applications through the Apple App Store or Google Play Store:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Apple App Store:</strong> You acknowledge that these Terms are between you and TickyTICKEY, not Apple. Apple is not responsible for the Service or its content. Apple has no obligation to provide maintenance or support. Apple and its subsidiaries are third-party beneficiaries of these Terms.
                </li>
                <li>
                  <strong>Google Play Store:</strong> Your use of the Android application complies with the Google Play Developer Distribution Agreement and Google Play Health Content and Services Policies.
                </li>
              </ul>
            </div>

            {/* 10. Limitation of Liability */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                10. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by Philippine law, TickyTICKEY, the local barangay government, and participating health practitioners shall not be liable for any indirect, incidental, or consequential damages resulting from telecommunication delays, temporary system downtime, or failure to contact emergency services (911) during life-threatening medical events.
              </p>
            </div>

            {/* 11. Governing Law */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                11. Governing Law &amp; Dispute Resolution
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the <strong>Republic of the Philippines</strong>. Any dispute arising out of or related to these Terms shall first be submitted to good-faith amicable conciliation before the Barangay Lupong Tagapamayapa or local health authorities prior to seeking legal relief in Philippine courts.
              </p>
            </div>

            {/* 12. Contact Us */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                12. Contact Information
              </h2>
              <p>
                If you have questions regarding these Terms of Service, please contact:
              </p>
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p><strong>TickyTICKEY Legal &amp; Compliance Office</strong></p>
                <p>Email: <a href="mailto:tickeytikey01@gmail.com" className="text-[#246b38] underline font-medium">tickeytikey01@gmail.com</a></p>
                <p>National Barangay Health Hotline: 1555 / National Emergency: 911</p>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
