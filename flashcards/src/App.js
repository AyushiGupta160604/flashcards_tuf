import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlashcardLearningTool from './components/FlashcardLearningTool';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/flashcards');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };
  
    fetchFlashcards();
  }, []);

  // Function to update flashcards on the backend and refresh the state
  const updateFlashcards = async (updatedFlashcards) => {
    try {
      for (const flashcard of updatedFlashcards) {
        const response = await fetch(`http://localhost:5000/api/flashcards/${flashcard.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: flashcard.question,
            answer: flashcard.answer,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
  
      // Refresh flashcards after update
      const data = await fetch('http://localhost:5000/api/flashcards');
      const jsonData = await data.json();
      setFlashcards(jsonData);
    } catch (error) {
      console.error('Error updating flashcards:', error);
    }
  };

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard flashcards={flashcards} setFlashcards={updateFlashcards} />} />
          <Route path="/flashcards" element={<FlashcardLearningTool flashcards={flashcards} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
