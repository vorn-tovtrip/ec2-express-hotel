class CustomError extends Error {
  public statusCode;
  public customMessage;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.customMessage = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
