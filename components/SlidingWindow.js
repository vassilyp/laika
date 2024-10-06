'use client'
import { useState } from 'react'
import CloseIcon from '@/imgs/close_icon.png'
import RightIcon from '@/imgs/right_icon.png'
import Image from 'next/image';
// import AudioPlayer from './AudioPlayer';

export default function SlidingDiv() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  let locationData = {
    "city": "Vancouver",
    "country": "CA",
    "content": "In Vancouver, the lush temperate rainforest thrives under a mild, coastal climate, providing a home for an array of native animals. Majestic bald eagles soar through the skies, while black bears wander the dense forests in search of berries. Along the shores, playful harbor seals can be seen lounging on rocky outcrops, keeping a watchful eye on passing orcas. This harmonious balance of wildlife and environment showcases the natural beauty and rich biodiversity of the region."
  }
  return (
    <div className="relative overflow-hidden">
      <div 
        className={`fixed top-1/2 -translate-y-1/2 right-0 transition-transform transform
          ${isVisible ? '-translate-x-40' : 'translate-x-[40vw]'} p-4
          w-1/2 h-2/3 z-10`}
      >
        <div className='bg-gray-500 w-full h-full absolute top-0 left-0 opacity-70 z-10' />
        <div className='absolute z-20 flex flex-col justify-between w-full h-full'>
          <button 
            onClick={toggleVisibility}
            className='invert mb-8'
          >
            <Image src={isVisible ? CloseIcon : RightIcon} alt='x' width={35} height={35} />
          </button>
          {isVisible && locationData &&
          <>
            <div>
              {/* <p>Placeholder Location</p> */}
              <h2>{locationData.city}, {locationData.country} </h2>
              <br></br>
              {locationData.content}
            </div>
            <div>
              <p>{locationData.story}</p>
            </div>
            <audio controls href="https://drive.google.com/file/d/1EcnYoHdwHhfglxDu8KYAjeo6I1UtD6HC/view?usp=sharing"></audio>
          </>}
        </div>
      </div>
    </div>
  );
}
