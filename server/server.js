// /server/server.js
const express = require('express');
const cors = require('cors'); // Essential for connecting React (on one port) to Express (on another)
const bookController = require('./controllers/bookController');
const recipeController = require('./controllers/recipeController');
const sensorController = require('./controllers/sensorController'); // Assuming you create this

const app = express();
const PORT = 3000;

const db = require('./models');

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse form submissions

// --- BOOK ROUTES ---
// List objects
app.get('/api/books', bookController.listBooks);
// Display data (single object)
app.get('/api/books/:id', bookController.displayBook);
// Create new object
app.post('/api/books', bookController.createBook);

// --- RECIPE ROUTES ---
// List objects
app.get('/api/recipes', recipeController.listRecipes);
// Display data (single object)
app.get('/api/recipes/:id', recipeController.displayRecipe);
// Create new object
app.post('/api/recipes', recipeController.createRecipe);

// --- SENSOR ROUTES ---
// List objects
app.get('/api/sensors', sensorController.listSensors);
// Display data (single object)
app.get('/api/sensors/:id', sensorController.displaySensor);
// Create new object
app.post('/api/sensors', sensorController.createSensor);


db.sequelize.sync({ alter: false }) // 'alter: false' is used because we're using migrations to manage schema
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Database connected and models synced.`);
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database or sync models:', err);
    });