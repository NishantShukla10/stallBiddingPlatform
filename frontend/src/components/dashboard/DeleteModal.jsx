import React from 'react'

const DeleteModal = ({setDeleteModal, handleDelete}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Confirm Delete</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this stall? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteModal({ open: false, id: null })}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
