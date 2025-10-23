import React from 'react'

const Loader = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
                <p className="mt-6 text-gray-600 font-semibold text-lg">Loading stalls...</p>
            </div>
        </div>
    )
}

export default Loader
