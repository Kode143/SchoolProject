import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleIcon2, EyeIcon, GalleryIcon, ImageIcon, KidsIcon } from './Icons';
import UserGraph from './UserGraph';
import Calendar from './Calender';


const Dashboard = () => {
    const [images, setImages] = useState([]);
    const [articles, setArticles] = useState([]);
    const [pageViews, setPageViews] = useState(0);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('/api/images');
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

      useEffect(() => { 
    axios.get('/api/articles').then(response => {
      const sortedEvents = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setArticles(sortedEvents);
    });
  }, []);

//   const fetchPageViews = async () => {
//     try {
//         const response = await axios.get('/api/page-views');
//         setPageViews(response.data.views);
//     } catch (error) {
//         console.error('Error fetching page views:', error);
//     }
// };



    return (
        <div className='mt-1'>
            <div className=' p-2 flex justify-around' >
                
            <div className='bg-slate-300 p-2  w-52 rounded-md text-center flex'>
                <div className=' '>
                <GalleryIcon />
                </div>
                <div className='flex flex-col'>
                <div className='ms-3 mt-2'>
                Total Images 
                </div>
                <div className='font-bold text-2xl'>
                {images.length}
                </div>  
                </div>
              </div>        
                <div className='bg-slate-300 h-20 w-52  flex p-2 rounded-md text-center'>
                    <div className='bg-yellow-400 p-2 rounded-md'>
                        <ArticleIcon2 />
                    </div>

                    <div className='ms-3 mt-2'>
                    <div>
                    Total Articles
                    </div>
                    <div className='font-bold text-2xl'>
                    {articles.length}
                    </div>
                    </div>
                
                </div>

                <div className='bg-slate-300 h-20 w-56  flex p-2 rounded-md text-center'>
                    <div className='bg-green-500 p-2 rounded-md'>
                        <EyeIcon />
                    </div>

                    <div className='ms-3 mt-2'>
                    <div>
                    Total Page Views
                    </div>
                    <div className='font-bold text-2xl'>
                    {pageViews}
                    </div>
                    </div>
                
                </div>  

                 <div className='bg-slate-300 h-20 w-64  flex p-2 rounded-md text-center'>
                    <div className='bg-sky-500 p-2 rounded-md'>
                        <KidsIcon />
                    </div>

                    <div className='ms-3 mt-2'>
                    <div>
                    Admission Request
                    </div>
                    <div className='font-bold text-2xl'>
                   0
                    </div>
                    </div>
                
                </div>        
              </div>

              <div className='flex flex-row gap-4 mt-4'>
                <div className='w-4/6 h-48'>
                <UserGraph />
                </div>
                <div className='w-2/6 rounded-md flex-col'>
                <div className='bg-teal-400 rounded-md'>
                 <Calendar  />
                 </div>
                 <div className='ms-2 p-2 mb-10 bg-gray-300 mt-2'>
                    Recent Message Here
                 </div>

              
                </div>
               
              </div>
            
          
        </div>
    );
};

export default Dashboard;
