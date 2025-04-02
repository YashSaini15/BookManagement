import React from "react";
import AppRouter from "./components/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { BooksProvider } from "./context/BooksContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App: React.FC = () => (
  <>
    <ToastContainer />
    <AuthProvider>
      <BooksProvider>
        <AppRouter />
      </BooksProvider>
    </AuthProvider>
  </>
);

export default App;
