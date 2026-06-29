'use client';

import { useState } from "react";
import type { BookingRequest, BookingStatus, BookingSource } from "@/types";
import { BOOKING_SOURCES } from "@/data/constants";
import Badge from "@/components/ui/Badge";
import SourceBadge from "@/components/ui/SourceBadge";

interface BookingTableProps {
  bookings: BookingRequest[];
  onSelect: (booking: BookingRequest) => void;
  selectedId?: string;
}

const statusOptions: { value: BookingStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BookingTable({ bookings, onSelect, selectedId }: BookingTableProps) {
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<BookingSource | "all">("all");

  const filtered = bookings.filter((b) => {
    const matchesStatus = filter === "all" || b.status === filter;
    const matchesSource = sourceFilter === "all" || b.source === sourceFilter;
    return matchesStatus && matchesSource;
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as BookingStatus | "all")}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value as BookingSource | "all")}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="all">All sources</option>
          {BOOKING_SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-left text-sm font-medium text-gray-500">
              <th className="pb-3 pr-4">Name</th>
              <th className="pb-3 pr-4">Service</th>
              <th className="pb-3 pr-4">Source</th>
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((booking) => (
              <tr
                key={booking.id}
                onClick={() => onSelect(booking)}
                className={`cursor-pointer transition-colors hover:bg-gray-50 ${selectedId === booking.id ? "bg-primary-50" : ""}`}
              >
                <td className="py-3 pr-4 text-sm font-medium text-gray-900">{booking.fullName}</td>
                <td className="py-3 pr-4 text-sm text-gray-600">{booking.serviceType}</td>
                <td className="py-3 pr-4"><SourceBadge source={booking.source} /></td>
                <td className="py-3 pr-4 text-sm text-gray-600">{formatDate(new Date(booking.preferredDate))}</td>
                <td className="py-3 pr-4">
                  <Badge status={booking.status} />
                </td>
                <td className="py-3 text-sm text-gray-500">{formatDate(booking.createdAt)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {filtered.map((booking) => (
          <div
            key={booking.id}
            onClick={() => onSelect(booking)}
            className={`rounded-lg border p-4 cursor-pointer transition-colors hover:bg-gray-50 ${selectedId === booking.id ? "border-primary-500 bg-primary-50" : "border-gray-200"}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">{booking.fullName}</span>
              <Badge status={booking.status} />
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{booking.serviceType}</p>
              <p><SourceBadge source={booking.source} /></p>
              <p>Date: {formatDate(new Date(booking.preferredDate))}</p>
              <p>Submitted: {formatDate(booking.createdAt)}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">No bookings found</p>
        )}
      </div>
    </div>
  );
}
