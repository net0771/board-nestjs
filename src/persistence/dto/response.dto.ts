export class ResponseDto {
  constructor(statusCode: number, data?: any, message?: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }

  statusCode: number;
  data: any;
  message: string;
}
