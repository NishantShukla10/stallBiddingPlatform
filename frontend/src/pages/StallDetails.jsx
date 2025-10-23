// src/pages/StallDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { getRole } from "../utils/auth";
import { Store, DollarSign, TrendingUp, CheckCircle, XCircle, ArrowLeft, Clock, User } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader";

export default function StallDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stall, setStall] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const role = getRole();

  useEffect(() => {
    const fetch = async () => {
      try {
        const [stallRes, bidsRes] = await Promise.all([
          API.get(`/stalls/${id}`),
          API.get(`/bids/stall/${id}`),
        ]);
        setStall(stallRes.data.stall);
        setBids(bidsRes.data.bids);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const placeBid = async () => {
    if (!bidAmount || Number(bidAmount) <= 0) {
      toast.error("Enter valid bid");
      return;
    }


    setIsSubmitting(true);
    try {
      const res = await API.post("/bids", { stallId: id, amount: Number(bidAmount) });
      toast.success(res.data.message || "Bid placed")
      const [stallRes, bidsRes] = await Promise.all([
        API.get(`/stalls/${id}`),
        API.get(`/bids/stall/${id}`)
      ]);
      setStall(stallRes.data.stall);
      setBids(bidsRes.data.bids);
      setBidAmount("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error")
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  if (!stall) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl text-gray-700 font-semibold">Stall not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to stalls
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/stalls')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Stalls</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Store className="w-8 h-8 text-white" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">{stall.name}</h1>
                </div>
                <p className="text-blue-100 mt-2">{stall.description || "No description available"}</p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${stall.isSold
                  ? 'bg-red-500 bg-opacity-20 text-white'
                  : 'bg-green-500 bg-opacity-20 text-white'
                }`}>
                {stall.isSold ? (
                  <>
                    <XCircle className="w-5 h-5" />
                    <span className="font-semibold">SOLD</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">OPEN</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-gray-50">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Base Price</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">₹{stall.basePrice}</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Highest Bid</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {stall.highestBid ? `₹${stall.highestBid.amount}` : "No bids yet"}
              </p>
            </div>
          </div>

          {/* Bid Placement Section */}
          {!stall.isSold && role === "student" && (
            <div className="p-6 border-t border-gray-200 bg-blue-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Place Your Bid</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-semibold">₹</span>
                  </div>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid amount"
                    className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                  />
                </div>
                <button
                  onClick={placeBid}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Placing..." : "Place Bid"}
                </button>
              </div>
            </div>
          )}

          {/* Bids History Section */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              Bid History
            </h3>

            {bids.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No bids placed yet</p>
                <p className="text-sm text-gray-400 mt-1">Be the first to place a bid!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bids.map((b, index) => (
                  <div
                    key={b._id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${index === 0
                        ? 'bg-green-50 border-green-200 shadow-md'
                        : 'bg-white border-gray-200 hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${index === 0 ? 'bg-green-200' : 'bg-gray-200'
                        }`}>
                        <User className={`w-5 h-5 ${index === 0 ? 'text-green-700' : 'text-gray-600'
                          }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 flex items-center gap-2">
                          {b.user?.name || "Anonymous"}
                          {index === 0 && (
                            <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                              Highest
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {new Date(b.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className={`text-xl font-bold ${index === 0 ? 'text-green-600' : 'text-gray-900'
                      }`}>
                      ₹{b.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}