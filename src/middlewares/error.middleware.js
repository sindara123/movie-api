const errorHandler = (err, req, res, next) => {
  //log in dev mode
  console.log(err.errors);

  //response to client
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error.",
    code: err.statusCode,
  });
};

export default errorHandler;
