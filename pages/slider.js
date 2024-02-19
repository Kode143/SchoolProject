import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import ImagePreviewModal from '@/components/ImagePreviewModal';

import SliderForm from '@/components/AddForms/SliderForm';
import DeleteSliders from '@/components/DeleteModals/DeleteSliders';


export default function SliderPage() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

const fetchImages = async () => {
  try {
    const response = await axios.get('/api/sliders');
    const sortedImages = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setImages(sortedImages);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle the case when no images are found
      console.log('No images found.');
      setImages([]); // Set an empty array to clear existing images
    } else {
      console.error('Error fetching images:', error);
    }
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
       <SliderForm />
          </div>
        <div className="mt-8 grid grid-flow-row grid-cols-4 gap-2">
        {images.map((image, index) => (
              <div key={index} className="flex flex-col items-center bg-slate-500 p-2">
                <div className='font-bold p-2'>Slider {index + 1}</div> 
                <img
                  src={image.secure_url}
                  alt={`Slider ${index + 1}`}
                  onClick={() => openImagePreview(image.secure_url)}
                  className='h-64 w-80 cursor-pointer transform transition-transform hover:scale-105'
                  width={100}
                  height={100}
                  
                />
                <div className='w-full'>
                  <DeleteSliders image={image} onDelete={handleDelete} />
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
