const Favorite = require("../models/Favorite");

exports.addFavorite = async (req, res) => {
  const favorite = await Favorite.create({
    user: req.user.id,
    ...req.body
  });

  res.status(201).json(favorite);
};

exports.getFavorites = async (req, res) => {
  const favorites = await Favorite.find({ user: req.user.id });
  res.json(favorites);
};

exports.deleteFavorite = async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);
  res.json({ message: "Favorite removed" });
};