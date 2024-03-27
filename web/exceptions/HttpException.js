import BaseError from '../common/Errors/BaseError.js';

export default class HttpException extends BaseError {
  constructor (message, errors = [], statusCode = 500) {
    super(message, errors, statusCode);
  }
}
