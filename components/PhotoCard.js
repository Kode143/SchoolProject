import React from 'react'
import Image from 'next/image'

const PhotoCard = ({url, onClick}) => {
  return (
    <div className='flex flex-col gap-0'>
      <div className=' border border-black'>
        <Image src={url} alt='image' width={100} height={60} priority className='h-24 w-24'/>
      </div>

      <button type='button' className='bg-red-700 h-6 p-0'
      onClick={onClick}
      >Delete</button>
    </div>
  )
}

export default PhotoCard;    