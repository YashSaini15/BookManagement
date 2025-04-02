import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/register`,
    userData
  );
  return response.data;
};

export const getUserProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};
