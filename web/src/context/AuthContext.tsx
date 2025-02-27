import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { AuthResponse, LoginRequest, RegisterRequest } from "../api/types";
import { POST } from "../api/client";

export const AUTH_COOKIE_KEY = "auth-cookie";

interface AuthContextType {
  data: AuthResponse | null;
  login: (input: LoginRequest) => Promise<void>;
  register: (input: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AuthResponse | null>(() => {
    try {
      const cookieData = Cookies.get(AUTH_COOKIE_KEY);
      return cookieData ? (JSON.parse(cookieData) as AuthResponse) : null;
    } catch (error) {
      console.error("Failed to parse auth cookie:", error);
      return null;
    }
  });

  const login = async (input: LoginRequest) => {
    // Make API call
    const res = await POST("/api/login", {
      body: input,
    });
    if (res.response.ok && res.data) {
      Cookies.set(AUTH_COOKIE_KEY, JSON.stringify(res.data));
      setData(res.data);
    } else {
      throw new Error(`Failed to login: ${res.error}`);
    }
  };

  const register = async (input: RegisterRequest) => {
    // Make API call
    const res = await POST("/api/register", {
      body: input,
    });
    if (res.response.ok && res.data) {
      Cookies.set(AUTH_COOKIE_KEY, JSON.stringify(res.data));
      setData(res.data);
    } else {
      throw new Error(`Failed to register: ${res.error}`);
    }
  };

  const logout = async () => {
    // Make API call
    const res = await POST("/api/logout");

    if (res.response.ok) {
      Cookies.remove(AUTH_COOKIE_KEY);
      setData(null);
    } else {
      throw new Error(`Failed to log out: ${res.error}`);
    }
  };

  return (
    <AuthContext.Provider value={{ data, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
