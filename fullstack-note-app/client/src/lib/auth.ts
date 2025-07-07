import { apiRequest } from "./queryClient";
import { LoginRequest, SignupRequest, OtpVerificationRequest } from "@shared/schema";

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
  };
}

export const authApi = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiRequest("POST", "/api/auth/login", data);
    const result = await response.json();
    
    if (result.token) {
      localStorage.setItem("token", result.token);
    }
    
    return result;
  },

  async signup(data: SignupRequest): Promise<{ email: string }> {
    const response = await apiRequest("POST", "/api/auth/signup", data);
    return await response.json();
  },

  async verifyOtp(data: OtpVerificationRequest): Promise<AuthResponse> {
    const response = await apiRequest("POST", "/api/auth/verify-otp", data);
    const result = await response.json();
    
    if (result.token) {
      localStorage.setItem("token", result.token);
    }
    
    return result;
  },

  async resendOtp(email: string): Promise<void> {
    await apiRequest("POST", "/api/auth/resend-otp", { email });
  },

  async me(): Promise<AuthResponse["user"]> {
    const response = await apiRequest("GET", "/api/auth/me");
    return await response.json();
  },

  logout(): void {
    localStorage.removeItem("token");
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  }
};

export function getAuthHeaders(): Record<string, string> {
  const token = authApi.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
