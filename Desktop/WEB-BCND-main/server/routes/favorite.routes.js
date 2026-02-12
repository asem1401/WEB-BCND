const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const favoriteController = require("../controllers/favorite.controller");

router.post("/", auth, favoriteController.addFavorite);
router.get("/", auth, favoriteController.getFavorites);
router.delete("/:id", auth, favoriteController.deleteFavorite);

module.exports = router;