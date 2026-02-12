const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    recipeTitle: String,
    recipeImage: String,
    recipeDesc: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);