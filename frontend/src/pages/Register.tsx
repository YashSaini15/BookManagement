import React, {
  useState,
  useContext,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "../styles/Auth.css";
import registerValidation from "../config/registerValidations";
import toastMessages, { toastStyle } from "../config/toastMessages";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = registerValidation.name.required;
    }

    if (!formData.email.trim()) {
      newErrors.email = registerValidation.email.required;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = registerValidation.email.valid;
    }

    if (!formData.password.trim()) {
      newErrors.password = registerValidation.password.required;
    } else if (formData.password.length < 6) {
      newErrors.password = registerValidation.password.valid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await register(formData);
      toast.success(toastMessages.register.success, toastStyle.success);
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message || toastMessages.register.error, toastStyle.error);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="app-title">Book Management App</h1>
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            ref={nameInputRef}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            ref={emailInputRef}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            ref={passwordInputRef}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
