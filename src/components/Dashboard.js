
import React, { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../contexts/AuthContext';
import "../styles/Dashboards.css";
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const { currentUser } = useAuth();
  const { documents, addDocument, deleteDocument, updateDocument } = useFirestore('userCollection');
  const [newDocument, setNewDocument] = useState({ date: '', clientname: '', unitprice: '', quantity: '' });
  const [editingDocument, setEditingDocument] = useState(null);

  const handleAdd = async () => {
    await addDocument(newDocument);
    setNewDocument({ date: '', clientname: '', unitprice: '', quantity: '' });
  };

  const handleUpdate = async () => {
    await updateDocument(editingDocument.id, editingDocument);
    setEditingDocument(null);
  };

  return (
    <div className='mainDashbaord'>

      <div className="mainhead">
        <p>jfhjjdshjhf  mainhead</p>
        <h2>Welcome, {currentUser ? currentUser.email : 'User'}!</h2>
      </div>

      <div className="mainDashboardContent">
        <div className="dashleft">
          <p>jfhjjdshjhf  dashleft</p>
          <input
            type="date"
            value={newDocument.date}
            onChange={(e) => setNewDocument({ ...newDocument, date: e.target.value })}
            placeholder="Date"
          />
          <input
            type="text"
            value={newDocument.clientname}
            onChange={(e) => setNewDocument({ ...newDocument, clientname: e.target.value })}
            placeholder="Client Name"
          />
          <input
            type="number"
            value={newDocument.unitprice}
            onChange={(e) => setNewDocument({ ...newDocument, unitprice: e.target.value })}
            placeholder="Unit Price"
          />
          <input
            type="number"
            value={newDocument.quantity}
            onChange={(e) => setNewDocument({ ...newDocument, quantity: e.target.value })}
            placeholder="Quantity"
          />
          <button onClick={handleAdd}>Add Document</button>
        </div>
        <div className="dashright">
          <p>jfhjjdshjhf  dashright</p>
          {editingDocument && (
            <div>
              <h3>Edit Document</h3>
              <input
                type="date"
                value={editingDocument.date}
                onChange={(e) => setEditingDocument({ ...editingDocument, date: e.target.value })}
                placeholder="Date"
              />
              <input
                type="text"
                value={editingDocument.clientname}
                onChange={(e) => setEditingDocument({ ...editingDocument, clientname: e.target.value })}
                placeholder="Client Name"
              />
              <input
                type="number"
                value={editingDocument.unitprice}
                onChange={(e) => setEditingDocument({ ...editingDocument, unitprice: e.target.value })}
                placeholder="Unit Price"
              />
              <input
                type="number"
                value={editingDocument.quantity}
                onChange={(e) => setEditingDocument({ ...editingDocument, quantity: e.target.value })}
                placeholder="Quantity"
              />
              <button onClick={handleUpdate}>Update Document</button>
            </div>
          )}

          <ul>
            {documents.map((doc) => (
              <li key={doc.id}>
                {doc.date} - {doc.clientname} - {doc.unitprice} - {doc.quantity}
                <button className='btnEdit' onClick={() => setEditingDocument(doc)}> Edit </button>
                <button className='btnDel' onClick={() => deleteDocument(doc.id)}>Delete</button>
              </li>
            ))}
          </ul>

        </div>
      </div>

      {/* Button to navigate to MapDoc */}
      <Link to="/map">
        <button>Go to MapDoc</button>
      </Link>
    </div>
  );
};

export default Dashboard;