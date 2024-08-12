import React, { useState } from 'react';
import './css/flashcard.css';

function Flashcard({ flashcard, index, currentIndex }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flashcard ${index === currentIndex ? 'current' : ''} ${isFlipped ? 'flipped' : ''}`}
      style={{
        transform: `translateX(${(index - currentIndex) * 320}px)`,
        opacity: index === currentIndex ? 1 : 0.5,
        zIndex: index === currentIndex ? 1 : 0,
      }}
      onClick={handleFlip}
    >
      <div className="front">{flashcard.question}</div>
      <div className="back">{flashcard.answer}</div>
    </div>
  );
}

export default Flashcard;