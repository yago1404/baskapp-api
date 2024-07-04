export class ResponseModel<T> {
  message: string;
  statusCode: number;
  data: T;

  constructor(message: string, statusCode: number, data: T) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }

  static ok<T>(data: T): ResponseModel<T> {
    return new ResponseModel<T>('Success', 200, data);
  }
}
