import Layout from '@/components/Layout';
import NoticeForm from '@/components/noticeForm';
import { useState } from 'react';

const NoticePage = () => {


  return (
    <Layout>
      <div className=" flex mt-8 rounded-md ">
        <div className="">
          <NoticeForm />
        </div>
      
       
      
  
      </div>
    </Layout>
  );
};

export default NoticePage;
