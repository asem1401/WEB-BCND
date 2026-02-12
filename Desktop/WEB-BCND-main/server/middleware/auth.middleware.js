const jwt = require("jsonwebtoken");
const User = require("../models/User");


module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("role");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: decoded.id,
      role: user.role,
    };

    // ✅ ВОТ ТУТ
    console.log("AUTH USER:", req.user);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};