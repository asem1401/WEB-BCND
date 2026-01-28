const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipe.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/", recipeController.getAllRecipes);
router.get("/:id", recipeController.getRecipeById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  recipeController.createRecipe
);

router.patch(
  "/:id",
  authMiddleware,
  recipeController.updateRecipe
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  recipeController.deleteRecipe
);

module.exports = router;