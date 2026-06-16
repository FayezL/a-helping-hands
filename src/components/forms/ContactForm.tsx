"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { createContactMessage } from "@/lib/db/contacts";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitting(true);
    setError(null);

    try {
      await createContactMessage(data);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-secondary-50 via-accent-50 to-primary-50 border border-accent-200 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-secondary-300 via-accent-300 to-primary-300">
          <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-script text-2xl text-accent-600">Thank you!</h3>
        <p className="mt-2 text-secondary-600">Your message has been sent. We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Name"
        placeholder="Your full name"
        error={errors.name?.message}
        registration={register("name")}
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        registration={register("email")}
      />

      <Textarea
        label="Message"
        placeholder="How can we help you?"
        rows={5}
        error={errors.message?.message}
        registration={register("message")}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        size="lg"
        className={`w-full ${submitting ? "pointer-events-none opacity-60" : ""}`}
      >
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
