// src/components/FormPage.js
import React, { useState, useEffect } from 'react';
import { addUserData, updateUserData, deleteUserData, getUserData } from '../firebase/firebaseInteractions';
import { auth } from "../firebase/FirebaseConfig";

const FormPage = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userData = await getUserData(userId);
        setData(userData);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = auth.currentUser.uid;
    if (currentId) {
      await updateUserData(userId, currentId, { name, date, price });
    } else {
      await addUserData(userId, { name, date, price });
    }
    setName('');
    setDate('');
    setPrice('');
    setCurrentId('');
    const userData = await getUserData(userId);
    setData(userData);
  };

  const handleEdit = (item) => {
    setName(item.name);
    setDate(item.date);
    setPrice(item.price);
    setCurrentId(item.id);
  };

  const handleDelete = async (id) => {
    const userId = auth.currentUser.uid;
    await deleteUserData(userId, id);
    const userData = await getUserData(userId);
    setData(userData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.date}</p>
            <p>{item.price}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormPage;