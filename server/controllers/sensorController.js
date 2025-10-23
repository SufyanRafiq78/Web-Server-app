// /server/controllers/sensorController.js

const { sensorReadings, getNewSensorId } = require('../models/data');

// L I S T (GET /api/sensors)
exports.listSensors = (req, res) => {
    res.json(sensorReadings);
};

// D I S P L A Y (GET /api/sensors/:id)
exports.displaySensor = (req, res) => {
    const id = parseInt(req.params.id);
    const sensor = sensorReadings.find(s => s.id === id);
    if (sensor) {
        res.json(sensor);
    } else {
        res.status(404).json({ message: 'Sensor reading not found' });
    }
};

// C R E A T E (POST /api/sensors)
exports.createSensor = (req, res) => {
    // Note: We'll automatically set the timestamp on the server side
    const { location, value } = req.body;
    
    // Convert value to a number if it's sent as a string
    const numericValue = parseFloat(value); 

    if (!location || isNaN(numericValue)) {
        return res.status(400).json({ message: 'Missing required fields or invalid value' });
    }

    const newSensor = {
        id: getNewSensorId(),
        location,
        value: numericValue,
        timestamp: Date.now() // Record the time the server received it
    };
    sensorReadings.push(newSensor);
    res.status(201).json(newSensor);
};