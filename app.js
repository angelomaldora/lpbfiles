const express = require('express');
const { Client } = require('pg');

const app = express();
const PORT = 3000;

// Database connection details
const client = new Client({
  host: 'ep-blue-meadow-a2cqxbbt.eu-central-1.pg.koyeb.app',
  user: 'koyeb-adm',
  password: 'q7xhiOLdFZR9',
  database: 'koyebdb',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// Connect to the database
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));

// API endpoint to fetch data
app.get('/api/users', async (req, res) => {
  try {
    const query = 'SELECT * FROM public."user_account" LIMIT 50';
    const result = await client.query(query);

    // Send the result as an array
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
