import React from 'react'
import SingleStall from './SingleStall'
import { useNavigate } from 'react-router-dom'
import CreateStallBtn from '../common/CreateStallBtn';

const StallList = ({ stalls, markSold, edit, confirmDelete }) => {

    const navigate = useNavigate();

    return (
        <div>
            {stalls.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center flex flex-col justify-center items-center">
                    <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No stalls yet</h3>
                    <p className="text-gray-600 mb-6">Get started by creating your first stall</p>
                    <div>
                        <CreateStallBtn 
                            path={"/create-stall"}
                            text={"Create your First Stall"}
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {stalls.map((s) => (
                        <SingleStall 
                            key={s._id}
                            s={s} 
                            markSold={markSold}
                            edit={edit}
                            confirmDelete={confirmDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default StallList
