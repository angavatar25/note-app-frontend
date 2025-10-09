export interface LoginInput {
  email: string;
  passwords: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  passwords: string;
}

const BASE_URL = 'http://localhost:5004/auth';

export const LoginApi = async (input: LoginInput) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  localStorage.setItem("token", data.token);

  return data;
}

export const RegisterApi = async (input: RegisterInput) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Registration failed");
  }

  return data;
};

export const Logout = () => {
  localStorage.removeItem("token");
}