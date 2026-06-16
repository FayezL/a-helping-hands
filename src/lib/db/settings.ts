import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ContactMessage, ContactFormData, BusinessSettings } from "@/types";

const CONTACTS_COLLECTION = "contact_messages";
const SETTINGS_DOC = "business_settings";
const SETTINGS_COLLECTION = "settings";

function mapContact(docSnap: QueryDocumentSnapshot): ContactMessage {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: data.name,
    email: data.email,
    message: data.message,
    createdAt: data.createdAt?.toDate() || new Date(),
  };
}

export async function createContactMessage(
  data: ContactFormData
): Promise<string> {
  const docRef = await addDoc(collection(db, CONTACTS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const q = query(
    collection(db, CONTACTS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapContact);
}

export async function getBusinessSettings(): Promise<BusinessSettings> {
  const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {
      acceptingRequests: true,
      phoneNumber: "",
      email: "",
      serviceArea: "",
      businessHours: "",
    };
  }

  return docSnap.data() as BusinessSettings;
}

export async function updateBusinessSettings(
  settings: Partial<BusinessSettings>
): Promise<void> {
  const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC);
  await setDoc(docRef, settings, { merge: true });
}

export async function isAcceptingRequests(): Promise<boolean> {
  const settings = await getBusinessSettings();
  return settings.acceptingRequests;
}
