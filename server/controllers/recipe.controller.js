const Recipe = require("../models/Recipe");

// =======================
// GET ALL RECIPES
// =======================
exports.getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

// =======================
// GET RECIPE BY ID
// =======================
exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

// =======================
// CREATE RECIPE
// =======================
exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
    });

    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

// =======================
// UPDATE RECIPE
// =======================
exports.updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

// =======================
// DELETE RECIPE (ADMIN)
// =======================
exports.deleteRecipe = async (req, res, next) => {
  try {
    console.log("DELETE REQUEST BY:", req.user); // 👈 DEBUG
    console.log("DELETE ID:", req.params.id);

    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    await recipe.deleteOne(); // ✅ безопасно, без socket hang up

    res.json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.error("DELETE RECIPE ERROR:", error);
    next(error); // ❗ обязательно
  }
};