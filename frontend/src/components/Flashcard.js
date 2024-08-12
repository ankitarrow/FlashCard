import React from 'react';

const Flashcard = ({ question, answer, isFlipped, flipping }) => {

  return (
    <div 
      className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
      onClick={() => flipping(!isFlipped)}
      style={{
        cursor: 'pointer',
        width: '500px',
        height: '200px',
        margin: '2% auto',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isFlipped ? '#ffefd5' : '#fafad2',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.6s, background-color 0.4s',
        transform: isFlipped ? 'rotateY(360deg)' : 'rotateY(0deg)',
        textAlign: 'center',
        position: 'relative',
        perspective: '1000px',
      }}
    >
      <div style={{
        fontSize: '24px', 
        fontWeight: 'bold', 
        color: '#333', 
        position: 'absolute', 
        top: '20px',
      }}>
        {isFlipped ? "Answer" : "Question"}
      </div>
      <div style={{
        fontSize: '20px', 
        color: '#555', 
        padding: '20px',
        transform: isFlipped ? 'rotateY(360deg)' : 'rotateY(0deg)',
        transition: 'transform 0.6s',
      }}>
        {isFlipped ? answer : question}
      </div>
      <div style={{
        position: 'absolute', 
        bottom: '10px', 
        fontSize: '12px', 
        color: '#999',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}>
        {isFlipped ? "Tap to see question" : "Tap to see answer"}
      </div>
    </div>
  );
};

export default Flashcard;
