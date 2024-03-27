import BaseError from '../common/Errors/BaseError.js';

export default class UnprocessableEntityException extends BaseError {
  constructor (message, errors = []) {
    super(message, errors, 422);
  }
}
