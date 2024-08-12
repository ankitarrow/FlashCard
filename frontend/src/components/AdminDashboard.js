import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = ({ fetcha }) => {
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });

  const addFlashcard = async () => {
    try {
      await axios.post('https://flashcard-1-4ifb.onrender.com/flashcards', newFlashcard);
      alert('Flashcard added!');
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
    fetcha();
  };

  const inputStyle = {
    padding: '10px',
    margin: '10px 0',
    width: '100%',
    maxWidth: '400px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2%',
  };

  return (
    <div className="admin-dashboard" style={containerStyle}>
      <h2>Add a Flash Card</h2>
      <div className="input-container" style={{ width: '100%', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Question"
          value={newFlashcard.question}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newFlashcard.answer}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
          style={inputStyle}
        />
      </div>
      <button onClick={addFlashcard} style={{ padding: '10px 20px', marginTop: '20px', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px', border: 'none', cursor: 'pointer' }}>
        Add Flashcard
      </button>
    </div>
  );
};

export default AdminDashboard;
