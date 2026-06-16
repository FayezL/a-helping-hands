import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BookingRequest, BookingStatus, BookingFormData } from "@/types";

const COLLECTION_NAME = "booking_requests";

function mapBooking(docSnap: QueryDocumentSnapshot): BookingRequest {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    address: data.address,
    serviceType: data.serviceType,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    preferredDate: data.preferredDate,
    notes: data.notes || "",
    status: data.status,
    createdAt: data.createdAt?.toDate() || new Date(),
  };
}

import { type QueryDocumentSnapshot } from "firebase/firestore";

export async function createBooking(
  data: BookingFormData
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    status: "new" as BookingStatus,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getBookings(): Promise<BookingRequest[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapBooking);
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { status });
}

export async function deleteBooking(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
