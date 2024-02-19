import React, { useEffect, useState } from 'react';
import { TrashIcon } from '../Icons';
import axios from 'axios';
import RingLoader from '../RingLoader'; // Assuming you have a component named RingLoader
import { useRouter } from 'next/router';

export default function DeleteNotices({ noticeId, noticeTitle, noticeType }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [noticeInfo, setNoticeInfo] = useState(null);
  const [loading, setLoading] = useState(false); // New state for tracking loading state
  const router = useRouter();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (!noticeId) return;
    axios.get('/api/notices?id=' + noticeId).then(response => {
      setNoticeInfo(response.data);
    });
  }, [noticeId]);

  async function deleteNotice() {
    try {
      setLoading(true); // Set loading state to true when deletion starts

      // Deletion logic
      for (const notice of noticeInfo) {
        const noticeImages = notice.images;

        if (noticeImages && noticeImages.length > 0) {
          const deleteImagePromises = noticeImages.map(image => {
            return axios.delete(`/api/delete?id=${image._id}&public_id=${image.public_id}`);
          });
          await Promise.all(deleteImagePromises);
        }
      }

      await axios.delete(`/api/notices?id=${noticeId}`);

      setLoading(false); // Set loading state to false when deletion is complete
      closeModal();
      router.reload();
    } catch (error) {
      console.error('Error deleting notice and images:', error);
      setLoading(false); // Set loading state to false in case of an error
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
                Do you really want to delete&nbsp;"{noticeTitle}"?
              </h5>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>

            <div className="mt-4 flex gap-24 justify-center">
              {!loading && ( // Display buttons only if not in loading state
                <>
                  <button
                    onClick={closeModal}
                    className="bg-green-400 hover-bg-gray-400 px-4 py-2 rounded-md mr-2 hover:bg-green-800"
                  >
                    No
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-800"
                    onClick={deleteNotice}
                  >
                    Yes
                  </button>
                </>
              )}

              {loading && <RingLoader />} {/* Display RingLoader if in loading state */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
