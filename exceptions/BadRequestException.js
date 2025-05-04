import BaseError from '../common/Errors/BaseError.js';

export default class BadRequestException extends BaseError {
  constructor (message, errors = []) {
    super(message, errors, 400);
  }
}
