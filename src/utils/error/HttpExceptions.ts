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
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

class HttpException extends BaseError {
  constructor(name: string = 'HttpException', statusCode: number, msg: string) {
    super(name, statusCode, true, msg);
  }
}

class BadRequestException extends HttpException {
  constructor(msg: string) {
    super('BadRequestException', 400, msg);
  }
}

// Todo: Add Other HTTP Errors

export { HttpException, BadRequestException };
