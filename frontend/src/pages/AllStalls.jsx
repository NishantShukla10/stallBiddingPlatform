import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import StallsComponent from "../components/stalls/StallsComponent";
import Loader from "../components/common/Loader";

export default function AllStalls() {
  const [stalls, setStalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStalls = async () => {
      try {
        const res = await API.get("/stalls");
        setStalls(res.data.stalls);
        toast.success("Stalls fetched!")
      } catch (error) {
        toast.error("Error fetching stalls: ", error)
        console.error("Error fetching stalls:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStalls();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Available <span className="text-blue-600">Stalls</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto ">
            Browse and place bids on available stalls for your school events
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full pl-[200px]"></div>
        </div>

        <StallsComponent 
          stalls={stalls} 
        />
      </div>

    </div>
  );
}