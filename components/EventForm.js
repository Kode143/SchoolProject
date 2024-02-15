
import axios from 'axios'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs';
import Spinner from './Spinner';
import { UploadIcon } from './Icons';

const NewEvent = () => {

   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [images, setImages] = useState([])
   const [date, setDate] = useState('')
   const [isUploading, setIsUploading] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
   const router = useRouter();
;

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
  };


async function createEvent(ev){
   ev.preventDefault();
   const data = {title, date, images, description};
   await axios.post('/api/events', data )
 closeModal(true);
 router.reload();

} 

async function uploadImage(e) {
   e.preventDefault();
   const file = e.target?.files[0]; // Get the first selected file
   if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.append('file', file);
      try {
         const res = await axios.post('/api/upload', data);
         if (res.data && Array.isArray(res.data.uploads) && res.data.uploads.length > 0) {
            const secureUrl = res.data.uploads[0].secure_url; // Get the secure_url of the first upload
            setImages(oldImages => [...oldImages, secureUrl]);
         } else {
            console.error('secure_url property is missing or undefined in the response:', res.data);
         }
      } catch (error) {
         console.error('Error uploading image:', error);
      }
   }
   setIsUploading(false);
}

  
 

   return (
      <>
      <button onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-900"
      >Add Event</button>
{modalOpen && (
         <form  onSubmit={createEvent}
          className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className='bg-gray-200 item shadow-md p-4 m-0 w-full md:w-96 rounded-xl sm:w-80'>
             <div className='flex'> 
              <button
                onClick={closeModal}
                className="text-white p-2 h-10 w-10 font-bold rounded-lg hover:text-black bg-red-600" >
                <span aria-hidden={true}>×</span>
              </button>
           </div>
           <div className='flex flex-col'>
            <label>Event Title</label>
            <input type='text' placeholder='Event Title' value={title}
               onChange={e => setTitle(e.target.value)} className='ps-3' required />

<label>Event Date</label>
<input value={date}
  type="date" 
  onChange={e => setDate(e.target.value)}
  className="mt-1 ps-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required/>
            <label>Image</label>
            <div className='mb-2 flex flex-wrap gap-1'>
            {!!images?.length && images.map((secure_url, index) => (
    <div key={index} className='w-20 h-20 flex justify-center items-center bg-gray-400 rounded-lg hover:bg-gray-700 mr-2 mb-2'>
      <img src={secure_url} alt={`Image ${index}`} className='w-full h-full object-cover'  />
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
            <label>Description</label>
<textarea
  placeholder='Event description'
  value={description}
  onChange={e => setDescription(e.target.value)}
  className="resize-y h-52 mt-1 ps-3 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300 rounded-md mb-2" required
/>



            <button type='submit' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Save</button>
            </div>
         </div>
         </form>
)}
      </>
   )
}

export default NewEvent;