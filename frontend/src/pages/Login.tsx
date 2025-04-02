import React, { useState, useContext, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import loginValidation from "../config/loginValidations";
import toastMessages,{ toastStyle } from "../config/toastMessages";
import "../styles/Auth.css";

interface ValidationErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const validate = (): boolean => {
    let tempErrors: ValidationErrors = {};

    if (!credentials.email.trim()) {
      tempErrors.email = loginValidation.email.required;
    } else if (!emailRegex.test(credentials.email)) {
      tempErrors.email = loginValidation.email.valid;
    }

    if (!credentials.password.trim()) {
      tempErrors.password = loginValidation.password.required;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      await login(credentials);
      toast.success(toastMessages.login.success, toastStyle.success);
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || toastMessages.login.error, toastStyle.error);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="app-title">Book Management App</h1>
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            ref={emailInputRef} 
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            ref={passwordInputRef}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <p>
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
