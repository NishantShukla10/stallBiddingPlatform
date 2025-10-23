import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import StallList from "../components/dashboard/StallList";
import DeleteModal from "../components/dashboard/DeleteModal";
import CreateStallBtn from "../components/common/CreateStallBtn";
import Loader from "../components/common/Loader";

export default function PrincipalDashboard() {
  const [stalls, setStalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null }); // 👈 new modal state
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/stalls");
        setStalls(res.data.stalls.filter((s) => s.createdBy));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const markSold = async (id) => {
    try {
      await API.patch(`/stalls/${id}/sold`);
      toast.success("Marked as sold");
      const res = await API.get("/stalls");
      setStalls(res.data.stalls);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const edit = (id) => navigate(`/stall/edit/${id}`);

  const confirmDelete = (id) => setDeleteModal({ open: true, id }); // 👈 open modal

  const handleDelete = async () => {
    try {
      await API.delete(`/stalls/${deleteModal.id}`);
      toast.success("Deleted");
      setStalls(stalls.filter((s) => s._id !== deleteModal.id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setDeleteModal({ open: false, id: null });
    }
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="w-11/12 max-w-6xl mx-auto">
      
        <div className="bg-white rounded-xl shadow-lg p-6 mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Stalls</h1>
            </div>

            <CreateStallBtn 
              path={"/create-stall"}
              text={"Create New Stall"}
            />
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <p className="text-gray-500 font-medium mb-1 text-3xl">Total Stalls: {stalls.length}</p>
          <p className="text-gray-500 font-medium mb-1 text-3xl">
            Available: {stalls.filter((s) => !s.isSold).length}
          </p>
          <p className="text-gray-500 font-medium mb-1 text-3xl">
            Sold: {stalls.filter((s) => s.isSold).length}
          </p>
        </div>


        <StallList 
          stalls={stalls} 
          markSold={markSold}
          edit={edit}
          confirmDelete={confirmDelete}
        />
      </div>

      {deleteModal.open && (
        <DeleteModal 
          setDeleteModal={setDeleteModal} 
          handleDelete={handleDelete}
        />
      )}


    </div>
  );
}
