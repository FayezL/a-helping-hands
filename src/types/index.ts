import { BOOKING_SOURCES } from "@/data/constants";

export type BookingStatus = "new" | "contacted" | "scheduled" | "completed";

export type BookingSource = (typeof BOOKING_SOURCES)[number];

export interface BookingRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  bedrooms: number;
  bathrooms: number;
  preferredDate: string;
  notes: string;
  status: BookingStatus;
  source: BookingSource;
  createdAt: Date;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  bedrooms: number;
  bathrooms: number;
  preferredDate: string;
  notes: string;
  source: BookingSource;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface BusinessSettings {
  acceptingRequests: boolean;
  phoneNumber: string;
  email: string;
  serviceArea: string;
  businessHours: string;
}

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  location: string;
}
