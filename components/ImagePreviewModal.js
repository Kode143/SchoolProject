import React from 'react';
import Image from 'next/image';

export default function ImagePreviewModal({ imageUrl, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative max-w-screen-lg w-full h-full">
        <img src={imageUrl} alt="Image Preview" className="w-full h-full object-contain"  />
        <button
          className="absolute top-2 right-2 items-center text-white text-4xl cursor-pointer bg-red-800 h-10 w-10"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
