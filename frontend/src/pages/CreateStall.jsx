// src/pages/CreateStall.jsx
import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FormComponent from "../components/dashboard/FormComponent";

export default function CreateStall() {
  const [form, setForm] = useState({ name: "", description: "", basePrice: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await API.post("/stalls", data);
      toast.success("Stall created successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating stall");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="w-11/12 max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Stall</h1>
          <p className="text-gray-600">Add a new stall to your inventory</p>
        </div>


        <div className="bg-white rounded-2xl shadow-xl p-8">


          <FormComponent
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            mode="create"
            onCancel={() => navigate('/dashboard')}
          />
        </div>
      </div>
    </div>
  );
}