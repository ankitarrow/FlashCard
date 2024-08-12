const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const caCert = fs.readFileSync(path.resolve(__dirname, 'ca-certificate.crt'));

const db = mysql.createConnection({
  host: 'ankit-f1-tuf.k.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_2TLMuw162-QRvapBfxo',
  database: 'defaultdb',
  port: 28559,
  ssl: {
    rejectUnauthorized: true,
    ca: caCert
  }
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});
app.post('/flashcards', (req, res) => {
  const { question, answer } = req.body;
  const sql = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
  db.query(sql, [question, answer], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, question, answer });
  });
});
app.post('/flashcards/find', (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }

  const sql = 'SELECT id FROM flashcards WHERE question = ? AND answer = ?';
  db.query(sql, [question, answer], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    res.json({ id: result[0].id });
  });
});
app.put('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const sql = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
  db.query(sql, [question, answer, id], (err) => {
    if (err) throw err;
    res.status(200).json({ id, question, answer });
  });
});

app.delete('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM flashcards WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) throw err;
    res.status(204).send();
  });
});
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
