import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import SliderForm from '@/components/AddForms/SliderForm';
import DeleteSlider from '@/components/DeleteModals/DeleteSliders';
import ImagePreviewModal from '@/components/ImagePreviewModal';

const SliderPage = () => {
  const [sliders, setSliders] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await axios.get('/api/sliders');
      setSliders(response.data);
    } catch (error) {
      console.error('Error fetching slider data:', error);
    }
  };

  const openImagePreview = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
  };



  return (
    <Layout>
      <div className='ms-2'> 
      <div className="container mx-auto">
        <h1 className="mt-8 mb-4">
          <SliderForm fetchSliders={fetchSliders} />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {sliders.map((slider, index) => (
            <div key={index} className="relative">
              <div className="bg-gray-100 rounded-md overflow-hidden shadow-md">
                <img src={slider.images[0].secure_url}
                 alt={`Slider ${index}`}
                 onClick={() => openImagePreview(slider.images[0].secure_url)}
                  className="w-full h-48 object-cover hover:cursor-pointer hover:scale-105" />
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-2">{slider.title}</h2>
                  <p className="text-gray-600">{slider.description}</p>
                </div>
              </div>
              <DeleteSlider eventId={slider._id} eventTitle={slider.title} eventImageUrl={slider.images[0].secure_url} />
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

export default SliderPage;


           