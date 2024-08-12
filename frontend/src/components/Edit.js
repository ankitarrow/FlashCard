import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg'; 
import axios from 'axios';
const Edit = ({ onClose, question, answer,reload }) => {
    const [data, setData] = useState({
        ques: question,
        ans: answer
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const findResponse = await axios.post('https://flashcard-1-4ifb.onrender.com/flashcards/find', {
                question: question,
                answer: answer
              });
          console.log(findResponse);
          const { id } = findResponse.data;
          console.log(id);
         await axios.put(`https://flashcard-1-4ifb.onrender.com/flashcards/${id}`,{
            question: data.ques,
                answer: data.ans
         });
          reload();
        } catch (error) {
          console.error('Error updating flashcard:', error);
        }
        reload();
        alert("Your Card is updated");
        onClose();
    };

    return (
        <div
            style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(203, 213, 225, 0.35)',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflowY: 'auto'
            }}
            id="edit"
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    width: '100%',
                    maxWidth: '32rem', 
                    maxHeight: '80%', 
                    overflow: 'auto',     }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '0.75rem'
                    }}
                >
                    <h2 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Edit Card</h2>
                    <div
                        style={{
                            width: 'fit-content',
                            marginLeft: 'auto',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: 'inherit',
                            transition: 'color 0.2s ease-in-out'
                        }}
                        onClick={onClose}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'red')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
                    >
                        <CgClose />
                    </div>
                </div>
                <form 
                    style={{
                        display: 'grid',
                        gap: '0.5rem',
                    }} 
                    onSubmit={handleSubmit}
                >
                    <label htmlFor='ques'>Question:</label>
                    <input 
                        type='text' 
                        id='ques' 
                        placeholder='Enter question' 
                        name='ques'
                        value={data.ques} 
                        onChange={handleOnChange}
                        style={{
                            padding: '0.5rem',
                            backgroundColor: '#f1f5f9', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '0.25rem',
                        }}
                        required
                    />
                    <label htmlFor='ans'>Answer:</label>
                    <input 
                        type='text' 
                        id='ans' 
                        placeholder='Enter answer' 
                        name='ans'
                        value={data.ans} 
                        onChange={handleOnChange}
                        style={{
                            padding: '0.5rem',
                            backgroundColor: '#f1f5f9', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '0.25rem',
                        }}
                        required
                    />
                    <button 
  style={{
    padding: '0.5rem 0.75rem', 
    backgroundColor: '#dc2626', 
    color: 'white', 
    marginBottom: '2.5rem', 
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
>
  Update Card
</button>

                </form>
            </div>
        </div>
    );
};

export default Edit;
