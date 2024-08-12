import React, { useState } from 'react';

const Flashcard = ({ question, answer,isFlipped,flipping }) => {

  return (
    <>
    <div 
      className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
      onClick={() => flipping(!isFlipped)}
      style={{
        cursor: 'pointer',
        width: '500px',
        height: '200px',
        border: '1px solid #ddd',
        margin: '0% 0% 0% 33%',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        transition: 'transform 0.6s',
        transform: isFlipped ? 'rotateY(360deg)' : 'rotateY(0deg)',
      }}
    >
        <div style={{ fontSize: '18px', textAlign: 'center' }}>
        {isFlipped ? "Answer" : "Question"}
      </div>
      <br></br>
      <div style={{ fontSize: '18px', textAlign: 'center' }}>
        {isFlipped ? answer : question}
      </div>
    </div>
    </>
  );
};

export default Flashcard;
