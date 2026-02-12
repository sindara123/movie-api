class AppError extends Error {
  constructor(message, statusCode = 400, errors = null) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

const err = new AppError("Wrong", 500, ["error", "error"]);
console.log(err.errors);
console.log(err.message);
console.log(err.statusCode);
