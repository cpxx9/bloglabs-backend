const errorController = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    title: err.name,
    status: err.statusCode || err.code,
    message: err.code
      ? err.message.substring(err.message.indexOf('(\n') + 2)
      : err.message,
    info: err.info,
  });
};

module.exports = { errorController };
