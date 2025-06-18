const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // your MySQL username
  password: 'cse123',           // your MySQL password (default is blank for XAMPP)
  database: 'event_booking'
});

db.connect(err => {
  if (err) throw err;
  console.log('🟢 MySQL Connected!');
});

// Booking API Endpoint
app.post('/book', (req, res) => {
  const { name, email, phone, event, seats, payment } = req.body;
  const sql = 'INSERT INTO bookings (name, email, phone, event, seats, payment_method) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, email, phone, event, seats, payment];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Error saving booking:', err);
      return res.status(500).json({ message: 'Booking failed' });
    }
    res.json({ message: 'Booking successful', id: result.insertId });
  });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
