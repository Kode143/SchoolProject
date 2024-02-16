import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NoticeForm from '@/components/noticeForm';

const NoticePage = () => {
  const [textNotices, setTextNotices] = useState([]);
  const [imageNotices, setImageNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('/api/notices');
        // Filter text and image notices
        const texts = response.data.filter(notice => notice.noticeType === 'text');
        const images = response.data.filter(notice => notice.noticeType === 'image');
        setTextNotices(texts);
        setImageNotices(images);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []); // Fetch notices on component mount

  return (
    <Layout>
      <div className="flex flex-col mt-8 rounded-md me-4">
      <div className="">
          <NoticeForm/>
        </div>
        <div className="grid grid-cols-2 ms-2 gap-8 mt-4">
          <div className="flex flex-col">
            <h1 className="bg-slate-500 p-3 text-center font-bold text-xl">Text Notices</h1>
            {textNotices.map((notice, index) => (
              <div key={index} className='border-4 border-black'>
                <h3 className='bg-lime-500 text-center'>Subject: {notice.title}</h3>
                <p className='mx-2'>{notice.textNotice}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="bg-slate-500 p-3 text-center font-bold text-xl">Image Notices</h2>
            {imageNotices.map((notice, index) => (
              <div key={index}>
                <img src={notice.imageNotice} alt={`Image Notice ${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoticePage;
