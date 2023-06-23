const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Create a new record (Create operation)
app.post('/api/records', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO records (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err, result) => {
    if (err) {
      console.error('Error creating record:', err);
      res.status(500).json({ error: 'Failed to create record' });
    } else {
      res.status(201).json({ message: 'Record created successfully' });
    }
  });
});

// Retrieve all records (Read operation)
app.get('/api/records', (req, res) => {
  const query = 'SELECT * FROM records';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving records:', err);
      res.status(500).json({ error: 'Failed to retrieve records' });
    } else {
      res.json(results);
    }
  });
});

// Update a record (Update operation)
app.put('/api/records/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const query = 'UPDATE records SET name = ?, email = ? WHERE id = ?';
  db.query(query, [name, email, id], (err, result) => {
    if (err) {
      console.error('Error updating record:', err);
      res.status(500).json({ error: 'Failed to update record' });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

// Delete a record (Delete operation)
app.delete('/api/records/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM records WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting record:', err);
      res.status(500).json({ error: 'Failed to delete record' });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});

// User registration
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).json({ error: 'Failed to register user' });
    } else {
      const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(query, [name, email, hash], (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          res.status(500).json({ error: 'Failed to register user' });
        } else {
          res.status(201).json({ message: 'User registered successfully' });
        }
      });
    }
  });
});

// User login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error retrieving user:', err);
      res.status(500).json({ error: 'Failed to login' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'User not found' });
    } else {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          res.status(500).json({ error: 'Failed to login' });
        } else if (!isMatch) {
          res.status(401).json({ error: 'Invalid password' });
        } else {
          const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key');
          res.json({ token });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
