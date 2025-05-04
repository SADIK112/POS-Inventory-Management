export default class BaseError extends Error {
  constructor(message, errors, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
