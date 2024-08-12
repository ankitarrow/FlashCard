import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = ({fetcha}) => {
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

  return (
    <div className="admin-dashboard" style={{ margin: '2%' }}>
      <h2>Add a Flash Card</h2>
      <div class="asd">
      <div>
      <input
        type="text"
        placeholder="Question"
        value={newFlashcard.question}
        onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
      />
      </div>
       <div>
      <input
        type="text"
        placeholder="Answer"
        value={newFlashcard.answer}
        onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
      />
      </div>
      </div>
      <button onClick={addFlashcard}  >Add Flashcard</button>
    </div>
  );
};

export default AdminDashboard;
