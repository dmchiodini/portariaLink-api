import { ApiResponse } from './response.interface';

export function buildResponse<T>(
  status: number,
  message: string,
  data: T,
  error?: any,
): ApiResponse<T> {
  return {
    status,
    success: !error,
    message,
    data,
    error: error || null,
  };
}
