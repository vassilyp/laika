'use client'
import TitleOverlay from "@/components/TitleOverlay";
import { useState } from 'react'
import MainOverlay from '@/components/MainOverlay'
import GlobeCanvas from '../components/GlobeCanvas.js';

export default function Home() {
  const [start, setStart] = useState(false)

  return (
    <>
      {!start && <TitleOverlay startHandler={setStart}/>}
      {start && <MainOverlay />}
      <div className='w-screen h-screen'>
        <GlobeCanvas />
      </div>
    </>
  );
}
