export {};
declare global {
  namespace Express {
    export interface Request {
      rawBody: Buffer;
    }
    export interface Response {
      customSuccess(httpStatusCode: number, message: string, data?: any): Response;
    }
  }
}
