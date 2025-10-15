"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdArrowBack,
} from "react-icons/md";

const Login = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [step, setStep] = useState("login"); // "login" | "forgot" | "otp" | "reset"
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputRefs = useRef([]);
  const router = useRouter();

  // Handle input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    router.push("/pages/dashboard");
    onLoginSuccess(); // Notify parent about successful login
  };

  const handleForgotPassword = () => setStep("forgot");

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log("Send reset link to:", resetEmail);
    setStep("otp");
  };

  // OTP Handling
  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    // verify OTP logic here
    setStep("reset");
  };

  const handleBack = () => {
    if (step === "otp") setStep("forgot");
    else setStep("login");
    setOtp(["", "", "", "", "", ""]);
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("New password:", newPassword);
    setStep("login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      {/* Step 1 - Login */}
      {step === "login" && (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4">
              <span className="text-white text-2xl font-bold">GM</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500">Sign in to GoMedGo Admin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                  placeholder="Enter your user ID"
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <MdLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-700">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-medium text-green-600 hover:text-green-500"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition"
            >
              Sign In
            </button>
          </form>
        </div>
      )}

      {/* Step 2 - Forgot Password */}
      {step === "forgot" && (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <MdArrowBack /> Back to Login
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4">
              <MdLock className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Reset Password
            </h1>
            <p className="text-gray-500 text-sm">
              Enter your email to receive a verification code.
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition"
            >
              Send Verification Code
            </button>
          </form>
        </div>
      )}

      {/* Step 3 - OTP */}
      {step === "otp" && (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <MdArrowBack /> Back
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4">
              <MdLock className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Enter Verification Code
            </h1>
            <p className="text-gray-500 text-sm">
              The verification code has been sent to{" "}
              <span className="font-semibold text-gray-700">{resetEmail}</span>.
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                className="w-10 h-10 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            ))}
          </div>

          <button
            onClick={handleOtpSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition"
          >
            Verify Code
          </button>

          <div className="mt-6 text-center text-xs text-gray-500">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Resend
            </button>{" "}
            after 60 seconds
          </div>
        </div>
      )}

      {/* Step 4 - Reset Password */}
      {step === "reset" && (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <MdArrowBack /> Back
          </button>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mb-4">
              <MdLock className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Reset Password
            </h1>
            <p className="text-gray-500 text-sm">
              Enter your new password below.
            </p>
          </div>

          <form onSubmit={handleNewPasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                className="w-full pl-3 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
                className="w-full pl-3 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition"
            >
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
