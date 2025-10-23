import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader";
import BidsList from "../components/bids/BidsList";

export default function MyBids() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/bids/user");
        setBids(res.data.bids);
      } catch (err) {
        toast.error("Error, Refresh the page!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  const totalBids = bids.length;
  const totalAmount = bids.reduce((sum, b) => sum + b.amount, 0);
  const highestBid = bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="w-11/12 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3 shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Bids</h1>
              <p className="text-gray-600">Track all your bidding activity</p>
            </div>
          </div>
        </div>

        {bids.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-2">
            <p className="text-gray-500 font-medium mb-1 text-3xl">Total Bids: {totalBids}</p>
            <p className="text-gray-500 font-medium mb-1 text-3xl">Total Amount: ₹{totalAmount.toLocaleString()}</p>
            <p className="text-gray-500 font-medium mb-1 text-3xl">Highest Bid: ₹{highestBid.toLocaleString()}</p>
          </div>
        )}

        {bids.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No bids yet</h3>
            <p className="text-gray-600 mb-6">You haven't placed any bids. Start bidding on stalls to see them here!</p>
            <button
              onClick={() => window.location.href = '/stalls'}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Stalls
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Bid History</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {totalBids} {totalBids === 1 ? 'Bid' : 'Bids'}
              </span>
            </div>

            <div className="space-y-3">
              {bids.map((b, index) => (
                <BidsList b={b} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}