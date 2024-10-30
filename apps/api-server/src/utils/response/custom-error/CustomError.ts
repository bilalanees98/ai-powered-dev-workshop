import { ErrorResponse } from './types';

export class CustomError extends Error {
  private httpStatusCode: number;
  private errorCode: number | null;

  constructor(httpStatusCode: number, message: string, errorCode: number | null = null) {
    super(message);

    this.name = this.constructor.name;

    this.httpStatusCode = httpStatusCode;
    this.errorCode = errorCode;
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  get JSON(): ErrorResponse {
    return {
      errorMessage: this.message,
      errorCode: this.errorCode,
      stack: this.stack,
    };
  }
}
