import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  doc,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { User } from "../types/User";

export const getTopDealUsers = async (): Promise<User[]> => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, orderBy("amount", "desc"), limit(7));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];
};

export const getUsers = async (): Promise<User[]> => {
  const usersRef = collection(db, "users");
  const q = query(usersRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];
};

export const getOneUser = async (id: string): Promise<User> => {
  const userRef = query(collection(db, "users"), where("id", "==", Number(id)));
  const snapshot = await getDocs(userRef);

  if (snapshot.empty) {
    throw new Error(`User with ID ${id} not found`);
  }

  const doc = snapshot.docs[0];

  return {
    id: doc.id,
    ...doc.data(),
  } as User;
};

export const deleteUser = async (id: number) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(db, "users", document.id));
      console.log("Document deleted:", document.id);
    });
  } catch (e) {
    console.error(`Error ${e}`);
  }
};

export const createUser = async (userData: User) => {
  try {
    await addDoc(collection(db, "users"), userData);
  } catch (e) {
    console.error(e);
  }
};

export const updateUser = async (id: number, updatedData: Partial<User>) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const userRef = doc(db, "users", document.id);
      await updateDoc(userRef, updatedData);
      console.log("Document updated:", document.id);
    });
  } catch (e) {
    console.error(`Error updating user: ${e}`);
  }
};
