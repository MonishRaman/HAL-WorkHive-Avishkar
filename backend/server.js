const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const employeeRoutes = require('./routes/employeeRoutes'); // Correct path to routes
const seatRoutes = require('./routes/seatRoutes'); // Import the seatRoutes

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend running on port 5173
})); // Enable CORS for cross-origin requests

// Sequelize connection setup using environment variables
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST, // Set from .env
  port: process.env.DB_PORT, // Set from .env
  username: process.env.DB_USERNAME, // Set from .env
  password: process.env.DB_PASSWORD, // Set from .env
  database: process.env.DB_NAME, // Set from .env
  logging: false, // Optional, set to true for detailed SQL logging
});

// Check database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('Models synchronized with the database.');
  })
  .catch((error) => {
    console.error('Error syncing models with the database:', error);
  });

// Routes
app.use('/api/employees', employeeRoutes); // Use employee routes
app.use('/api', seatRoutes); // Use seat routes

// Set up the server to listen on the port defined in the environment variable or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
