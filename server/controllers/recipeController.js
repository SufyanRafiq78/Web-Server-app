// /server/controllers/recipeController.js

const db = require('../models');
const Recipe = db.Recipe; // Access the Recipe model

// L I S T (GET /api/recipes)
exports.listRecipes = async (req, res) => {
    try {
        // Fetch all recipes from the database
        const recipes = await Recipe.findAll();
        res.json(recipes);
    } catch (error) {
        console.error("Error listing recipes:", error);
        res.status(500).json({ message: 'Error retrieving recipe list', error: error.message });
    }
};

// D I S P L A Y (GET /api/recipes/:id)
exports.displayRecipe = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // Find a single recipe by its primary key (ID)
        const recipe = await Recipe.findByPk(id);

        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        console.error("Error displaying recipe:", error);
        res.status(500).json({ message: 'Error retrieving recipe details', error: error.message });
    }
};

// C R E A T E (POST /api/recipes)
exports.createRecipe = async (req, res) => {
    const { name, prepTime, servings } = req.body;
    
    // Basic validation
    if (!name || !prepTime || !servings) {
        return res.status(400).json({ message: 'Missing required fields: name, prepTime, or servings' });
    }

    try {
        // Insert a new recipe record into the database
        const newRecipe = await Recipe.create({
            name,
            prepTime,
            servings: parseInt(servings) // Ensure servings is an integer
        });
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error("Error creating recipe:", error);
        res.status(500).json({ message: 'Error creating new recipe', error: error.message });
    }
};