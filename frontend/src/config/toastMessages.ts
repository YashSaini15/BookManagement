import { ToastOptions } from "react-toastify";

const toastMessages = {
  logout: {
    success: "Logged out successfully!",
    error: "Logout failed. Please try again.",
  },
  addBook: {
    success: "Book added successfully!",
    error: "Something went wrong. Please try again.",
  },
  deleteBook: {
    success: "Book deleted successfully!",
    error: "Something went wrong. Please try again.",
  },
  editBook: {
    success: "Book edited successfully!",
    error: "Something went wrong. Please try again.",
  },
  login: {
    success: "Login successful!",
    error: "Login failed. Please try again.",
  },
  register: {
    success: "Registered successfully!",
    error: "Registration failed. Please try again.",
  },
};

export default toastMessages;


export const toastStyle: Record<"success" | "error", ToastOptions> = {
  success: { position: "top-right", autoClose: 2000 },
  error: { position: "top-right", autoClose: 3000 },
};
