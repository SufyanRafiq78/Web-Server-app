// /server/controllers/recipeController.js

const { recipes, getNewRecipeId } = require('../models/data');

// L I S T (GET /api/recipes)
exports.listRecipes = (req, res) => {
    res.json(recipes);
};

// D I S P L A Y (GET /api/recipes/:id)
exports.displayRecipe = (req, res) => {
    const id = parseInt(req.params.id);
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
};

// C R E A T E (POST /api/recipes)
exports.createRecipe = (req, res) => {
    const { name, prepTime, servings } = req.body;
    if (!name || !prepTime || !servings) {
        return res.status(400).json({ message: 'Missing required fields: name, prepTime, and servings' });
    }

    const newRecipe = {
        id: getNewRecipeId(),
        name,
        prepTime,
        // Assuming servings is sent as a string and we just store it
        servings: servings
    };
    recipes.push(newRecipe);
    res.status(201).json(newRecipe);
};