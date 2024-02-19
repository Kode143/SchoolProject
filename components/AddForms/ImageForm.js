import React, { useRef, useState } from "react";
import axios from "axios";
import PhotoCard from "../PhotoCard";
import { UploadIcon } from "../Icons";
import Spinner from "../Spinner";
import { useRouter } from "next/router";

const ImageForm = () => {
  const formRef = useRef();
  const [files, setFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();



  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
  };

  async function handleInputFiles(e) {
    const files = e.target.files;
    const newFiles = [...files].filter(file => {
      if (file.size < 25 * 1024 * 1024 && file.type.startsWith('image/')) {
        return file;
      }
    })
    setFiles(prev => [...newFiles, ...prev]);
    formRef.current.reset();
  }

  async function handleDeleteFile(index) {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  }

  async function handleUpload(e) {
   
    e.preventDefault();
    setIsUploading(true);
    if (!files.length) return alert('No image files are selected.');
    if (files.length > 8) return alert('Upload up to 8 images.');

    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file);
    });

    try {
      // Upload images to Cloudinary
      const cloudinaryResponse = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Extract image details from Cloudinary response
      const images = cloudinaryResponse.data.uploads;

      // Save image details to MongoDB
      const mongoResponse = await axios.post('/api/images', { images });

      console.log('Image details saved to MongoDB:', mongoResponse.data);
      // Handle response or update UI as needed
    } catch (error) {
      console.error('Error uploading images:', error);
      // Handle error cases
    }
    setIsUploading(false);
    closeModal();
    router.reload();
  }


  return (
<>  
<button onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-800"
      >
        Add new Photos

</button>
{modalOpen && (

<form onSubmit={handleUpload} ref={formRef} className="fixed inset-0 flex items-center justify-center z-50">
<div className="bg-gray-200 shadow-md p-0 m-0 w-full md:w-96 rounded-xl">
<div className="bg-slate-300 min-h-80 min-w m-2 p-2 rounded-lg">
<div className="flex justify-between">
              <h5 className="text-lg font-semibold mb-4">Select Photos</h5>
              <button
                onClick={closeModal}
                className="text-white p-2 h-10 w-10 font-bold rounded-lg hover:text-black bg-red-800"
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="flex gap-2 ">
              <label className="w-40 h-20 text-center flex flex-col items-center 
              justify-center cursor-pointer text-sm gap-1 text-primary
               rounded-lg bg-white shadow-md border border-primary">
                <UploadIcon className="h-6 w-6" />
                <div>Add image</div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleInputFiles}
                  multiple
                />
              </label>
              <h1 className="text-red-700 w-56-">
    (*) Only accept image files less than 25MB in size. up to 8 photo files.
  </h1>
            </div>


{isUploading ? (
                <div className="h-24 p-1 flex items-center rounded-lg">
                  <Spinner />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 m-8">
                  {files.map((file, index) => (
                    <PhotoCard key={index} url={URL.createObjectURL(file)} onClick={() => handleDeleteFile(index)} />
                  ))}
                </div>
              )}

</div>

{isUploading ? (
                <div className="h-24 p-1 flex items-center rounded-lg">
                  <Spinner />
                </div>
              ) : ( 
<button className="bg-green-600 ms-5 p-2 rounded-md" type="submit">Save</button> )}
</div>
</form>

)}
   
  
    </>


  )
  
}

export default ImageForm;
