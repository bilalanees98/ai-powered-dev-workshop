interface ApiError {
  code: number;
  message: string;
}
export const API_ERRORS = {
  MISSING_PARAMETERS: { code: 1, message: 'required parameters are missing' },
  INCORRECT_PARAM_TYPE: { code: 2, message: 'type of parameter is incorrect' },
  INVALID_PARAMS: { code: 3, message: 'passed params are invalid' },
  UNKNOWN_USER_ROLE: { code: 4, message: 'unknown user role specified' },
  USER_ALREADY_EXISTS: { code: 5, message: 'user already exists' },
  INCORRECT_CREDENTIALS: { code: 6, message: 'incorrect credentials' },
  AUTH_FAIL: { code: 7, message: 'authentication failed' },
  USER_NOT_AUTHORIZED: { code: 8, message: 'user not authorized' },
  WALLET_NOT_FOUND: { code: 9, message: 'wallet not found' },
  WALLET_NOT_AVAILABLE: { code: 10, message: 'wallet not available' },
  TRANSACTION_NOT_FOUND: { code: 11, message: 'transaction not found' },
  INTERNAL_SERVER_ERROR: { code: 12, message: 'internal server error' },
  INVALID_EMAIL: { code: 13, message: 'invalid email' },
  TOKEN_INVALID: { code: 14, message: 'invalid token' },
  TOKEN_ALREADY_USED: { code: 15, message: 'token already used' },
  TOKEN_EXPIRED: { code: 16, message: 'token expired' },
};

export function errorMessage(functionName: string, error: ApiError | string) {
  const errorMsg = typeof error === 'string' ? error : error.message;
  return `${functionName}: ${errorMsg.toLowerCase()}`;
}

//keeping this for now, will have to be deleted once we completely shift to errorMessage and ERRORS
export const ERROR_CODES = {
  MISSING_PARAMETER: 1,
  INCORRECT_PARAM_TYPE: 2,
};
