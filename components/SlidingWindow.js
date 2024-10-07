'use client'
import { useState } from 'react'
import CloseIcon from '@/imgs/close_icon.png'
import RightIcon from '@/imgs/right_icon.png'
import Image from 'next/image';

export default function SlidingDiv({locationData}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  console.log("Sliding div")
  console.log(locationData)

  return (
    <div className="relative overflow-hidden">
      <div 
        className={`fixed top-1/2 -translate-y-1/2 right-0 transition-transform transform
          ${isVisible ? '-translate-x-40' : 'translate-x-[40vw]'} p-4
          w-1/2 h-2/3 z-10`}
      >
        <div className='bg-gray-500 w-full h-full absolute top-0 left-0 opacity-70 z-10' />
        <div className='absolute z-20 flex flex-col justify-between w-90% h-80%'>
          <button 
            onClick={toggleVisibility}
            className='invert mb-8'
          >
            <Image src={isVisible ? CloseIcon : RightIcon} alt='x' width={35} height={35} />
          </button>
          {isVisible && locationData &&
          <>
            <div className='text-2xl mb-5'>
                {locationData.name}
            </div>
            <div className='mt-5'>
                <p>{locationData.story}</p><br/>
              <audio src={locationData.audioURL} controls className='mb-8'></audio>
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}
