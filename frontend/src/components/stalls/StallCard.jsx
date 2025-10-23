import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Tag, User } from "lucide-react";
import { getRole } from "../../utils/auth";


const StallCard = ({ stall }) => {

    const navigate = useNavigate();
    const role = getRole();

    return (

        <div
            key={stall._id}
            onClick={() => navigate(`/stall/${stall._id}`)}
            className="bg-white  rounded-2xl shadow-lg hover:shadow-2xl hover:cursor-pointer transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group"
        >
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 px-6 py-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <h2 className="text-2xl font-bold text-white truncate relative z-10">{stall.name}</h2>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            </div>

            <div className="p-6 flex flex-col flex-grow ">
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 min-h-[60px]">
                    {stall.description || "No description available for this stall."}
                </p>

                {/* Pricing Info with Icons */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Tag className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">Base Price</span>
                        </div>
                        <span className="text-xl font-bold text-blue-600">₹{stall.basePrice}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">Highest Bid</span>
                        </div>
                        {stall.highestBid ? (
                            <span className="text-xl font-bold text-green-600">₹{stall.highestBid.amount}</span>
                        ) : (
                            <span className="text-sm font-medium text-gray-500">No bids yet</span>
                        )}
                    </div>
                </div>

                {/* Creator Info */}
                <div className="flex items-center gap-2 py-3 px-4 bg-gray-50 rounded-lg border border-gray-100 mb-5">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-600">
                        <span className="font-medium">Created by:</span> {stall.createdBy?.name || "Unknown"}
                    </span>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                    {stall.isSold ? (
                        <div className="w-full py-3 text-center bg-gradient-to-r from-red-100 to-red-50 text-red-600 font-bold rounded-xl border-2 border-red-200">
                            SOLD OUT
                        </div>
                    ) : role === "student" ? (
                        ""
                    ) : null}
                </div>
            </div>
        </div>

    )
}

export default StallCard
