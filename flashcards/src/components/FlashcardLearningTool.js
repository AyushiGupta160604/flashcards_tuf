import React, { useState } from 'react';
import Flashcard from './Flashcard';
import './css/flashcard.css';

function FlashcardLearningTool({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flashcard-view">
      <h1>All the available Flashcards</h1>
      {flashcards.length === 0 ? (
  <p>No flashcards available.</p>
) : (
      <div className="flashcard-container">
        {flashcards.map((flashcard, index) => (
          <Flashcard
            key={flashcard.id}
            flashcard={flashcard}
            index={index}
            currentIndex={currentIndex}
          />
        ))}
      </div>
)}
      <button onClick={prevCard}>Previous</button>
      <button onClick={nextCard}>Next</button>
    </div>
  );
}

export default FlashcardLearningTool;