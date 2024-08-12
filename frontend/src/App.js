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
              <>
              <div>
                <Flashcard
                  question={flashcards[currentIndex].question}
                  answer={flashcards[currentIndex].answer}
                  isFlipped={isFlipped}
                  flipping={flipping}
                />
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
  <div className="but" style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
    <button 
      onClick={prevCard} 
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        backgroundColor: '#4CAF50', 
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
    >
      Previous
    </button>
    <button 
      onClick={nextCard} 
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        backgroundColor: '#008CBA', 
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#007BB5'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#008CBA'}
    >
      Next
    </button>
  </div>
  <br />
  <Link 
    to="/admin" 
    style={{
      fontSize: '18px',
      color: '#007BFF',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'color 0.3s',
    }}
    onMouseOver={(e) => e.target.style.color = '#0056b3'}
    onMouseOut={(e) => e.target.style.color = '#007BFF'}
  >
    Go to Admin Dashboard
  </Link>
  
</div>
</div>
</>
            ) : (
              <div>
              <p>Loading flashcards...</p>
              <Link 
    to="/admin" 
    style={{
      fontSize: '18px',
      color: '#007BFF',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'color 0.3s',
    }}
    onMouseOver={(e) => e.target.style.color = '#0056b3'}
    onMouseOut={(e) => e.target.style.color = '#007BFF'}
  >
    Go to Admin Dashboard
  </Link>

              </div> 
            )
            
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
