// NoticePage.js

import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';

import DeleteNotices from '@/components/DeleteModals/DeleteNotices';
import NoticeForm from '@/components/AddForms/noticeForm';

const NoticePage = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('/api/notices');
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };
    fetchNotices();
  }, []); // Fetch notices on component mount

  const textNotices = notices.filter(notice => notice.noticeType === 'text');
  const imageNotices = notices.filter(notice => notice.noticeType === 'image');

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
              <div key={index} className='mt-2 border-2 '>
                <h3 className='bg-lime-500 text-center'>Subject: {notice.title}</h3>
                <p className='mx-2'>{notice.textNotice}</p>
                <DeleteNotices noticeId={notice._id} noticeTitle={notice.title} noticeType={notice.noticeType} />
              </div>
            ))}
          </div>
          <div>
            <h2 className="bg-slate-500 p-3 text-center font-bold text-xl">Image Notices</h2>
            {imageNotices.map((notice, noticeIndex) => (
              <div key={noticeIndex} className='mt-2 shadow-lg shadow-black'>
                <h4 className='bg-lime-500 text-center'>{notice.title}</h4>
                {notice.images.map((image, imageIndex) => (
                  <div key={imageIndex}>
                    <img 
                      src={image.secure_url} 
                      alt={`Notice ${noticeIndex} Image ${imageIndex}`} 
                    />
                    <DeleteNotices noticeId={notice._id} noticeTitle={notice.title} noticeType={notice.noticeType} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoticePage;
