// routes/employeeRoutes.js
const express = require('express');
const { Employee } = require('../models');
const router = express.Router();

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new employee
router.post('/', async (req, res) => {
  const { firstName, lastName, email, role, departmentId, seatId } = req.body;
  try {
    const newEmployee = await Employee.create({
      firstName,
      lastName,
      email,
      role,
      departmentId,
      seatId,
    });
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
