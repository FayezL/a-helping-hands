'use client';

import { useState, useEffect } from "react";
import { getBookings, updateBookingStatus, deleteBooking } from "@/lib/db/bookings";
import type { BookingRequest, BookingStatus } from "@/types";
import AdminGuard from "@/components/admin/AdminGuard";
import BookingTable from "@/components/admin/BookingTable";
import BookingDetail from "@/components/admin/BookingDetail";

function StatCard({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{count}</p>
    </div>
  );
}

export default function AdminDashboardClient() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, status: BookingStatus) => {
    await updateBookingStatus(id, status);
    await fetchBookings();
    if (selectedBooking?.id === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleDelete = async (id: string) => {
    await deleteBooking(id);
    setSelectedBooking(null);
    await fetchBookings();
  };

  const totalCount = bookings.length;
  const newCount = bookings.filter((b) => b.status === "new").length;
  const scheduledCount = bookings.filter((b) => b.status === "scheduled").length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;

  return (
    <AdminGuard>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Bookings</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total" count={totalCount} color="text-gray-900" />
          <StatCard label="New" count={newCount} color="text-blue-600" />
          <StatCard label="Scheduled" count={scheduledCount} color="text-purple-600" />
          <StatCard label="Completed" count={completedCount} color="text-green-600" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
            </div>
          ) : (
            <BookingTable
              bookings={bookings}
              onSelect={setSelectedBooking}
              selectedId={selectedBooking?.id}
            />
          )}
        </div>

        {selectedBooking && (
          <BookingDetail
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </div>
    </AdminGuard>
  );
}
