export interface Response {
  message?: string;
  errors?: Record<string, string> | null;
  success: boolean;
  data: any;
}

export interface AuthRespose extends Response {
  data: { accessToken: string, refreshToken: string } | null
}