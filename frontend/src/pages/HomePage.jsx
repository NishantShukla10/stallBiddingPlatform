import React from 'react'
import { useNavigate } from 'react-router-dom'
import stall_image from '../assets/stall_image.png'
import Button from '../components/common/Button'
import { ArrowRight } from 'lucide-react'

const HomePage = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="w-11/12 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Section - Text */}
                    <div className="flex-1 space-y-6 text-center  lg:text-left">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                School Stall <span className="text-blue-600">Bidding</span> Platform
                            </h1>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto lg:mx-0 rounded-full"></div>
                        </div>

                        <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Easily manage and participate in school stall auctions.
                            Empowering principals and students to connect seamlessly.
                        </p>

                        <div className="flex justify-center items-center lg:justify-start lg:items-start">
                            <Button
                            text="View Stalls"
                            color="blue"
                            onClick={() => navigate('/stalls')}
                            className="px-10 py-4"
                        />
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-6">
                            <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                                <span className="text-sm text-gray-700 font-medium">🎯 Easy Bidding</span>
                            </div>
                            <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                                <span className="text-sm text-gray-700 font-medium">⚡ Real-time Updates</span>
                            </div>
                            <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                                <span className="text-sm text-gray-700 font-medium">🔒 Secure Platform</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Image */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* background blob */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-3xl blur-2xl opacity-20"></div>

                            {/* Image container */}
                            <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
                                <img
                                    src={stall_image}
                                    alt="School Stall"
                                    className="w-full max-w-md lg:max-w-lg rounded-2xl"
                                />
                            </div>

                            {/* Floating accent elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage