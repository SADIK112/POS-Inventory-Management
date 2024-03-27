export default (req, res, next) => {
  res.respond = (statusCode, data, message) => {
    res.status(statusCode).json({
      data,
      message
    });
  };
  next();
};
