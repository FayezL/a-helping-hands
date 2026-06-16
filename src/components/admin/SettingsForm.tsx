'use client';

import { useState } from "react";
import type { BusinessSettings } from "@/types";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

interface SettingsFormProps {
  settings: BusinessSettings;
  onSave: (settings: Partial<BusinessSettings>) => Promise<void>;
}

export default function SettingsForm({ settings, onSave }: SettingsFormProps) {
  const [acceptingRequests, setAcceptingRequests] = useState(settings.acceptingRequests);
  const [phoneNumber, setPhoneNumber] = useState(settings.phoneNumber);
  const [email, setEmail] = useState(settings.email);
  const [serviceArea, setServiceArea] = useState(settings.serviceArea);
  const [businessHours, setBusinessHours] = useState(settings.businessHours);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      await onSave({
        acceptingRequests,
        phoneNumber,
        email,
        serviceArea,
        businessHours,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">Accepting Requests</p>
          <p className="text-sm text-gray-500">Allow new booking requests from customers</p>
        </div>
        <button
          type="button"
          onClick={() => setAcceptingRequests(!acceptingRequests)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${acceptingRequests ? "bg-primary-500" : "bg-gray-200"}`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${acceptingRequests ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>
      </div>

      <Input
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="(555) 123-4567"
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="info@example.com"
      />

      <Textarea
        label="Service Area"
        value={serviceArea}
        onChange={(e) => setServiceArea(e.target.value)}
        placeholder="Describe the areas you serve..."
      />

      <Input
        label="Business Hours"
        value={businessHours}
        onChange={(e) => setBusinessHours(e.target.value)}
        placeholder="Monday - Saturday: 8:00 AM - 6:00 PM"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-600">Settings saved successfully!</p>}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
