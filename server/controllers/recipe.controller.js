const Recipe = require("../models/Recipe");


exports.getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};


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

    await recipe.deleteOne(); 

    res.json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.error("DELETE RECIPE ERROR:", error);
    next(error); 
  }
};