import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

import axios from 'axios';
import ImagePreviewModal from '@/components/ImagePreviewModal';

import Image from 'next/image';
import DeleteImages from '@/components/DeleteModals/DeleteImages';
import ImageForm from '@/components/AddForms/ImageForm';

export default function PhotoGallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
        const response = await axios.get('/api/images');
        const sortedImages = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setImages(sortedImages);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
};


  const openImagePreview = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
  };

  const handleDelete = async (imageId) => {
    try {
      // Filter out the deleted image from the images state
      setImages(images.filter(image => image._id !== imageId));
    } catch (error) {
      console.error('Error handling delete:', error);
    }
  };

  return (
    <Layout>
        <div className='ms-2'>
      <div>
        <div className='flex'>
       <ImageForm />
          </div>
        <div className="mt-8 grid grid-flow-row grid-cols-10 gap-2">
        {images.map((image, index) => (
  <div key={index} className="flex flex-col items-center">
    <img
      src={image.secure_url} // Assuming `secure_url` is the property that holds the image URL
      alt={`Image ${index}`}
      onClick={() => openImagePreview(image.secure_url)}
      className='h-40 w-56 cursor-pointer'
      width={100} height={100}
    />
    <div className='w-full'>
      <DeleteImages image={image} onDelete={handleDelete} /> 
    </div>
  </div>
))}

        </div>
      </div>

      {selectedImage && (
        <ImagePreviewModal imageUrl={selectedImage} onClose={closeImagePreview} />
      )}
      </div>
    </Layout>
  );
}
