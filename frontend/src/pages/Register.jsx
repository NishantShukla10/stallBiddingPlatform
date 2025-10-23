// src/pages/Register.jsx
import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    secretKey: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post("/auth/register", form);
      toast.success('Registered successfully')
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-blue-100 text-sm mt-2">
            Join the stall bidding platform
          </p>
        </div>

        <div className="px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Register As
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex justify-center items-center px-4 py-2.5 border-2 rounded-lg cursor-pointer transition-all ${
                    form.role === "student"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={form.role === "student"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-medium text-sm">Student</span>
                </label>

                <label
                  className={`flex justify-center items-center px-4 py-2.5 border-2 rounded-lg cursor-pointer transition-all ${
                    form.role === "principal"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="principal"
                    checked={form.role === "principal"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-medium text-sm">Principal</span>
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {form.role === "principal" && (
              <div className="transition-all duration-200">
                <label
                  htmlFor="secretKey"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Secret Key
                </label>
                <input
                  type="text"
                  id="secretKey"
                  name="secretKey"
                  value={form.secretKey}
                  onChange={handleChange}
                  placeholder="Enter secret key"
                  required={form.role === "principal"}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full hover:cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-8 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:cursor-pointer font-semibold hover:text-blue-700 transition-colors"
              >
                Login here
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mb-6">
          By registering, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
