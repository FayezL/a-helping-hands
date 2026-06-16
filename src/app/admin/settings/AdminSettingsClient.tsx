'use client';

import { useState, useEffect } from "react";
import { getBusinessSettings, updateBusinessSettings } from "@/lib/db/settings";
import type { BusinessSettings } from "@/types";
import AdminGuard from "@/components/admin/AdminGuard";
import SettingsForm from "@/components/admin/SettingsForm";

const defaultSettings: BusinessSettings = {
  acceptingRequests: true,
  phoneNumber: "",
  email: "",
  serviceArea: "",
  businessHours: "",
};

export default function AdminSettingsClient() {
  const [settings, setSettings] = useState<BusinessSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getBusinessSettings();
        setSettings(data);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (updated: Partial<BusinessSettings>) => {
    await updateBusinessSettings(updated);
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  return (
    <AdminGuard>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Business Settings</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
            </div>
          ) : (
            <SettingsForm settings={settings} onSave={handleSave} />
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
