module.exports = function (req, res, next) {
  // use after authorization middleware
  if (!req.user.isAdmin) return res.status(403).send("Access denied"); // 403 forbidden 401 Unauthorized
  next();
};
