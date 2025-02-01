const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const seats = await pool.query('SELECT * FROM seats');
    res.json(seats.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/book', async (req, res) => {
  const { seat_id, employee_id } = req.body;
  try {
    await pool.query('UPDATE seats SET status = $1, employee_id = $2 WHERE id = $3', ['Booked', employee_id, seat_id]);
    res.json({ message: 'Seat booked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;