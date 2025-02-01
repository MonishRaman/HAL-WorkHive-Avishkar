const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const employees = await pool.query('SELECT * FROM employees');
    res.json(employees.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;