"use client";

import { SystemSettings } from "@/types/settings";
import { mutateAdminResources } from "@/lib/adminClient";
import {
  BellRing,
  Building2,
  Check,
  FileCheck2,
  RotateCcw,
  Save,
  ShieldCheck,
  Stethoscope
} from "lucide-react";
import { useState } from "react";

interface Props { initialSettings: SystemSettings; onDataChange: (settings: SystemSettings) => void; onError: (message: string) => void; }

export default function SettingsView({ initialSettings, onDataChange, onError }: Props) {
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState<"clinic" | "triage" | "notifications" | "security">("clinic");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      const data = await mutateAdminResources("saveSettings", { ...settings, notifications: { ...settings.notifications, smsApiKey: "" } });
      onDataChange(data.settings);
      setSavedSuccess(true);
      window.setTimeout(() => setSavedSuccess(false), 3500);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Unable to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Reset all settings to default clinic values?")) {
      setSettings(initialSettings);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6 pb-16">
      {/* Simple, Clean Settings Page Header */}
      <div className="pb-2 border-b border-gray-200/60">
        <h1 className="text-2xl sm:text-3xl font-black text-[#133d23] tracking-tight">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
          Manage clinic metadata, consultation triage rules, SMS gateways, and system security.
        </p>
      </div>

      {/* 2. Settings Tabs Navigation */}
      <div className="bg-white rounded-3xl p-2.5 sm:p-3 border border-gray-100 shadow-2xs flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("clinic")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "clinic"
              ? "bg-[#246b38] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Clinic Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("triage")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "triage"
              ? "bg-[#246b38] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Triage &amp; Consultations</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "notifications"
              ? "bg-[#246b38] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <BellRing className="w-4 h-4" />
          <span>SMS &amp; Notifications</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "security"
              ? "bg-[#246b38] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Security &amp; Privacy</span>
        </button>
      </div>

      {/* 3. Settings Form Container */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-6">
        {/* Success Toast Alert */}
        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#15803d] flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-xs font-bold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Clinic settings successfully updated and synced with backend database!</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-mono">Status: 200 OK</span>
          </div>
        )}

        {/* Tab 1: Clinic Profile */}
        {activeTab === "clinic" && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-black text-gray-900 leading-tight">
                Barangay Health Station Details
              </h3>
              <p className="text-xs text-gray-400">
                Official facility name, physician in charge, and public patient operating hours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Health Station Name</label>
                <input
                  type="text"
                  value={settings.clinic.stationName}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      clinic: { ...settings.clinic, stationName: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none focus:border-[#246b38] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Head Physician / MHO</label>
                <input
                  type="text"
                  value={settings.clinic.headPhysician}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      clinic: { ...settings.clinic, headPhysician: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none focus:border-[#246b38] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Barangay &amp; City</label>
                <input
                  type="text"
                  value={`${settings.clinic.barangay}, ${settings.clinic.cityMunicipality}`}
                  disabled
                  className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl font-semibold text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Clinic Hotline Contact</label>
                <input
                  type="text"
                  value={settings.clinic.contactNumber}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      clinic: { ...settings.clinic, contactNumber: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none focus:border-[#246b38] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Emergency 24/7 Hotline</label>
                <input
                  type="text"
                  value={settings.clinic.emergencyHotline}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      clinic: { ...settings.clinic, emergencyHotline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none focus:border-[#246b38] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Operating Days &amp; Hours</label>
                <input
                  type="text"
                  value={`${settings.clinic.operatingDays} (${settings.clinic.operatingHours})`}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      clinic: { ...settings.clinic, operatingHours: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none focus:border-[#246b38] focus:bg-white"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-gray-700 font-bold mb-1">Physical Center Address</label>
              <input
                type="text"
                value={settings.clinic.address}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    clinic: { ...settings.clinic, address: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none focus:border-[#246b38] focus:bg-white"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Triage & Consultations */}
        {activeTab === "triage" && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-black text-gray-900 leading-tight">
                Triage &amp; Clinical Consultation Workflow
              </h3>
              <p className="text-xs text-gray-400">
                Configure automated case distribution, telemedicine video calls, and default canned responses.
              </p>
            </div>

            {/* Switches */}
            <div className="space-y-3">
              <label className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    Automatic BHW Case Distribution
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Automatically assign incoming resident health queries to the least-busy on-duty health worker.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.triage.autoAssignBhws}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      triage: { ...settings.triage, autoAssignBhws: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-[#246b38] rounded focus:ring-[#246b38]"
                />
              </label>

              <label className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    Telemedicine Voice &amp; Video Consultations
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Enable encrypted live audio/video calls between licensed doctors and residents in Messenger.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.triage.telemedicineEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      triage: { ...settings.triage, telemedicineEnabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-[#246b38] rounded focus:ring-[#246b38]"
                />
              </label>
            </div>

            {/* Templates */}
            <div className="space-y-3 text-xs pt-2">
              <label className="block text-gray-700 font-bold">Standard Fever Guidance Template</label>
              <textarea
                rows={2}
                value={settings.triage.responseTemplateFever}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    triage: { ...settings.triage, responseTemplateFever: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#246b38] focus:bg-white resize-none"
              />

              <label className="block text-gray-700 font-bold">Standard Cough &amp; Cold Guidance Template</label>
              <textarea
                rows={2}
                value={settings.triage.responseTemplateCough}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    triage: { ...settings.triage, responseTemplateCough: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#246b38] focus:bg-white resize-none"
              />
            </div>
          </div>
        )}

        {/* Tab 3: SMS & Notifications */}
        {activeTab === "notifications" && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-black text-gray-900 leading-tight">
                SMS Gateway &amp; Automated Alerts
              </h3>
              <p className="text-xs text-gray-400">
                Configure Philippine SMS broadcast gateways (Semaphore / Twilio) and low stock inventory triggers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">SMS Gateway Provider</label>
                <select
                  value={settings.notifications.smsGatewayProvider}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        smsGatewayProvider: e.target.value as SystemSettings["notifications"]["smsGatewayProvider"],
                      },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:border-[#246b38]"
                >
                  <option value="Semaphore">Semaphore Philippines (Recommended for Telco Sync)</option>
                  <option value="Twilio">Twilio Global</option>
                  <option value="GlobeLabs">Globe Labs API</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Sender Brand Name</label>
                <input
                  type="text"
                  value={settings.notifications.smsSenderName}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, smsSenderName: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none focus:border-[#246b38]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">API Key / Auth Token</label>
                <input
                  type="password"
                  value=""
                  readOnly
                  placeholder="Configure as a Vercel server environment variable"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-900 focus:outline-none focus:border-[#246b38]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Low Medicine Stock Alert Threshold (pcs)</label>
                <input
                  type="number"
                  value={settings.notifications.lowStockThresholdPcs}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        lowStockThresholdPcs: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none focus:border-[#246b38]"
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <label className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    Broadcast SMS to Non-Smartphone Residents
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Automatically relay emergency advisories as standard cellular SMS for residents without mobile data.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.enableResidentSmsAlerts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        enableResidentSmsAlerts: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 text-[#246b38] rounded focus:ring-[#246b38]"
                />
              </label>

              <label className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    Daily Barangay Census Email Digest
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Send end-of-day summary reports to the Barangay Captain and Medical Officer.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.enableDailyDigestEmail}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        enableDailyDigestEmail: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 text-[#246b38] rounded focus:ring-[#246b38]"
                />
              </label>
            </div>
          </div>
        )}

        {/* Tab 4: Security & Privacy */}
        {activeTab === "security" && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-black text-gray-900 leading-tight">
                Security, Compliance &amp; Audit
              </h3>
              <p className="text-xs text-gray-400">
                Philippine Data Privacy Act (RA 10173) compliance, session controls, and authentication policies.
              </p>
            </div>

            <div className="space-y-3">
              <label className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    Mandatory Two-Factor Authentication (2FA) for Staff
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Require SMS or authenticator app verification code when health workers sign in from new devices.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.security.requireTwoFactorAuth}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      security: { ...settings.security, requireTwoFactorAuth: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-[#246b38] rounded focus:ring-[#246b38]"
                />
              </label>

              <label className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    Continuous Audit Logging
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Record all medical record views, prescription modifications, and export operations.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.security.auditLoggingEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      security: { ...settings.security, auditLoggingEnabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-[#246b38] rounded focus:ring-[#246b38]"
                />
              </label>
            </div>

            <div className="p-4 rounded-2xl bg-[#edf7ef]/70 border border-green-200 text-xs text-gray-700 flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-[#246b38] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#133d23] block">
                  RA 10173 (Philippine Data Privacy Act) Accreditation
                </span>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  All resident medical history, consultation threads, and vitals are encrypted at rest with AES-256 and transmitted exclusively over HTTPS.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#246b38] hover:bg-[#1b552b] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
