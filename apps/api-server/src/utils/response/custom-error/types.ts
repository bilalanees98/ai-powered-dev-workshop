export type ErrorResponse = {
  errorMessage: string;
  errorCode: number | null;
  stack?: string;
};
