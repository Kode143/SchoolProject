import { useState } from 'react';
import axios from "axios";
import Spinner from '../Spinner';
import { UploadIcon } from '../Icons';
import { useRouter } from 'next/router';

const NoticeForm = () => {
  const [title, setTitle] = useState('');
  const [noticeType, setNoticeType] = useState('text');
  const [textNotice, setTextNotice] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([]);

  
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const router = useRouter();

  const handleTextNoticeChange = (e) => {
    setTextNotice(e.target.value);
  };


  const handleNoticeTypeChange = (type) => {
    setNoticeType(type);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    const file = e.target?.files[0];
    if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.append('file', file);
      try {
        const res = await axios.post('/api/upload', data);
        if (res.data && Array.isArray(res.data.uploads) && res.data.uploads.length > 0) {
          const uploadedImage = res.data.uploads[0];
          const { secure_url, public_id } = uploadedImage;
          // Update images state to include both public_id and secure_url
          setImages([...images, { secure_url, public_id }]);
        } else {
          console.error('secure_url property is missing or undefined in the response:', res.data);
        }
      } catch (error) {
        setError('Error uploading image. Please try again.');
        console.error('Error uploading image:', error);
      }
      setIsUploading(false);
    }
  };
  
  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!title.trim()) {
      // Display an error message indicating that the notice title is required
      alert('Notice title is required');
      return;
    }
  
    // Map the images array to include only secure_url and public_id properties
    const formattedImages = images.map(image => ({
      secure_url: image.secure_url,
      public_id: image.public_id
    }));
  
    const data = { title, noticeType, images: formattedImages, textNotice };
    console.log(formattedImages);
  
    try {
      await axios.post('/api/notices', data);
      closeModal(true);
      router.reload();
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };
  
  
  
  return (
    <>
      <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-800">
        Add Notice
      </button>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="max-w-md mx-auto p-6 border rounded-md shadow-lg bg-white w-full">
            <h2 className="text-lg font-semibold mb-4">Create Notice</h2>
            <div>
            <label>Notice Title :</label>
            <input type='text' placeholder='Notice Title' value={title}
                onChange={e => setTitle(e.target.value)} 
               className='ps-3 border border-black rounded-md mb-2 ms-2' required />
            </div>
            <div className="flex justify-between mb-4">

              <button
                className={`px-4 py-2 rounded ${
                  noticeType === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}
                onClick={() => handleNoticeTypeChange('text')}
              >
                Text Notice
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  noticeType === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}
                onClick={() => handleNoticeTypeChange('image')}
              >
                Image Notice
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {noticeType === 'text' ? (
                <textarea
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter text notice here..."
                  value={textNotice}
                  onChange={handleTextNoticeChange}
                ></textarea>
              ) : (
                <>
        <div className='mb-2 flex flex-wrap gap-1'>
          {!!images?.length && images.map((image, index) => (
  <div key={index} className='w-20 h-20 flex justify-center items-center bg-gray-400 rounded-lg hover:bg-gray-700 mr-2 mb-2'>
    <img src={image.secure_url} alt={`Image ${index}`} className='w-full h-full object-cover' />
  </div>
))}

                {isUploading && (
               <div className='h-24 p-1 flex items-center rounded-lg'>
                  <Spinner />
                   </div>
              )}

               <label className='w-20 h-20 cursor-pointer  flex justify-center items-center bg-gray-400 rounded-lg hover:bg-gray-700'>
                  <UploadIcon />
                  <input type='file'  accept="image/*" className='hidden'  onChange={uploadImage} required />
               </label>
            </div>
                </>
              )}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none" >
               Save
              </button>
            </form>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeForm;
