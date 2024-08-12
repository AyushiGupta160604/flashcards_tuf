const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes

// GET all flashcards
app.get('/api/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) {
      console.error('Error fetching flashcards:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});


// PUT update a flashcard by ID
app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  db.query(
    'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?',
    [question, answer, id],
    (err) => {
      if (err) {
        console.error('Error updating flashcard:', err);
        return res.status(500).json({ error: 'Database update error' });
      }
      res.status(200).json({ message: 'Flashcard updated successfully' });
    }
  );
});


// POST add a flashcard
app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query(
    'INSERT INTO flashcards (question, answer) VALUES (?, ?)',
    [question, answer],
    (err, results) => {
      if (err) {
        console.error('Error adding flashcard:', err);
        return res.status(500).json({ error: 'Database insert error' });
      }
      res.status(201).json({ id: results.insertId, question, answer });
    }
  );
});



// DELETE a flashcard
app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting flashcard:', err);
      return res.status(500).json({ error: 'Database delete error' });
    }
    res.status(200).json({ message: 'Flashcard deleted successfully' });
  });
});


// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
