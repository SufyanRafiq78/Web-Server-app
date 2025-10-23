// /server/models/data.js

let nextBookId = 4;
let nextRecipeId = 4;
let nextSensorId = 4;

const books = [
    { id: 1, title: "The Martian", author: "Andy Weir", year: 2011 },
    { id: 2, title: "Dune", author: "Frank Herbert", year: 1965 },
    { id: 3, title: "Foundation", author: "Isaac Asimov", year: 1951 },
];

const recipes = [
    { id: 1, name: "Basic Pancakes", prepTime: "15 min", servings: 4 },
    { id: 2, name: "Spaghetti Carbonara", prepTime: "25 min", servings: 2 },
    { id: 3, name: "Lemon Chicken", prepTime: "40 min", servings: 4 },
];

const sensorReadings = [
    { id: 1, location: "Attic", value: 75.2, timestamp: Date.now() - 3600000 },
    { id: 2, location: "Basement", value: 62.5, timestamp: Date.now() - 1800000 },
    { id: 3, location: "Living Room", value: 70.1, timestamp: Date.now() },
];

module.exports = {
    books, recipes, sensorReadings,
    getNewBookId: () => nextBookId++,
    getNewRecipeId: () => nextRecipeId++,
    getNewSensorId: () => nextSensorId++,
};