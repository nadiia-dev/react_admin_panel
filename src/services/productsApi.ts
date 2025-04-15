import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Product } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const usersRef = collection(db, "products");
  const q = query(usersRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const deleteProduct = async (id: number) => {
  console.log(id);
  try {
    const q = query(collection(db, "products"), where("id", "==", id));
    console.log(q);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(db, "products", document.id));
      console.log("Document deleted:", document.id);
    });
  } catch (e) {
    console.error(`Error ${e}`);
  }
};

export const createProduct = async (productData: Product) => {
  try {
    const data = await addDoc(collection(db, "products"), productData);
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};
