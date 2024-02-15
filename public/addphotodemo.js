import React, { useRef, useState } from "react";
import { UploadIcon } from "./Icons";
import axios from "axios";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import Image from 'next/image';
import { useRouter } from "next/router";

export default function AddPhotos() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState( []);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const formRef = useRef();
  const [files, setFiles] = useState([]);

 

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setSelectedFiles([]);
    setImages([]);
  };

  async function uploadImages(e){
    const files = e.target.files;
    setIsUploading(true);
    const newFiles = [...files].filter(file=> {
      if(file.size < 25*1024*1024 && file.type.startsWith('image/')){
        return file;
      }
    })
    setFiles(prev => [...newFiles, ...prev])
  }

  // const uploadImages = async (e) => {
  //   const files = e.target?.files;
  //   if (files?.length > 0) {
  //     setIsUploading(true);
  //     try {
  //       const imageInfoArray = [];
  //       for (const file of files) {
  //         const formData = new FormData();
  //         formData.append("file", file);
  //         formData.append("upload_preset", "my-uploads");

  //         const response = await axios.post("/api/upload", formData, {
  //           headers: { "Content-Type": "multipart/form-data" },
  //           params: { quality: 'auto' },
  //         });

  //         const { public_id, secure_url } = response.data;
  //         imageInfoArray.push({ public_id, secure_url });
  //       }

  //       setImages([...images, ...imageInfoArray]);
  //     } catch (error) {
        
  //       console.error("Error uploading images:", error);
  //     }
  //     setIsUploading(false);
  //   }
  // };




  const updateImagesOrder = (images) => {
    setImages(images);
  };

  const saveImages = async (e) => {
    e.preventDefault();
    try {
      const data = {
        images: images.map(image => ({
          public_id: image.public_id,
          secure_url: image.secure_url
        }))
      };

      if (_id) {
        await axios.put('/api/images', { ...data, _id });
      } else {
        await axios.post('/api/images', data);
      }
      closeModal();
      router.reload();
    } catch (error) {
      console.error("Error saving images:", error);
    }
  };

  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((_, idx) => idx !== index));
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Add new Photos
      </button>

      {modalOpen && (
        <form  action="" ref={formRef}
        className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-200 rounded shadow-md p-4 w-full md:w-96">
            <div className="flex justify-between">
              <h5 className="text-lg font-semibold">Select Photos</h5>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div>
              <label className="w-24 h-24 text-center flex flex-col items-center 
              justify-center cursor-pointer text-sm gap-1 text-primary
               rounded-sm bg-white shadow-md border border-primary">
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
            </div>
            <div className="mb-2 flex flex-grow gap-1">
              <ReactSortable list={images} className="flex flex-wrap gap-1" setList={updateImagesOrder}>
                {!!images?.length &&
                  images.map((image, index) => (
                    <div key={index} className="relative inline-block bg-gray-400 shadow-sm rounded-sm border border-gray-700">
                      <Image src={image.secure_url} width={100} height={100} alt="Uploaded" priority className="rounded-lg"
                        style={{ width: "100px", height: "auto" }} />
                      <button
                        className="absolute top-0 right-0 p-1 m-0 bg-red-500 text-white rounded-es-xl"
                        onClick={() => removeImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
              </ReactSortable>
              {isUploading && (
                <div className="h-24 p-1 flex items-center rounded-lg">
                  <Spinner />
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-24 justify-center">
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-gray-400 px-4 py-2 rounded-md mr-2"
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={saveImages}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
