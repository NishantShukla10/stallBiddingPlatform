import React from 'react'

const BidsList = ({b}) => {
    return (
        <div
            key={b._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 border-blue-500"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-100 rounded-lg p-2">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">
                                {b.stall?.name || "Stall"}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{new Date(b.createdAt).toLocaleString('en-IN', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short'
                                })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Bid Amount</p>
                        <div className="flex items-center gap-1">
                            <span className="text-2xl font-bold text-green-600">₹{b.amount.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-2 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BidsList
