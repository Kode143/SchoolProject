// DeleteModal.js

import React, { useState } from 'react';
import { TrashIcon } from './Icons';
import axios from 'axios';

export default function DeleteModal({ image, onDelete }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const deleteImage = async () => {
    try {
      await axios.delete(`/api/delete?id=${image._id}&public_id=${image.public_id}`);
      closeModal();
      onDelete(image._id);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-red-700 text-white px-4 py-2 cursor-pointer w-full flex items-center gap-1"
      >
        <TrashIcon className="w-4 h-4" />
        Delete
      </button>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-200 rounded shadow-md p-4 w-full md:w-96">
            <div className="flex justify-between">
              <h5 className="text-lg font-semibold">Are you sure?</h5>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>

            <div className="mt-4 flex gap-24 justify-center">
              <button
                onClick={closeModal}
                className="bg-green-700 hover-bg-gray-400 px-4 py-2 rounded-md mr-2"
              >
                No
              </button>
              <button
                className="bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={deleteImage}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
