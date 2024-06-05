

import { doc, setDoc, getDocs, collection, query, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './FirebaseConfig';

export const addUserDocument = async (userId, data) => {
  try {
    await setDoc(doc(db, 'users', userId), data);
    console.log("User document added successfully!");
  } catch (error) {
    console.error("Error adding user document:", error.message);
  }
};

export const addUserData = async (userId, data) => {
  try {
    const userCollection = collection(db, 'users', userId, 'data');
    await addDoc(userCollection, data);
    console.log("Data added successfully!");
  } catch (error) {
    console.error("Error adding data:", error.message);
  }
};

export const updateUserData = async (userId, docId, data) => {
  try {
    const docRef = doc(db, 'users', userId, 'data', docId);
    await updateDoc(docRef, data);
    console.log("Data updated successfully!");
  } catch (error) {
    console.error("Error updating data:", error.message);
  }
};

export const deleteUserData = async (userId, docId) => {
  try {
    const docRef = doc(db, 'users', userId, 'data', docId);
    await deleteDoc(docRef);
    console.log("Data deleted successfully!");
  } catch (error) {
    console.error("Error deleting data:", error.message);
  }
};

export const getUserData = async (userId) => {
  try {
    const userCollection = collection(db, 'users', userId, 'data');
    const q = query(userCollection);
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  } catch (error) {
    console.error("Error getting user data:", error.message);
  }
};