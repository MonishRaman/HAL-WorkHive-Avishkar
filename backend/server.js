// server.js
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Routes
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employees', employeeRoutes);

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database connected and models synchronized.');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
