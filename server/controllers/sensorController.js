// /server/controllers/sensorController.js

const db = require('../models');
const SensorReading = db.SensorReading; // Access the SensorReading model

// L I S T (GET /api/sensors)
exports.listSensors = async (req, res) => {
    try {
        // Fetch all sensor readings from the database
        const readings = await SensorReading.findAll();
        res.json(readings);
    } catch (error) {
        console.error("Error listing sensor readings:", error);
        res.status(500).json({ message: 'Error retrieving sensor reading list', error: error.message });
    }
};

// D I S P L A Y (GET /api/sensors/:id)
exports.displaySensor = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // Find a single sensor reading by its primary key (ID)
        const reading = await SensorReading.findByPk(id);

        if (reading) {
            res.json(reading);
        } else {
            res.status(404).json({ message: 'Sensor reading not found' });
        }
    } catch (error) {
        console.error("Error displaying sensor reading:", error);
        res.status(500).json({ message: 'Error retrieving sensor reading details', error: error.message });
    }
};

// C R E A T E (POST /api/sensors)
exports.createSensor = async (req, res) => {
    const { location, value } = req.body; // Timestamp is often auto-generated, but can be accepted too
    
    // Basic validation
    if (!location || value === undefined || value === null) {
        return res.status(400).json({ message: 'Missing required fields: location or value' });
    }

    try {
        // Insert a new sensor reading record into the database
        const newReading = await SensorReading.create({
            location,
            value: parseFloat(value), // Ensure value is stored as a float
            timestamp: new Date() // Automatically set the timestamp upon creation
        });
        res.status(201).json(newReading);
    } catch (error) {
        console.error("Error creating sensor reading:", error);
        res.status(500).json({ message: 'Error creating new sensor reading', error: error.message });
    }
};