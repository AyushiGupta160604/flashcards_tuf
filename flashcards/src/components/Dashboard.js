import React, { useState } from 'react';

function Dashboard({ flashcards, setFlashcards }) {
  const [form, setForm] = useState({ id: null, question: '', answer: '' });

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleMove = () => {
    window.location.href = "/flashcards";
  };

  const handleAddOrUpdate = async () => {
    try {
      let response;
      if (form.id) {
        // Update Flashcard
        response = await fetch(`http://localhost:5000/api/flashcards/${form.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        // Add Flashcard
        response = await fetch('http://localhost:5000/api/flashcards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Refresh flashcards
      const updatedFlashcards = await fetch('http://localhost:5000/api/flashcards');
      const jsonData = await updatedFlashcards.json();
      setFlashcards(jsonData);
      setForm({ id: null, question: '', answer: '' });
    } catch (error) {
      console.error('Error adding or updating flashcards:', error);
    }
  };

  const handleEdit = (flashcard) => {
    setForm(flashcard);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/flashcards/${id}`, {
        method: 'DELETE',
      });
      const updatedFlashcards = flashcards.filter((flashcard) => flashcard.id !== id);
      setFlashcards(updatedFlashcards);
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="form">
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={form.question}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="answer"
          placeholder="Answer"
          value={form.answer}
          onChange={handleInputChange}
        />
        <button onClick={handleAddOrUpdate}>
          {form.id ? 'Update Flashcard' : 'Add Flashcard'}
        </button>
        <button className="move" onClick={handleMove}>See Flashcards</button>
      </div>
      <div className="flashcard-list">
        {flashcards.length === 0 ? (
          <p>No flashcards available.</p>
        ) : (
          flashcards.map((flashcard) => (
            <div key={flashcard.id}>
              {flashcard.question} - {flashcard.answer}
              <button onClick={() => handleEdit(flashcard)}>Edit</button>
              <button onClick={() => handleDelete(flashcard.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;