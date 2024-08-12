import React, { useState } from 'react';
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import Edit from './Edit';
import axios from 'axios';
const Flashcard = ({ question, answer,reload }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [edit, setEdit] = useState(false);
  const onClose=()=>{
    setEdit(false);
  }
  const on1=(e)=>{e.stopPropagation()
setEdit(!edit)
  }
  const on2=()=>{
    if(!edit)
    setIsFlipped(!isFlipped)
  }
  const delete1 = async (e) => {
    e.stopPropagation();
    try {
        const findResponse = await axios.post('https://flashcard-1-4ifb.onrender.com/flashcards/find', {
            question: question,
            answer: answer
          });
      console.log(findResponse);
      const { id } = findResponse.data;
      console.log(id);
     await axios.delete(`https://flashcard-1-4ifb.onrender.com/flashcards/${id}`);
      reload();
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
    alert("Card is Deleted");
  };
  return (
    <>
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
        onClick={on2}
        style={{
          cursor: 'pointer',
          width:"33%",
          height:"50vh",
          border: '1px solid #ddd',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#f9f9f9',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(360deg)' : 'rotateY(0deg)',
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
          <div 
            className='w-fit ml-auto  bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
            onClick={on1}
          >
            <MdModeEditOutline />
          </div>
          
          <div 
            className='w-fit  ml-auto  bg-red-100  hover:bg-red-600 rounded-full hover:text-white cursor-pointer' onClick={delete1}
          >
            <MdDelete />
          </div>
        </div>
        
        <div style={{ fontSize: '18px', textAlign: 'center' }}>
          {isFlipped ? "Answer" : "Question"}
        </div>
        <br />
        <div style={{ fontSize: '18px', textAlign: 'center' }}>
          {isFlipped ? answer : question}
        </div>
        {edit && (
          <Edit onClose={onClose} question={question} answer={answer} reload={reload}/>
        )}
      </div>
    </>
  );
};

export default Flashcard;
