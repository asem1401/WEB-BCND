// Role-based access control middleware
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    // auth.middleware должен уже добавить req.user
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};