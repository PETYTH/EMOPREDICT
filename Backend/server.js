require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const emotionRoutes = require('./routes/emotionRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/emotions', emotionRoutes);

// Start the server
const PORT = process.env.PORT || 5000; // Lire la variable PORT ou utiliser 5000 par défaut
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
