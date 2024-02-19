import React, { useEffect, useState } from 'react';
import { TrashIcon } from '../Icons';
import axios from 'axios';
import RingLoader from '../RingLoader'; 
import { useRouter } from 'next/router';

export default function DeleteArticles({ articleId, articleTitle }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (!articleId) return;
    axios.get('/api/articles?id=' + articleId).then(response => {
      setEventInfo(response.data);
    });
  }, [articleId]);

  async function deleteArticle() {
    try {
      setLoading(true); 

      if (!eventInfo || eventInfo.length === 0) {
        console.error('Event info is not properly set.');
        return;
      }

      const eventImages = eventInfo[0].images;

      if (!eventImages || eventImages.length === 0) {
        console.error('Event images are not properly set.');
        return;
      }

      await axios.delete(`/api/articles?id=${articleId}`);

      const deleteImagePromises = eventImages.map(image => {
        return axios.delete(`/api/delete?id=${image._id}&public_id=${image.public_id}`);
      });
      await Promise.all(deleteImagePromises);

      setLoading(false); 
      closeModal();
      router.reload();
    } catch (error) {
      console.error('Error deleting event and images:', error);
      setLoading(false); 
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        className="bg-red-600 text-white px-4 py-2 cursor-pointer w-full flex items-center gap-1 hover:bg-red-800"
      >
        <TrashIcon className="w-4 h-4" />
        Delete
      </button>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-200 rounded shadow-md p-4 w-full md:w-96">
            <div className="flex justify-between">
              <h5 className="text-lg font-semibold">
                Do you really want to delete&nbsp;"{articleTitle}"?
              </h5>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>

            <div className="mt-4 flex gap-24 justify-center">
              {!loading && (
                <>
                  <button
                    onClick={closeModal}
                    className="bg-green-400 hover-bg-gray-400 px-4 py-2 rounded-md mr-2 hover:bg-green-800"
                  >
                    No
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-800"
                    onClick={deleteArticle}
                  >
                    Yes
                  </button>
                </>
              )}

              {loading && <RingLoader />} {/* Render RingLoader if in loading state */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
