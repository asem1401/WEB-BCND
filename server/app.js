const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const recipeRoutes = require("./routes/recipe.routes");
const favoriteRoutes = require("./routes/favorite.routes");
const emailRoutes = require("./routes/email.routes"); // 👈 ДОБАВИЛИ

const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/email", emailRoutes); // 👈 ДОБАВИЛИ

app.get("/", (req, res) => {
  res.send("Mini Recipe Book API is running");
});

app.use(errorMiddleware);

module.exports = app;