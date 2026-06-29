'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues } from "@/lib/validations/booking";
import { createBooking } from "@/lib/db/bookings";
import { SERVICE_TYPES } from "@/data/constants";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";

interface BookingFormProps {
  defaultServiceType?: string;
}

export default function BookingForm({ defaultServiceType }: BookingFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema) as never,
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      serviceType: (defaultServiceType || "") as BookingFormValues["serviceType"],
      bedrooms: 0,
      bathrooms: 0,
      preferredDate: "",
      notes: "",
      source: "Website",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setSubmitting(true);
    setError(null);

    try {
      await createBooking(data);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-secondary-50 via-accent-50 to-primary-50 border border-accent-200 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-secondary-300 via-accent-300 to-primary-300">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-script text-3xl text-accent-600">Thank you!</h3>
        <p className="mt-2 text-secondary-600">
          Your cleaning request has been submitted. We&apos;ll contact you shortly
          with your free quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit) as never} className="space-y-6">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          registration={register("fullName")}
          error={errors.fullName?.message}
          placeholder="Jane Doe"
        />

        <Input
          label="Phone"
          type="tel"
          registration={register("phone")}
          error={errors.phone?.message}
          placeholder="(555) 123-4567"
        />

        <Input
          label="Email"
          type="email"
          registration={register("email")}
          error={errors.email?.message}
          placeholder="jane@example.com"
        />

        <Select
          label="Service Type"
          registration={register("serviceType")}
          error={errors.serviceType?.message}
          options={[
            { value: "", label: "Select a service..." },
            ...SERVICE_TYPES.map((s) => ({ value: s, label: s })),
          ]}
        />

        <Input
          label="Bedrooms"
          type="number"
          min={0}
          registration={register("bedrooms")}
          error={errors.bedrooms?.message}
          placeholder="0"
        />

        <Input
          label="Bathrooms"
          type="number"
          min={0}
          registration={register("bathrooms")}
          error={errors.bathrooms?.message}
          placeholder="0"
        />

        <div className="md:col-span-2">
          <Input
            label="Address"
            registration={register("address")}
            error={errors.address?.message}
            placeholder="123 Main St, City, State"
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Preferred Date"
            type="date"
            registration={register("preferredDate")}
            error={errors.preferredDate?.message}
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Notes (optional)"
            registration={register("notes")}
            error={errors.notes?.message}
            placeholder="Any special requests or instructions..."
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={submitting}
        className="w-full"
      >
        {submitting ? "Submitting..." : "Submit Cleaning Request"}
      </Button>
    </form>
  );
}
