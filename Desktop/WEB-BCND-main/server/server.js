require("dotenv").config(); 

const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5003;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});