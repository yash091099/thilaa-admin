import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Thilaa-Logo.svg";
import UserInput from "./UserInput";
import PrimaryButton from "./PrimaryButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAdmin } from "../context/services/login";
import { Loader } from './loader';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await loginAdmin({ email, password });
        if (response.data.success) {
          localStorage.clear();
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('_u', JSON.stringify(response.data.user_details));
          toast.success(response.data.message, { position: "top-right" });
          navigate("/dashboard");
        } else {
          toast.error(response.data.message || "Login failed", { position: "top-right" });
        }
      } catch (error) {
        const message = error.response?.data?.message || "An error occurred during login";
        toast.error(message, { position: "top-right" });
      }
      setLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }

    if (errors[name]) {
      // Update the error state
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }
  };

  return (
    <div className="flex flex-col gap-[2rem] max-w-[37.5625rem] w-full p-4">
      {loading && <Loader />}
      <img className="w-[4.6875rem] mb-[1rem] mx-auto" src={logo} alt="Thilaa logo" />
      <h1 className="text-text text-[2rem] font-[600]">Login</h1>
      <div className="flex flex-col gap-[1rem]">
        <UserInput label="Email" type="email" value={email} onChange={value => handleInputChange("email", value)} error={errors.email} placeholder="Enter your email" />
        <UserInput label="Password" type="password" value={password} onChange={value => handleInputChange("password", value)} error={errors.password} placeholder="********" />
      </div>
      <PrimaryButton label={loading ? "Loading..." : "Login"} action={handleSubmit} />
      {/* <ToastContainer autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}
    </div>
  );
}
