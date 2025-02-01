const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const meetings = await pool.query('SELECT * FROM meetings');
    res.json(meetings.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/book', async (req, res) => {
  const { room_id, employee_id, start_time, end_time } = req.body;
  try {
    await pool.query('INSERT INTO meetings (room_id, employee_id, start_time, end_time) VALUES ($1, $2, $3, $4)', [room_id, employee_id, start_time, end_time]);
    res.json({ message: 'Meeting room booked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;