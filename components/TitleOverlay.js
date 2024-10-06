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
  const [starLoading, setStartLoading] = useState(false);

  useEffect(() => {
    setStartLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className='w-screen h-screen absolute z-10'>
      <div className={`${loading ? 'bg-black' : 'bg-none'} ease-in-out duration-[1500ms] bg-none w-screen h-screen absolute top-0 left-0`} />

      <div className='w-3/5 m-auto relative flex flex-col items-center justify-center h-full'>
        <h1 className={`${kimberley.className} text-9xl text-center`}>PROJECT LAIKA</h1>
        <button className='border-solid border-2 border-white p-3 overflow-hidden
          shadow-white shadow-[6px_6px_0_0_rgb(255,255,255)] text-lg font-bold
          w-2/4 h-16 mt-20 decoration-2 hover:underline hover:shadow-[10px_10px_0_0_rgb(255,255,255)]
          transition-all relative' onClick={() => startHandler(true)}>
          <div className={`${starLoading ? '' : '-translate-x-full'} ease-in-out duration-[2500ms] absolute h-full top-0 left-0 w-full bg-none`}>
            <div className={`${loading ? 'bg-white' : 'bg-none'} ease-in-out duration-[500ms] w-full h-full`} />
          </div>
          {loading ? 'Loading' : 'Start Exploring'}
        </button>
      </div>
    </div>
  );
}
