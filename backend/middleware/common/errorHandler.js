const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested content was not found!"));
}

// default error handler
function errorHandler(err, req, res, next) {
  res.locals.error = err.message;
  res.status(err.status || 500);
  res.json(res.locals.error);
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
