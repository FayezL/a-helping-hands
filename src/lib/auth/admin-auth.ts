import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function signInAdmin(
  email: string,
  password: string
) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutAdmin() {
  return signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentAdmin(): User | null {
  return auth.currentUser;
}
