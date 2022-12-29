class BaseError extends Error {
  statusCode: number;
  isOperational = true;

  constructor(
    name: string,
    statusCode: number,
    isOperational: boolean,
    msg: string
  ) {
    super(msg);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

class HttpException extends BaseError {}
