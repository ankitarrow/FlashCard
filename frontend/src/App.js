import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Flashcard from './components/Flashcard';
import Flashcard1 from './components/Flashcard1';
import AdminDashboard from './components/AdminDashboard';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped,flipping]=useState(false)
  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('https://flashcard-1-4ifb.onrender.com/flashcards');
      setFlashcards(response.data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const nextCard = () => {
    flipping(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    flipping(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  return (
    <Router>
      <div className="App">
        <h1>Flashcard Learning Tool</h1>
        <Routes>
          <Route path="/admin" element={
            <div>
              <AdminDashboard fetcha={fetchFlashcards} />
              <div className="all-flashcards admi">
                {flashcards.map((flashcard, index) => (
                  <Flashcard1 key={index} {...flashcard} reload={fetchFlashcards}/>
                ))}
              </div>
            </div>
          } />
          <Route path="/" element={
            flashcards.length > 0 ? (
              <div>
                <Flashcard
                  question={flashcards[currentIndex].question}
                  answer={flashcards[currentIndex].answer}
                  isFlipped={isFlipped}
                  flipping={flipping}
                />
                <div className="but">
                  <button onClick={prevCard} >Previous</button>
                  <button onClick={nextCard} >Next</button>
                </div>
                <br></br>
                <Link to="/admin">Go to Admin Dashboard</Link>
              </div>
            ) : (
              <p>Loading flashcards...</p>
<Link to="/admin">Go to Admin Dashboard</Link>
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
