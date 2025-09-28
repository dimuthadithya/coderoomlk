// src/firebaseCrud.js
import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

// Reference to phones collection
const phonesCollection = collection(db, 'phones');

// CREATE
export const addPhone = async (phone) => {
  try {
    const docRef = await addDoc(phonesCollection, phone);
    return docRef.id;
  } catch (err) {
    console.error(err);
  }
};

// READ
export const getPhones = async () => {
  const snapshot = await getDocs(phonesCollection);
  const phones = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return phones;
};

// UPDATE
export const updatePhone = async (id, updatedData) => {
  const phoneDoc = doc(db, 'phones', id);
  await updateDoc(phoneDoc, updatedData);
};

// DELETE
export const deletePhone = async (id) => {
  const phoneDoc = doc(db, 'phones', id);
  await deleteDoc(phoneDoc);
};
