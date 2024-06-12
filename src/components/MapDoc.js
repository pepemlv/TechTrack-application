import React, { useEffect, useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../contexts/AuthContext';

const MapDoc = () => {
  const { currentUser } = useAuth();
  const { documents, getDocumentsByUser } = useFirestore('userCollection');
  const [userDocuments, setUserDocuments] = useState([]);

  useEffect(() => {
    const fetchUserDocuments = async () => {
      if (currentUser) {
        const userDocs = await getDocumentsByUser(currentUser.uid);
        setUserDocuments(userDocs);
      }
    };
    fetchUserDocuments();
  }, [currentUser, getDocumentsByUser]);

  return (
    <div className='mapContainer'>
      {userDocuments.map((doc, index) => (
        <div key={index} className='documentItem'>
          <p>Date: {doc.date}</p>
          <p>Client Name: {doc.clientname}</p>
          <p>Unit Price: {doc.unitprice}</p>
          <p>Quantity: {doc.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default MapDoc;