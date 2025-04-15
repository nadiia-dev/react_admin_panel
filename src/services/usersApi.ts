import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
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
