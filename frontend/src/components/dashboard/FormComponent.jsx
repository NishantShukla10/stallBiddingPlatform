import React, { useEffect, useState } from 'react'

const FormComponent = (
    {
        initialData = { name: "", description: "", basePrice: "" },
        onSubmit,
        isSubmitting,
        mode = "create",
        onCancel
    }) => {

    const [form, setForm] = useState(initialData);

    useEffect(() => {
        if (initialData && Object.keys(initialData) > 0) {
            setForm(initialData);
        }
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({
            ...form,
            basePrice: Number(form.basePrice)
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Stall Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Stall Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter stall name"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                        required
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                </label>
                <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Enter stall description (optional)"
                        rows="4"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                    />
                </div>
                {
                    mode === "create" && (
                        <p className="mt-1 text-xs text-gray-500">Provide additional details about the stall</p>
                    )
                }

            </div>

            {/* Base Price */}
            <div>
                <label htmlFor="basePrice" className="block text-sm font-semibold text-gray-700 mb-2">
                    Base Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-lg font-semibold">₹</span>
                    </div>
                    <input
                        id="basePrice"
                        name="basePrice"
                        type="number"
                        value={form.basePrice}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                        required
                    />
                </div>
                {
                    mode === "create" && (
                        <p className="mt-1 text-xs text-gray-500">Set the starting price for the stall</p>
                    )
                }

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 
                        (mode === "edit" ? "Updating..." : "Creating...") : 
                        (mode === "edit" ? "Update Stall" : "Create Stall")
                    }
                </button>
            </div>
        </form>

    )
}

export default FormComponent
