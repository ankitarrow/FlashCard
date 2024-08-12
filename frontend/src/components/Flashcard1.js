import React, { useState } from 'react';
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import Edit from './Edit';
import axios from 'axios';

const Flashcard = ({ question, answer, reload }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [edit, setEdit] = useState(false);

  const onClose = () => {
    setEdit(false);
  };

  const onEditClick = (e) => {
    e.stopPropagation();
    setEdit(!edit);
  };

  const onCardClick = () => {
    if (!edit) setIsFlipped(!isFlipped);
  };

  const deleteFlashcard = async (e) => {
    e.stopPropagation();
    try {
      const findResponse = await axios.post('https://flashcard-1-4ifb.onrender.com/flashcards/find', {
        question: question,
        answer: answer
      });
      const { id } = findResponse.data;
      await axios.delete(`https://flashcard-1-4ifb.onrender.com/flashcards/${id}`);
      reload();
      alert("Card is Deleted");
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <>
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
        onClick={onCardClick}
        style={{
          cursor: 'pointer',
          width: "33%",
          height: "50vh",
          margin: "2% auto",
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isFlipped ? '#ffefd5' : '#fafad2',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.6s, background-color 0.4s',
          transform: isFlipped ? 'rotateY(360deg)' : 'rotateY(0deg)',
          position: 'relative',
          perspective: '1000px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", width: "100%" }}>
          <div 
            className='w-fit  ml-auto  bg-green-100  hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
            onClick={onEditClick}
          >
            <MdModeEditOutline size={20} />
          </div>
          <div 
            className='w-fit  ml-auto  bg-red-100  hover:bg-red-600 rounded-full hover:text-white cursor-pointer'
            onClick={deleteFlashcard}
          >
            <MdDelete size={20} />
          </div>
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginTop: '20px' }}>
          {isFlipped ? "Answer" : "Question"}
        </div>
        <div style={{ fontSize: '20px', color: '#555', padding: '20px' }}>
          {isFlipped ? answer : question}
        </div>
        {edit && (
          <Edit onClose={onClose} question={question} answer={answer} reload={reload} />
        )}
      </div>
    </>
  );
};

export default Flashcard;
