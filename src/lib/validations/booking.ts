import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(7, "Phone number is required"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(5, "Address is required"),
  serviceType: z.enum(
    [
      "Weekly Cleaning",
      "Bi-Weekly Cleaning",
      "Monthly Cleaning",
      "Deep Cleaning",
      "Move-In Cleaning",
      "Move-Out Cleaning",
      "Eco-Friendly Cleaning",
    ],
    { message: "Please select a service type" }
  ),
  bedrooms: z.coerce.number().min(0, "Must be 0 or more"),
  bathrooms: z.coerce.number().min(0, "Must be 0 or more"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  notes: z.string().optional().default(""),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
