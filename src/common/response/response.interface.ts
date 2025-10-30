export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export interface DeleteResponse {
  message: string;
}
