import { Store } from 'lucide-react'
import React from 'react'
import StallCard from './StallCard'

const StallsComponent = ({stalls}) => {
  return (
    <div>
      {stalls.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <Store className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-500 text-xl font-medium">No stalls available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Check back later for new opportunities!</p>
          </div>
        ) : (
          <div className="grid content-center justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stalls.map((stall) => (
              <StallCard 
                key={stall._id}
                stall={stall} 
              />
            ))}
          </div>
        )}
    </div>
  )
}

export default StallsComponent
