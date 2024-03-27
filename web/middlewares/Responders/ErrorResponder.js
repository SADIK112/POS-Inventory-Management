export default (err, req, res, next) => {
  console.dir({ err, }, { depth: null, });

  const error = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal server Error',
    errors: err.errors || [],
  };

  console.error(error);
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
  });
};
