export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;

  static ok<T>(message: string, data?: T): ApiResponse<T> {
    return { success: true, message, data };
  }

  static fail(message: string, error?: string): ApiResponse<null> {
    return { success: false, message, error };
  }
}
