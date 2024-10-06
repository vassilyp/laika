'use client'
import { useEffect, useState } from 'react'
import localFont from "next/font/local";
import Throbber from '@/components/Throbber.js'

// Load the font
const kimberley = localFont({
  src: "../app/fonts/kimberley.otf"
});

export default function TitleOverlay({ startHandler }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  
  return (
    <div className='w-screen h-screen absolute z-10'>
      <div className='bg-black w-full h-full absolute top-0 left-0 opacity-50' />

      {loading ? <Throbber /> :
      <>
        <div className='w-3/5 m-auto relative flex flex-col items-center justify-center h-full'>
          <h1 className={`${kimberley.className} text-9xl text-center`}>PROJECT LAIKA</h1>
          <button className='border-solid border-2 border-white bg-transparent p-3
          shadow-white shadow-[6px_6px_0_0_rgb(255,255,255)] text-lg font-bold
          w-1/4 mt-20 decoration-2 hover:underline hover:shadow-[10px_10px_0_0_rgb(255,255,255)]
          transition-all' onClick={() => startHandler(true)}>Start Exploring</button>
        </div>
      </>}
    </div>
  );
}
