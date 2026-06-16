import React from "react";
import type { BookingStatus } from "@/types";

interface BadgeProps {
  status: BookingStatus;
}

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  new: {
    label: "New",
    className: "bg-blue-100 text-blue-800",
  },
  contacted: {
    label: "Contacted",
    className: "bg-yellow-100 text-yellow-800",
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-purple-100 text-purple-800",
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-800",
  },
};

export default function Badge({ status }: BadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
