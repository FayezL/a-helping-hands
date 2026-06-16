import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ContactFormData } from "@/types";

const COLLECTION_NAME = "contact_messages";

export async function createContactMessage(
  data: ContactFormData
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
