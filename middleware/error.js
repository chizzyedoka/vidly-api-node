module.exports = function (err, req, res, next) {
  // Log the exception
  // 500- Internal server error
  res.status(500).send("Something failed.");
  next();
};
