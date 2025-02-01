// routes/seatRoutes.js
const express = require('express');
const router = express.Router();

// Example of a static seat layout data (could be fetched from DB)
const seats = [
  { id: 1, x: 50, y: 50, department: "Engineering", isBooked: false },
  { id: 2, x: 150, y: 50, department: "Marketing", isBooked: false },
  { id: 3, x: 250, y: 50, department: "HR", isBooked: false },
  { id: 4, x: 50, y: 150, department: "Engineering", isBooked: true },
  { id: 5, x: 150, y: 150, department: "Marketing", isBooked: false },
  { id: 6, x: 250, y: 150, department: "HR", isBooked: false }
];

// API endpoint to get seats
router.get('/seats', (req, res) => {
  res.json(seats);
});

module.exports = router;
