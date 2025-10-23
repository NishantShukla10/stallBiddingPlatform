import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader";
import FormComponent from "../components/dashboard/FormComponent";

export default function UpdateStall() {
  const { id } = useParams();
  const [stall, setStall] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStallDetail = async () => {
      try {
        const response = await API.get(`/stalls/${id}`);
        const data = response?.data?.stall;
        setStall(data);
        toast.success("Stall loaded");
      } catch (error) {
        toast.error("Error fetching stall details");
        console.error("Error fetching stall details:", error);
      }
    };

    fetchStallDetail();
  }, [id]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await API.put(`/stalls/${id}`, data);
      toast.success("Stall updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating stall");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!stall) {
    return (
      <Loader />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="w-11/12 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Update Stall
          </h1>
          <p className="text-gray-600">
            Modify stall details and save your changes
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <FormComponent
            initialData={stall}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            mode="edit"
            onCancel={() => navigate('/dashboard')}
          />
        </div>
      </div>
    </div>
  );
}
