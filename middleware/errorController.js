const errorController = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    title: err.name,
    status: err.statusCode,
    message: err.message,
    info: err.info,
  });
};

module.exports = { errorController };
