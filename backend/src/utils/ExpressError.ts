export default class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super();
        // make sure the new object get the Error prototype
        Object.setPrototypeOf(this, CustomError.prototype);
        this.message = message;
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}
