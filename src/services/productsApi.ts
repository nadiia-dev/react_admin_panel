import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Product } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const productsRef = collection(db, "products");
  const q = query(productsRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const getOneProduct = async (id: string): Promise<Product> => {
  const productRef = query(
    collection(db, "products"),
    where("id", "==", Number(id))
  );
  const snapshot = await getDocs(productRef);
  if (snapshot.empty) {
    throw new Error(`Product with ID ${id} not found`);
  }

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as Product;
};

export const deleteProduct = async (id: number) => {
  try {
    const q = query(collection(db, "products"), where("id", "==", id));
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

export const updateProduct = async (
  id: number,
  updatedData: Partial<Product>
) => {
  try {
    const q = query(collection(db, "products"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const productRef = doc(db, "products", document.id);
      await updateDoc(productRef, updatedData);
      console.log("Document updated:", document.id);
    });
  } catch (e) {
    console.error(`Error updating product: ${e}`);
  }
};
