const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipe.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/", authMiddleware, recipeController.getAllRecipes);
router.post("/", authMiddleware, recipeController.createRecipe);
router.get("/:id", authMiddleware, recipeController.getRecipeById);
router.put("/:id", authMiddleware, recipeController.updateRecipe);

// 🔐 RBAC: только admin может удалять
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  recipeController.deleteRecipe
);

module.exports = router;