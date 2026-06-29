'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues } from "@/lib/validations/booking";
import { createBooking } from "@/lib/db/bookings";
import { BOOKING_SOURCES, SERVICE_TYPES } from "@/data/constants";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

interface CreateBookingModalProps {
  onClose: () => void;
  onCreated: (id: string) => void;
}

export default function CreateBookingModal({ onClose, onCreated }: CreateBookingModalProps) {
  const [submitting, setSubmitting] = useState(false);
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
      serviceType: "" as BookingFormValues["serviceType"],
      bedrooms: 0,
      bathrooms: 0,
      preferredDate: "",
      notes: "",
      source: "Phone Call",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setSubmitting(true);
    setError(null);
    try {
      const id = await createBooking(data);
      onCreated(id);
    } catch {
      setError("Something went wrong creating the booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <>
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 md:p-8"
        >
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">New Booking</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1 hover:bg-gray-100 transition-colors"
              >
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit) as never} className="px-6 py-5 space-y-5">
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-600">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                <Input
                  label="Preferred Date"
                  type="date"
                  registration={register("preferredDate")}
                  error={errors.preferredDate?.message}
                />
                <Select
                  label="Source"
                  registration={register("source")}
                  error={errors.source?.message}
                  options={BOOKING_SOURCES.map((s) => ({ value: s, label: s }))}
                />
                <div className="md:col-span-2">
                  <Textarea
                    label="Notes (optional)"
                    registration={register("notes")}
                    error={errors.notes?.message}
                    placeholder="Any special requests or instructions..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
                <Button type="button" variant="outline" size="md" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" disabled={submitting}>
                  {submitting ? "Creating..." : "Create Booking"}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
