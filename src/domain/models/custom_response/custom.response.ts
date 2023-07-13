export class CustomResponse {
    statusCode: number;
    message: string;
    data?: {};

    constructor(statusCode: number, message: string, data?: {}) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}