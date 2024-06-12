import { useReducer, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, query, where } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const initialState = {
  documents: [],
  isPending: false,
  error: null,
  success: null
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { ...state, isPending: true, success: null, error: null };
    case 'ADD_DOCUMENT':
      return { ...state, isPending: false, success: true, documents: [...state.documents, action.payload] };
    case 'DELETE_DOCUMENT':
      return { ...state, isPending: false, success: true, documents: state.documents.filter(doc => doc.id !== action.payload) };
    case 'SET_DOCUMENTS':
      return { ...state, isPending: false, success: true, documents: action.payload };
    case 'ERROR':
      return { ...state, isPending: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [state, dispatch] = useReducer(firestoreReducer, initialState);
  const { currentUser } = useAuth();

  const ref = collection(db, collectionName);

  useEffect(() => {
    const fetchDocuments = async () => {
      dispatch({ type: 'IS_PENDING' });
      try {
        const q = query(ref, where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch({ type: 'SET_DOCUMENTS', payload: documents });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    };

    if (currentUser) {
      fetchDocuments();
    }
  }, [ref, currentUser]);

  const addDocument = async (docData) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const newDoc = { ...docData, uid: currentUser.uid };
      const addedDoc = await addDoc(ref, newDoc);
      dispatch({ type: 'ADD_DOCUMENT', payload: { id: addedDoc.id, ...newDoc } });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      await deleteDoc(doc(ref, id));
      dispatch({ type: 'DELETE_DOCUMENT', payload: id });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  const getDocumentsByUser = async () => {
    try {
      const q = query(ref, where("uid", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return documents;
    } catch (error) {
      console.error('Error fetching documents by user:', error);
      return [];
    }
  };

  return { ...state, addDocument, deleteDocument, getDocumentsByUser };
};

/*// src/hooks/useFirestore.js
import { useReducer, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, query, where } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const initialState = {
  documents: [],
  isPending: false,
  error: null,
  success: null
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { ...state, isPending: true, success: null, error: null };
    case 'ADD_DOCUMENT':
      return { ...state, isPending: false, success: true, documents: [...state.documents, action.payload] };
    case 'DELETE_DOCUMENT':
      return { ...state, isPending: false, success: true, documents: state.documents.filter(doc => doc.id !== action.payload) };
    case 'SET_DOCUMENTS':
      return { ...state, isPending: false, success: true, documents: action.payload };
    case 'ERROR':
      return { ...state, isPending: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [state, dispatch] = useReducer(firestoreReducer, initialState);
  const { currentUser } = useAuth();

  const ref = collection(db, collectionName);

  useEffect(() => {
    const fetchDocuments = async () => {
      dispatch({ type: 'IS_PENDING' });
      try {
        const q = query(ref, where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch({ type: 'SET_DOCUMENTS', payload: documents });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    };

    if (currentUser) {
      fetchDocuments();
    }
  }, [ref, currentUser]);

  const addDocument = async (docData) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const newDoc = { ...docData, uid: currentUser.uid };
      const addedDoc = await addDoc(ref, newDoc);
      dispatch({ type: 'ADD_DOCUMENT', payload: { id: addedDoc.id, ...newDoc } });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      await deleteDoc(doc(ref, id));
      dispatch({ type: 'DELETE_DOCUMENT', payload: id });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  return { ...state, addDocument, deleteDocument };
};*/