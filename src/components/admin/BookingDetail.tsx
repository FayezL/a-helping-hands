'use client';

import { motion, AnimatePresence } from "framer-motion";
import type { BookingRequest, BookingStatus } from "@/types";
import Badge from "@/components/ui/Badge";
import SourceBadge from "@/components/ui/SourceBadge";

interface BookingDetailProps {
  booking: BookingRequest;
  onClose: () => void;
  onStatusChange: (id: string, status: BookingStatus) => void;
  onDelete: (id: string) => void;
}

const statusOptions: { value: BookingStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BookingDetail({ booking, onClose, onStatusChange, onDelete }: BookingDetailProps) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      onDelete(booking.id);
    }
  };

  return (
    <AnimatePresence>
      <>
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Booking Details</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1 hover:bg-gray-100 transition-colors"
              >
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <Badge status={booking.status} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Source</span>
                <SourceBadge source={booking.source} />
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Name</span>
                <p className="text-gray-900">{booking.fullName}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Phone</span>
                <p>
                  <a href={`tel:${booking.phone}`} className="text-primary-600 hover:text-primary-700">
                    {booking.phone}
                  </a>
                </p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Email</span>
                <p>
                  <a href={`mailto:${booking.email}`} className="text-primary-600 hover:text-primary-700">
                    {booking.email}
                  </a>
                </p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Address</span>
                <p className="text-gray-900">{booking.address}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Service Type</span>
                <p className="text-gray-900">{booking.serviceType}</p>
              </div>

              <div className="flex gap-8">
                <div>
                  <span className="text-sm font-medium text-gray-500">Bedrooms</span>
                  <p className="text-gray-900">{booking.bedrooms}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Bathrooms</span>
                  <p className="text-gray-900">{booking.bathrooms}</p>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Preferred Date</span>
                <p className="text-gray-900">{formatDate(new Date(booking.preferredDate))}</p>
              </div>

              {booking.notes && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Notes</span>
                  <p className="text-gray-900 whitespace-pre-wrap">{booking.notes}</p>
                </div>
              )}

              <div>
                <span className="text-sm font-medium text-gray-500">Submitted</span>
                <p className="text-gray-900">{formatDate(booking.createdAt)}</p>
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
              <div>
                <label htmlFor="status-change" className="block text-sm font-medium text-gray-700 mb-1">
                  Change Status
                </label>
                <select
                  id="status-change"
                  value={booking.status}
                  onChange={(e) => onStatusChange(booking.id, e.target.value as BookingStatus)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleDelete}
                className="w-full rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete Booking
              </button>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
