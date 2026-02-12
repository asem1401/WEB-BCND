module.exports = (...allowedRoles) => {
  return (req, res, next) => {

    console.log("ADMIN CHECK:", req.user);

    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};