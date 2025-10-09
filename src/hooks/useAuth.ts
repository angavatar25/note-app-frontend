import { useMutation } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { LoginApi, RegisterApi, type LoginInput, type RegisterInput } from "../api/auth";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const useLogin = ()  => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (input: LoginInput) => LoginApi(input),
    onSuccess: (data) => {
      if (data.token) {
        login(data.token);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  })
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (input: RegisterInput) => RegisterApi(input),
    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
    onError: (error) => {
      console.error("Registration failed:", error.message);
    },
  })
};