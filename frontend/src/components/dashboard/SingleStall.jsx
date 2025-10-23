import React from 'react'
import { Pencil, Trash2, Check } from "lucide-react";
import Button from '../common/Button';

const SingleStall = ({s, markSold, edit, confirmDelete}) => {
    return (
        <div
            key={s._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
        >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{s.name}</h3>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${s.isSold ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                }`}
                        >
                            {s.isSold ? "SOLD" : "AVAILABLE"}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="text-lg font-semibold">Base Price: ₹{s.basePrice}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {!s.isSold && (
                        <Button
                        text="Mark Sold"
                        icon={Check}
                        color="blue"
                        onClick={() => markSold(s._id)}
                    />
                    )}
                    <Button
                        text="Edit"
                        icon={Pencil}
                        color="yellow"
                        onClick={() => edit(s._id)}
                    />
                    <Button
                        text="Delete"
                        icon={Trash2}
                        color="red"
                        onClick={() => confirmDelete(s._id)}
                    />
                </div>
            </div>
        </div>
    )
}

export default SingleStall
