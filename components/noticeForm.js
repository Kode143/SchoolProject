import { useState } from 'react';
import axios from "axios";

const NoticeForm = () => {
  const [noticeType, setNoticeType] = useState('text');
  const [textNotice, setTextNotice] = useState('');
  const [imageNotice, setImageNotice] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleTextNoticeChange = (e) => {
    setTextNotice(e.target.value);
  };

  const handleImageNoticeChange = (e) => {
    const file = e.target.files[0];
    setImageNotice(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleNoticeTypeChange = (type) => {
    setNoticeType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send notice data to the API endpoint
      const response = await axios.post('/api/notices', {
        noticeType,
        textNotice,
        imageNotice,
      });

      console.log('Notice created:', response.data);
    } catch (error) {
      console.error('Error creating notice:', error);
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
                  placeholder="Enter text notice"
                  value={textNotice}
                  onChange={handleTextNoticeChange}
                ></textarea>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageNoticeChange}
                    className="mb-4"
                  />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-w-full h-auto mb-4 rounded-md"
                    />
                  )}
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
