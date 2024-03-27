import BaseError from '../common/Errors/BaseError.js';

export default class NotFoundException extends BaseError {
  constructor (message, errors = []) {
    super(message, errors, 404);
  }
}
