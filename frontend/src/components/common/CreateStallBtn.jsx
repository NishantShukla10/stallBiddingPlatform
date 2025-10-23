import { Plus } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateStallBtn = ({ path, text }) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(`${path}`)}
            className="bg-gradient-to-r from-green-600 to-green-700
             hover:from-green-700 hover:to-green-800 hover:cursor-pointer
              text-white px-6 py-3 rounded-lg font-semibold shadow-md 
              hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        >
            <Plus strokeWidth={2.75} />
            {text}
        </button>
    )
}

export default CreateStallBtn
