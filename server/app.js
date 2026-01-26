const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const recipeRoutes = require("./routes/recipe.routes");
const favoriteRoutes = require("./routes/favorite.routes");

const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Mini Recipe Book API is running");
});

// error handler — ВСЕГДА ПОСЛЕДНИМ
app.use(errorMiddleware);

module.exports = app;