import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BookList from "../pages/BookList";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <BookList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditBook />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
