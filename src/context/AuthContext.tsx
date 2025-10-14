import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

import { AuthContext } from "../hooks/useAuth";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const scheduleAutoLogout = (token: string, logout: () => void) => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const expiresInMs = decoded.exp * 1000 - Date.now();

      if (expiresInMs > 0) {
        setTimeout(() => {
          logout();
        }, expiresInMs);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }

  useEffect(() => {
    if (token) {
      scheduleAutoLogout(token, logout);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};